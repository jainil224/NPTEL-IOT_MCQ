/* Main study-guide app. Theory data comes from theory.js (window.THEORY). */
(function () {
  "use strict";

  const TOTAL = DATA.reduce((n, w) => n + w.topics.reduce((m, t) => m + t.qs.length, 0), 0);
  const MCQ_KEY = "iot-mcq-progress-v1";
  const THEORY_KEY = "iot-theory-progress-v1";
  const UI_KEY = "iot-ui-v2";
  const THEORY = Array.isArray(window.THEORY) ? window.THEORY : [];

  const weekSel = document.getElementById("week");
  const out = document.getElementById("out");
  const search = document.getElementById("search");
  const stats = document.getElementById("stats");
  const toggleBtn = document.getElementById("toggle");
  const tabTheory = document.getElementById("tab-theory");
  const tabMcq = document.getElementById("tab-mcq");

  const loadJSON = (key, fallback) => {
    try {
      const v = JSON.parse(localStorage.getItem(key) || "null");
      return v && typeof v === "object" ? v : fallback;
    } catch (e) {
      return fallback;
    }
  };
  const saveJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  };

  let prog = loadJSON(MCQ_KEY, {});
  let theoryProg = loadJSON(THEORY_KEY, {});
  const ui = loadJSON(UI_KEY, {});
  let mode = ui.mode === "mcq" ? "mcq" : "theory";
  let showAll = false;
  let pendingChapter = null;
  let searchTimer = null;

  const openChapters = new Set(Array.isArray(ui.open) ? ui.open : []);

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
  }[c]));

  function saveUI() {
    saveJSON(UI_KEY, {
      week: weekSel.value,
      mode,
      open: Array.from(openChapters),
    });
  }

  function setMode(next) {
    mode = next;
    tabTheory.setAttribute("aria-selected", String(mode === "theory"));
    tabMcq.setAttribute("aria-selected", String(mode === "mcq"));
    toggleBtn.hidden = mode !== "mcq";
    search.placeholder = mode === "theory" ? "Search theory…" : "Search questions…";
    saveUI();
  }

  function weekNumber() {
    return weekSel.value === "all" ? null : Number(weekSel.value) + 1;
  }

  function hashFor(chapterId) {
    const w = weekSel.value === "all" ? "all" : String(Number(weekSel.value) + 1);
    return `#/week/${w}/${mode}${chapterId ? "/" + chapterId : ""}`;
  }

  function syncHash(chapterId) {
    const h = hashFor(chapterId);
    if (location.hash !== h) {
      try { history.replaceState(null, "", h); } catch (e) { location.hash = h; }
    }
  }

  function readHash() {
    const m = location.hash.match(/^#\/week\/(all|\d+)\/(theory|mcq)(?:\/([\w-]+))?/);
    if (!m) return null;
    return {
      week: m[1] === "all" ? "all" : String(Number(m[1]) - 1),
      mode: m[2],
      chapter: m[3] || null,
    };
  }

  /* ------------------------------------------------------------------ *
   * Week selector and initial state
   * ------------------------------------------------------------------ */
  weekSel.innerHTML = '<option value="all">All weeks</option>' +
    DATA.map((w, i) => {
      const parts = w.title.split(" — ");
      return `<option value="${i}">${esc(parts[0])} — ${esc(parts[1] || "")}</option>`;
    }).join("");

  const initialHash = readHash();
  if (initialHash) {
    weekSel.value = initialHash.week;
    mode = initialHash.mode;
    pendingChapter = initialHash.chapter;
  } else {
    weekSel.value = ui.week && (ui.week === "all" || DATA[ui.week]) ? ui.week : "0";
  }
  setMode(mode);

  /* ------------------------------------------------------------------ *
   * Theory helpers
   * ------------------------------------------------------------------ */
  function readCount(week) {
    return week.chapters.filter((c) => theoryProg[c.id]).length;
  }

  function progressBar(done, total) {
    const pct = total ? Math.round((100 * done) / total) : 0;
    return `<div class="pbar" aria-hidden="true"><i style="width:${pct}%"></i></div>`;
  }

  function termsHtml(chapter) {
    if (!chapter.terms || !chapter.terms.length) return "";
    return `<div class="terms" aria-label="Key terms">${chapter.terms
      .map((t) => `<span class="term">${esc(t)}</span>`).join("")}</div>`;
  }

  /* ------------------------------------------------------------------ *
   * Render: theory
   * ------------------------------------------------------------------ */
  function renderTheoryIndex(term) {
    let cards = THEORY.map((w) => {
      const hay = `${w.title} ${w.intro} ${(w.highlights || []).join(" ")} ${w.chapters
        .map((c) => c.title + " " + c.text).join(" ")}`.toLowerCase();
      if (term && !hay.includes(term)) return "";
      const done = readCount(w);
      const pct = w.chapters.length ? Math.round((100 * done) / w.chapters.length) : 0;
      return `<div class="week-card">
        <div class="wk-num">Week ${w.week}</div>
        <h3>${esc(w.title)}</h3>
        <p>${esc(w.intro)}</p>
        <div class="progress">${done}/${w.chapters.length} chapters read
          <div class="pbar" aria-hidden="true"><i style="width:${pct}%"></i></div>
        </div>
        <div class="row">
          <button class="primary" data-action="open-week" data-week="${w.week - 1}">Read Week ${w.week}</button>
          <button class="theory-link" data-action="open-mcq" data-week="${w.week - 1}">MCQs</button>
        </div>
      </div>`;
    }).filter(Boolean);

    out.innerHTML = `<h2>Theory by week</h2>
      <p class="muted">Start with a short explanation and key highlights, then practise the same week's MCQs.</p>` +
      (cards.length ? `<div class="week-grid">${cards.join("")}</div>` :
        '<div class="empty">No theory matches your search.</div>');
  }

  function renderTheory(wsel, term) {
    if (!THEORY.length) {
      out.innerHTML = '<div class="empty">Theory data did not load. Make sure theory.js is next to index.html.</div>';
      return;
    }
    if (wsel === "all") {
      renderTheoryIndex(term);
      return;
    }

    const wi = Number(wsel);
    const w = THEORY[wi];
    if (!w) {
      out.innerHTML = '<div class="empty">Week not found.</div>';
      return;
    }

    let chapters = w.chapters;
    if (term) {
      chapters = chapters.filter((c) =>
        (c.title + " " + c.text).toLowerCase().includes(term));
    }

    const done = readCount(w);
    const pct = w.chapters.length ? Math.round((100 * done) / w.chapters.length) : 0;
    const chapterHtml = chapters.map((c) => {
      const isRead = !!theoryProg[c.id];
      const isOpen = term || openChapters.has(c.id);
      return `<details class="chapter${isRead ? " is-read" : ""}" id="${c.id}" data-cid="${c.id}"${isOpen ? " open" : ""}>
        <summary>
          <span class="ch-title">${esc(c.title)}</span>
          <span class="ch-meta">${isRead ? "✓ Read" : "Not read"}</span>
        </summary>
        <div class="chapter-body">
          ${termsHtml(c)}
          <div class="theory">${c.html}</div>
          <div class="chapter-actions">
            <button class="read-btn${isRead ? " is-read" : ""}" data-action="read" data-cid="${c.id}">
              ${isRead ? "✓ Read — click to undo" : "Mark as read"}
            </button>
          </div>
        </div>
      </details>`;
    }).join("");

    out.innerHTML = `<div class="hero">
      <h2>${esc(w.title)}</h2>
      <p class="sub">${esc(w.lectures)}</p>
      <p>${esc(w.intro)}</p>
      <div class="hero-row">
        <div class="progress" id="wk-progress-text">${done}/${w.chapters.length} chapters read
          <div class="pbar" id="wk-progress-bar" aria-hidden="true"><i style="width:${pct}%"></i></div>
        </div>
        <button class="primary" data-action="open-mcq">Practice Week ${w.week} MCQs →</button>
      </div>
    </div>
    <div class="highlights">
      <h3>Week ${w.week} at a glance — key facts to remember</h3>
      <ul>${w.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
    </div>
    <div class="toolbar">
      <button class="ghost" data-action="expand">Expand all</button>
      <button class="ghost" data-action="collapse">Collapse all</button>
      <span class="muted">${chapters.length} chapter${chapters.length === 1 ? "" : "s"}${term ? " matching" : ""}</span>
    </div>
    ${chapterHtml || '<div class="empty">No chapter matches your search.</div>'}
    <div class="cta">
      <div><strong>Ready to test yourself?</strong><p>Answer Week ${w.week} MCQs. Every question has an explanation.</p></div>
      <button class="primary" data-action="open-mcq">Practice Week ${w.week} MCQs →</button>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Render: MCQs
   * ------------------------------------------------------------------ */
  const STOP = new Set(["the", "and", "for", "with", "from", "into", "that", "this", "are", "was", "were", "its", "their", "about", "using", "used", "what", "when", "which", "who", "how", "why", "vs", "versus", "introduction", "basics", "basic", "definition", "concept", "concepts", "overview", "week"]);

  function tokens(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/)
      .filter((x) => x.length > 2 && !STOP.has(x));
  }

  function chapterForTopic(wi, title) {
    const w = THEORY[wi];
    if (!w) return null;
    const tt = new Set(tokens(title));
    if (!tt.size) return null;
    let best = null, bestScore = 0;
    w.chapters.forEach((c) => {
      const ct = new Set(tokens(c.title));
      let score = 0;
      tt.forEach((x) => {
        if (ct.has(x)) score += 3;
        else if (c.text.toLowerCase().includes(x)) score += 0.4;
      });
      if (score > bestScore) { bestScore = score; best = c; }
    });
    return bestScore >= 1.2 ? best : null;
  }

  function topicTheoryLink(wi, title) {
    const c = chapterForTopic(wi, title);
    const cid = c ? ` data-cid="${c.id}"` : "";
    return `<button class="theory-link" data-action="open-theory" data-week="${wi}"${cid}>Read theory →</button>`;
  }

  function renderMCQ(wsel, term) {
    let html = "", shown = 0;
    DATA.forEach((w, wi) => {
      if (wsel !== "all" && Number(wsel) !== wi) return;
      let wh = "", n = 0;
      w.topics.forEach((t, ti) => {
        let th = "";
        t.qs.forEach((q, qi) => {
          if (term && !(q.q + " " + q.o.join(" ") + " " + t.title).toLowerCase().includes(term)) return;
          n++; shown++;
          const id = wi + "." + ti + "." + qi;
          const chosen = prog[id];
          const done = chosen !== undefined;
          th += `<div class="q${done ? " done" : ""}" data-id="${id}"><p>Q${n}. ${esc(q.q)}</p>` +
            q.o.map((o, oi) => {
              let cls = "";
              if (done || showAll) {
                if (oi === q.a) cls = " right";
                else if (done && oi === chosen) cls = " wrong";
              }
              return `<button class="opt${cls}" data-o="${oi}"><b>${"ABCD"[oi]}.</b><span>${esc(o)}</span></button>`;
            }).join("") +
            `<div class="ans"><b>Correct Answer: ${"ABCD"[q.a]}</b> | <i>Reason: ${esc(q.w)}</i><br>${topicTheoryLink(wi, t.title)}</div></div>`;
        });
        if (th) {
          wh += `<div class="topic-head"><h3>${esc(t.title)}</h3>${topicTheoryLink(wi, t.title)}</div>
            <div class="idea"><b>Key idea:</b> ${esc(t.summary)}</div>` + th;
        }
      });
      if (wh) {
        wh = `<div class="week-head"><h2>${esc(w.title)}</h2>
          <button class="theory-link" data-action="open-theory" data-week="${wi}">Read the theory →</button></div>` + wh;
        html += wh;
      }
    });
    out.innerHTML = html || '<div class="empty">No questions match.</div>';
    out.classList.toggle("show", showAll);
    updateStats(shown);
  }

  /* ------------------------------------------------------------------ *
   * Stats and progress
   * ------------------------------------------------------------------ */
  function mcqTotals() {
    let attempted = 0, correct = 0;
    DATA.forEach((w, wi) => w.topics.forEach((t, ti) => t.qs.forEach((q, qi) => {
      const c = prog[wi + "." + ti + "." + qi];
      if (c !== undefined) { attempted++; if (c === q.a) correct++; }
    })));
    return { attempted, correct };
  }

  function updateStats(shown) {
    const { attempted, correct } = mcqTotals();
    const totalChapters = THEORY.reduce((n, w) => n + w.chapters.length, 0);
    const read = THEORY.reduce((n, w) => n + readCount(w), 0);
    const mcqBit = `MCQs attempted ${attempted}/${TOTAL}` +
      (attempted ? ` · ${Math.round((100 * correct) / attempted)}% correct` : "");

    if (mode === "theory") {
      if (weekSel.value === "all") {
        stats.textContent = `Theory: ${read}/${totalChapters} chapters read · ${mcqBit}`;
      } else {
        const w = THEORY[Number(weekSel.value)];
        stats.textContent = w
          ? `Theory: ${readCount(w)}/${w.chapters.length} chapters read in Week ${w.week} · ${mcqBit}`
          : mcqBit;
      }
    } else {
      stats.textContent = `${shown} question${shown === 1 ? "" : "s"} shown of ${TOTAL} · Attempted ${attempted} · Correct ${correct}` +
        (attempted ? ` (${Math.round((100 * correct) / attempted)}%)` : "");
    }
  }

  function refreshWeekProgress() {
    const wi = Number(weekSel.value);
    const w = THEORY[wi];
    if (!w) return;
    const done = readCount(w);
    const text = document.getElementById("wk-progress-text");
    const bar = document.getElementById("wk-progress-bar");
    if (text) text.firstChild.textContent = `${done}/${w.chapters.length} chapters read `;
    if (bar) bar.firstElementChild.style.width = `${w.chapters.length ? Math.round((100 * done) / w.chapters.length) : 0}%`;
  }

  /* ------------------------------------------------------------------ *
   * Main render / navigation
   * ------------------------------------------------------------------ */
  function render() {
    const wsel = weekSel.value;
    const term = search.value.trim().toLowerCase();
    if (mode === "theory") renderTheory(wsel, term);
    else renderMCQ(wsel, term);

    if (mode !== "mcq") updateStats();
    setMode(mode);

    if (pendingChapter) {
      const el = document.getElementById(pendingChapter);
      if (el) {
        el.open = true;
        openChapters.add(pendingChapter);
        setTimeout(() => el.scrollIntoView({ block: "start" }), 60);
      }
      pendingChapter = null;
    }
  }

  function goTheory(wi, chapterId) {
    mode = "theory";
    weekSel.value = String(wi);
    if (chapterId) {
      openChapters.add(chapterId);
      pendingChapter = chapterId;
    }
    setMode(mode);
    render();
    syncHash(chapterId || null);
    saveUI();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goMCQ(wi) {
    mode = "mcq";
    if (wi !== undefined && wi !== null) weekSel.value = String(wi);
    setMode(mode);
    render();
    syncHash();
    saveUI();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------------------------------------------ *
   * Events
   * ------------------------------------------------------------------ */
  out.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === "open-mcq") {
        goMCQ(weekSel.value === "all" ? undefined : Number(weekSel.value));
        return;
      }
      if (action === "open-week") {
        goTheory(Number(actionEl.dataset.week));
        return;
      }
      if (action === "open-theory") {
        goTheory(Number(actionEl.dataset.week), actionEl.dataset.cid || null);
        return;
      }
      if (action === "read") {
        const cid = actionEl.dataset.cid;
        if (theoryProg[cid]) delete theoryProg[cid];
        else theoryProg[cid] = true;
        saveJSON(THEORY_KEY, theoryProg);
        const details = document.getElementById(cid);
        const isRead = !!theoryProg[cid];
        if (details) {
          details.classList.toggle("is-read", isRead);
          const meta = details.querySelector(".ch-meta");
          if (meta) meta.textContent = isRead ? "✓ Read" : "Not read";
        }
        actionEl.classList.toggle("is-read", isRead);
        actionEl.textContent = isRead ? "✓ Read — click to undo" : "Mark as read";
        refreshWeekProgress();
        updateStats();
        return;
      }
      if (action === "expand" || action === "collapse") {
        const open = action === "expand";
        out.querySelectorAll("details.chapter").forEach((d) => {
          d.open = open;
          if (open) openChapters.add(d.dataset.cid);
          else openChapters.delete(d.dataset.cid);
        });
        saveUI();
        return;
      }
    }

    const b = e.target.closest(".opt");
    if (!b || mode !== "mcq") return;
    const card = b.closest(".q");
    const id = card.dataset.id;
    if (prog[id] !== undefined) return;
    prog[id] = Number(b.dataset.o);
    saveJSON(MCQ_KEY, prog);
    const [wi, ti, qi] = id.split(".").map(Number);
    const q = DATA[wi].topics[ti].qs[qi];
    card.classList.add("done");
    card.querySelectorAll(".opt").forEach((el, i) => {
      if (i === q.a) el.classList.add("right");
      else if (i === prog[id]) el.classList.add("wrong");
    });
    updateStats(out.querySelectorAll(".q").length);
  });

  // Remember which chapters are open.
  out.addEventListener("toggle", (e) => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement) || !d.classList.contains("chapter")) return;
    if (d.open) openChapters.add(d.dataset.cid);
    else openChapters.delete(d.dataset.cid);
    saveUI();
  }, true);

  tabTheory.addEventListener("click", () => {
    setMode("theory");
    render();
    syncHash();
    saveUI();
  });
  tabMcq.addEventListener("click", () => {
    setMode("mcq");
    render();
    syncHash();
    saveUI();
  });

  weekSel.addEventListener("change", () => {
    render();
    syncHash();
    saveUI();
  });

  search.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 120);
  });

  toggleBtn.addEventListener("click", () => {
    showAll = !showAll;
    toggleBtn.textContent = showAll ? "Hide unanswered answers" : "Show all answers";
    render();
  });

  document.getElementById("reset").addEventListener("click", () => {
    if (!confirm("Clear your theory reading progress and saved MCQ answers?")) return;
    prog = {};
    theoryProg = {};
    saveJSON(MCQ_KEY, prog);
    saveJSON(THEORY_KEY, theoryProg);
    localStorage.removeItem(UI_KEY);
    openChapters.clear();
    render();
  });

  window.addEventListener("hashchange", () => {
    const h = readHash();
    if (!h) return;
    mode = h.mode;
    weekSel.value = h.week;
    pendingChapter = h.chapter;
    setMode(mode);
    render();
  });

  render();
})();
