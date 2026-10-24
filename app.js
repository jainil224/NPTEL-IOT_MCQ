/* Main study-guide app. Theory data comes from theory.js (window.THEORY). */
(function () {
  "use strict";

  const TOTAL = DATA.reduce((n, w) => n + w.topics.reduce((m, t) => m + t.qs.length, 0), 0);
  const MCQ_KEY = "iot-mcq-progress-v1";
  const THEORY_KEY = "iot-theory-progress-v1";
  const UI_KEY = "iot-ui-v2";
  const NPTEL_KEY = "iot-nptel-assess-progress-v1";
  const THEORY = Array.isArray(window.THEORY) ? window.THEORY : [];
  const NPTEL_ASSESS = Array.isArray(window.NPTEL_ASSESSMENT) ? window.NPTEL_ASSESSMENT.slice().sort((a,b)=>a.week-b.week) : [];
  const NPTEL_THEORY = Array.isArray(window.NPTEL_THEORY) ? window.NPTEL_THEORY.slice().sort((a,b)=>a.week-b.week) : [];

  const weekSel = document.getElementById("week");
  const nptelWeekSel = document.getElementById("nptel-week");
  const nptelSubtabs = document.getElementById("nptel-subtabs");
  const nptelSubTheory = document.getElementById("nptel-sub-theory");
  const nptelSubPractice = document.getElementById("nptel-sub-practice");
  const out = document.getElementById("out");
  const search = document.getElementById("search");
  const stats = document.getElementById("stats");
  const toggleBtn = document.getElementById("toggle");
  const tabTheory = document.getElementById("tab-theory");
  const tabMcq = document.getElementById("tab-mcq");
  const tabNptel = document.getElementById("tab-nptel");

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
  let nptelProg = loadJSON(NPTEL_KEY, {});
  const ui = loadJSON(UI_KEY, {});
  let mode = ui.mode === "mcq" || ui.mode === "nptel" ? ui.mode : "theory";
  let nptelView = ui.nptelView === "practice" ? "practice" : "theory";
  let showAll = false;
  let pendingChapter = null;
  let searchTimer = null;

  const openChapters = new Set(Array.isArray(ui.open) ? ui.open : []);

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
  }[c]));

  function saveUI() {
    saveJSON(UI_KEY, {
      week: weekSel ? weekSel.value : "0",
      mode,
      nptelView,
      nptelWeek: nptelWeekSel ? nptelWeekSel.value : undefined,
      open: Array.from(openChapters),
    });
  }

  function updateNptelSubtabs() {
    if (!nptelSubtabs) return;
    if (mode === "nptel") {
      nptelSubtabs.style.display = "flex";
      if (nptelSubTheory) nptelSubTheory.setAttribute("aria-selected", String(nptelView === "theory"));
      if (nptelSubPractice) nptelSubPractice.setAttribute("aria-selected", String(nptelView === "practice"));
    } else {
      nptelSubtabs.style.display = "none";
    }
  }

  function setMode(next) {
    mode = next;
    if (tabTheory) tabTheory.setAttribute("aria-selected", String(mode === "theory"));
    if (tabMcq) tabMcq.setAttribute("aria-selected", String(mode === "mcq"));
    if (tabNptel) tabNptel.setAttribute("aria-selected", String(mode === "nptel"));
    toggleBtn.hidden = mode !== "mcq" && mode !== "nptel";
    if (mode === "theory") search.placeholder = "Search theory…";
    else if (mode === "mcq") search.placeholder = "Search questions…";
    else if (mode === "nptel") search.placeholder = nptelView === "theory" ? "Search NPTEL theory…" : "Search assessment questions…";
    if (nptelWeekSel) {
      nptelWeekSel.style.display = mode === "nptel" ? "" : "none";
    }
    if (weekSel) {
      weekSel.style.display = (mode === "theory" || mode === "mcq") ? "" : "none";
    }
    updateNptelSubtabs();
    saveUI();
  }

  function weekNumber() {
    return weekSel.value === "all" ? null : Number(weekSel.value) + 1;
  }

  function hashFor(chapterId) {
    if (mode === "nptel") {
      const nw = nptelWeekSel ? nptelWeekSel.value : "1";
      return `#/nptel/week/${nw}`;
    }
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
    const m1 = location.hash.match(/^#\/nptel\/week\/(\d+)/);
    if (m1) return { mode: "nptel", nptelWeek: m1[1], chapter: null };
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
  if (weekSel) {
    weekSel.innerHTML = '<option value="all">All weeks</option>' +
      DATA.map((w, i) => {
        const parts = w.title.split(" — ");
        return `<option value="${i}">${esc(parts[0])} — ${esc(parts[1] || "")}</option>`;
      }).join("");
  }

  if (nptelWeekSel && NPTEL_ASSESS.length) {
    nptelWeekSel.innerHTML = NPTEL_ASSESS.map(w => `<option value="${w.week}">Week ${w.week}</option>`).join("");
  } else if (nptelWeekSel) {
    nptelWeekSel.innerHTML = '<option value="1">Week 1</option>';
  }

  const initialHash = readHash();
  if (initialHash) {
    if (initialHash.mode === "nptel") {
      mode = "nptel";
      if (nptelWeekSel && initialHash.nptelWeek) nptelWeekSel.value = initialHash.nptelWeek;
    } else {
      if (weekSel) weekSel.value = initialHash.week;
      mode = initialHash.mode;
      pendingChapter = initialHash.chapter;
    }
  } else {
    if (weekSel) weekSel.value = ui.week && (ui.week === "all" || DATA[ui.week]) ? ui.week : "0";
    if (nptelWeekSel && ui.nptelWeek) nptelWeekSel.value = ui.nptelWeek;
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
            `<div class="ans"><b>Correct Answer: ${"ABCD"[q.a]}</b> | <i>Reason: ${esc(q.w)}</i><br>${topicTheoryLink(wi, t.title, id)}</div></div>`;
        });
        if (th) {
          const repQid = th ? (t.qs[0] ? (wi + "." + ti + ".0") : "") : "";
          wh += `<div class="topic-head"><h3>${esc(t.title)}</h3>${topicTheoryLink(wi, t.title, repQid)}</div>
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
      if (weekSel && weekSel.value === "all") {
        stats.textContent = `Theory: ${read}/${totalChapters} chapters read · ${mcqBit}`;
      } else if (weekSel) {
        const w = THEORY[Number(weekSel.value)];
        stats.textContent = w
          ? `Theory: ${readCount(w)}/${w.chapters.length} chapters read in Week ${w.week} · ${mcqBit}`
          : mcqBit;
      } else {
        stats.textContent = mcqBit;
      }
    } else if (mode === "mcq") {
      stats.textContent = `${shown || 0} question${(shown || 0) === 1 ? "" : "s"} shown of ${TOTAL} · Attempted ${attempted} · Correct ${correct}` +
        (attempted ? ` (${Math.round((100 * correct) / attempted)}%)` : "");
    } else if (mode === "nptel") {
      updateStatsNptel(shown || 0);
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
  function renderNptelTheory(term) {
    if (!NPTEL_THEORY.length) {
      out.innerHTML = '<div class="empty">No NPTEL theory found. Run <code>node scripts/build-nptel-theory.mjs</code> after adding week files.</div>';
      stats.textContent = "NPTEL Week Assessment – Theory";
      return;
    }
    const nw = nptelWeekSel ? Number(nptelWeekSel.value) : NPTEL_THEORY[0].week;
    const week = NPTEL_THEORY.find(w => w.week === nw) || NPTEL_THEORY[0];
    if (nptelWeekSel && nptelWeekSel.value != week.week) nptelWeekSel.value = week.week;

    let items = week.items;
    if (term) {
      items = items.filter(it => (it.questionText + " " + it.theory + " " + it.why).toLowerCase().includes(term));
    }

    let html = `<div class="hero"><h2>NPTEL Week Assessment Theory – Week ${week.week}</h2><p class="sub">Study the concept notes below. When ready, click <b>Answer this MCQ →</b> or switch to <b>NPTEL MCQ Practice</b> to test yourself.</p></div>`;
    html += `<div class="toolbar"><button class="ghost" data-action="nptel-switch-practice">Go to NPTEL MCQ Practice →</button></div>`;
    items.forEach((it, idx) => {
      html += `<section class="nptel-theory-card" id="nptel-theory-${it.qid}"><header class="nptel-theory-head"><div><span class="chip">Q${it.qnum}</span><h3>${esc(it.questionText)}</h3></div></header><div class="nptel-theory-body">`;
      if (it.theory) {
        html += `<h4>Concept Theory &amp; Explanation</h4><p>${esc(it.theory).replace(/\n/g, "<br>")}</p>`;
      }
      html += `<div class="nptel-theory-actions">
        <button class="ghost" data-action="nptel-read-theory" data-qid="${it.qid}" style="margin-right:auto">Full Textbook Theory →</button>
        <button class="primary nptel-btn-practice" data-action="nptel-go-mcq" data-qid="${it.qid}">Answer this MCQ →</button>
      </div></div></section>`;
    });
    out.innerHTML = html || '<div class="empty">No theory matches your search.</div>';
    out.classList.remove("show");
    stats.textContent = `NPTEL Week ${week.week} Theory – ${items.length} / ${week.items.length} items`;
  }

  function renderNptelPractice(term) {
    if (!NPTEL_ASSESS.length) {
      out.innerHTML = '<div class="empty">No NPTEL assessment files found. Add week 1.md and run the build script.</div>';
      updateStatsNptel(0);
      return;
    }
    const nw = nptelWeekSel ? Number(nptelWeekSel.value) : NPTEL_ASSESS[0].week;
    const week = NPTEL_ASSESS.find(w => w.week === nw) || NPTEL_ASSESS[0];
    if (nptelWeekSel && nptelWeekSel.value != week.week) nptelWeekSel.value = week.week;

    let questions = week.questions;
    if (term) {
      questions = questions.filter(q => (q.q + " " + q.options.join(" ") + " " + q.explanation).toLowerCase().includes(term));
    }

    let html = `<div class="hero"><h2>NPTEL Week Assessment MCQ Practice – Week ${week.week}</h2><p class="sub">Attempt questions. Use <b>Read theory</b> to jump to the exact explanation in the main Theory tab.</p></div>`;
    html += `<div class="toolbar"><button class="ghost" data-action="nptel-switch-theory">← Back to NPTEL Theory</button></div>`;
    let shown = 0;
    questions.forEach((q) => {
      shown++;
      const id = q.id;
      const chosen = nptelProg[id];
      const done = chosen !== undefined;
      const isMulti = Array.isArray(q.answer);
      const correctArr = isMulti ? q.answer : [q.answer];
      html += `<div class="q${done ? " done" : ""}" data-id="${id}" data-nptel="1"><div class="topic-head"><p style="margin:0;font-weight:700">Q${q.qnum}. ${esc(q.q)}</p><button class="nptel-read-theory" data-action="nptel-read-theory" data-qid="${id}">Read theory</button></div>`;
      q.options.forEach((o, oi) => {
        let cls = "";
        if (done || showAll) {
          if (correctArr.includes(oi)) cls = " right";
          else if (done && (Array.isArray(chosen) ? chosen.includes(oi) : oi === chosen)) cls = " wrong";
        }
        html += `<button class="opt${cls}" data-o="${oi}"><b>${"ABCD"[oi]}.</b><span>${esc(o)}</span></button>`;
      });
      html += `<div class="ans"><b>Correct Answer: ${correctArr.map(i => "ABCD"[i]).join(", ")}</b></div></div>`;
    });
    out.innerHTML = html || '<div class="empty">No questions match your search.</div>';
    out.classList.toggle("show", showAll);
    updateStatsNptel(shown);
  }

  function renderNptel(term) {
    if (nptelView === "theory") renderNptelTheory(term);
    else renderNptelPractice(term);
  }

  function updateStatsNptel(shown) {
    if (!NPTEL_ASSESS.length) { stats.textContent = "NPTEL Week Assessment – no data"; return; }
    const nw = nptelWeekSel ? Number(nptelWeekSel.value) : NPTEL_ASSESS[0].week;
    const week = NPTEL_ASSESS.find(w => w.week === nw) || NPTEL_ASSESS[0];
    let attempted = 0, correct = 0;
    week.questions.forEach(q => {
      const c = nptelProg[q.id];
      if (c !== undefined) {
        attempted++;
        const correctArr = Array.isArray(q.answer) ? q.answer : [q.answer];
        const chosenArr = Array.isArray(c) ? c : [c];
        const ok = correctArr.length === chosenArr.length && correctArr.every(x => chosenArr.includes(x));
        if (ok) correct++;
      }
    });
    stats.textContent = `NPTEL Week ${week.week} Assessment – ${shown} shown / ${week.questions.length} • Attempted ${attempted} • Correct ${correct}` + (attempted ? ` (${Math.round(100*correct/attempted)}%)` : "");
  }

  function render() {
    const wsel = weekSel ? weekSel.value : "0";
    const term = search.value.trim().toLowerCase();
    if (mode === "theory") renderTheory(wsel, term);
    else if (mode === "mcq") renderMCQ(wsel, term);
    else if (mode === "nptel") renderNptel(term);

    updateStats();
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
    if (weekSel) weekSel.value = String(wi);
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
  function findBestTheoryChapterForNptel(qid) {
    const nw = nptelWeekSel ? Number(nptelWeekSel.value) : 1;
    const tWeek = NPTEL_THEORY.find(w => w.week === nw);
    const item = tWeek ? tWeek.items.find(it => it.qid === qid) : null;
    if (!THEORY.length) return { wi: nw-1, cid: null };
    let wi = nw - 1;
    if (wi < 0 || wi >= THEORY.length) wi = 0;
    const w = THEORY[wi];
    if (!item || !w) return { wi, cid: null };
    const keys = (item.questionText + " " + item.theory + " " + item.why + " " + (item.keywords||[]).join(" ")).toLowerCase();
    let best = null, bestScore = 0;
    w.chapters.forEach(c => {
      const hay = (c.title + " " + c.text).toLowerCase();
      let score = 0;
      if (keys.includes("smart dust") && hay.includes("smart dust")) score += 10;
      if (keys.includes("m2m") && hay.includes("m2m")) score += 10;
      if (keys.includes("ipv6") && hay.includes("ipv6")) score += 6;
      if (keys.includes("ipv4") && hay.includes("ipv4")) score += 4;
      if (keys.includes("hysteresis") && hay.includes("hysteresis")) score += 10;
      if (keys.includes("accelerometer") && hay.includes("accelerometer")) score += 10;
      if (keys.includes("vector") && hay.includes("vector")) score += 6;
      if (keys.includes("gateway") && hay.includes("gateway")) score += 6;
      if (keys.includes("actuator") && hay.includes("actuator")) score += 6;
      if (keys.includes("slaac") && hay.includes("slaac")) score += 8;
      if (keys.includes("dhcpv6") && hay.includes("dhcpv6")) score += 8;
      if (keys.includes("address") && hay.includes("address")) score += 3;
      if (keys.includes("sensor") && hay.includes("sensor")) score += 3;
      if (score > bestScore) { bestScore = score; best = c; }
    });
    return { wi, cid: bestScore > 0 ? best.id : (w.chapters[0] ? w.chapters[0].id : null), item };
  }

  function highlightInTheory(cid, qid) {
    setTimeout(() => {
      const el = document.getElementById(cid);
      if (!el) return;
      el.open = true;
      openChapters.add(cid);
      const body = el.querySelector('.chapter-body');
      if (!body) return;
      const nw = nptelWeekSel ? Number(nptelWeekSel.value) : 1;
      const tWeek = NPTEL_THEORY.find(w => w.week === nw);
      const item = tWeek ? tWeek.items.find(it => it.qid === qid) : null;
      const paras = body.querySelectorAll('p, li');
      paras.forEach(p => p.classList.remove('theory-highlight'));
      if (item) {
        const keys = (item.theory + " " + item.why).toLowerCase().split(/[^a-z0-9]+/).filter(x=>x.length>4);
        for (let i=0;i<paras.length;i++) {
          const txt = paras[i].textContent.toLowerCase();
          let hit = 0;
          for (let k=0;k<keys.length && hit<2;k++) if (txt.includes(keys[k])) hit++;
          if (hit>=2) { paras[i].classList.add('theory-highlight'); paras[i].scrollIntoView({block:'center'}); break; }
        }
      }
    }, 150);
  }

  out.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === "mcq-read-theory") {
        const wi = Number(actionEl.dataset.week);
        const qid = actionEl.dataset.qid || "";
        const topicTitle = actionEl.dataset.topic || "";
        const [twi, tti, tqi] = qid.split(".").map(Number);
        const qObj = DATA[twi] && DATA[twi].topics[tti] ? DATA[twi].topics[tti].qs[tqi] : null;
        const res = qObj ? findBestChapterForMCQ(wi, qObj, topicTitle) : { cid: null };
        mode = "theory";
        if (weekSel) weekSel.value = String(wi);
        if (res.cid) {
          openChapters.add(res.cid);
          pendingChapter = res.cid;
        }
        setMode(mode);
        render();
        syncHash(res.cid || null);
        saveUI();
        try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch(e) { window.scrollTo(0,0); }
        if (res.cid && qObj) highlightMCQParagraph(res.cid, qObj);
        return;
      }
      if (action === "nptel-switch-theory") {
        nptelView = "theory";
        saveUI();
        setMode("nptel");
        render();
        syncHash();
        return;
      }
      if (action === "nptel-switch-practice") {
        nptelView = "practice";
        saveUI();
        setMode("nptel");
        render();
        syncHash();
        return;
      }
      if (action === "nptel-go-mcq") {
        const qid = actionEl.dataset.qid;
        nptelView = "practice";
        saveUI();
        setMode("nptel");
        render();
        syncHash();
        setTimeout(() => {
          const target = document.querySelector(`[data-id="${qid}"]`);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.add("q-target-pulse");
            setTimeout(() => target.classList.remove("q-target-pulse"), 2000);
          }
        }, 80);
        return;
      }
      if (action === "nptel-read-theory") {
        const qid = actionEl.dataset.qid;
        const res = findBestTheoryChapterForNptel(qid);
        mode = "theory";
        if (weekSel) weekSel.value = String(res.wi);
        if (res.cid) {
          openChapters.add(res.cid);
          pendingChapter = res.cid;
        }
        setMode(mode);
        render();
        syncHash(res.cid || null);
        saveUI();
        window.scrollTo({ top: 0, behavior: "smooth" });
        highlightInTheory(res.cid, qid);
        return;
      }
      if (action === "open-mcq") {
        goMCQ(weekSel && weekSel.value === "all" ? undefined : (weekSel ? Number(weekSel.value) : undefined));
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
    if (!b) return;
    if (mode === "nptel") {
      const card = b.closest(".q");
      const id = card.dataset.id;
      if (nptelProg[id] !== undefined) return;
      const oi = Number(b.dataset.o);
      const nw = nptelWeekSel ? Number(nptelWeekSel.value) : 1;
      const week = NPTEL_ASSESS.find(w => w.week === nw);
      if (!week) return;
      const q = week.questions.find(x => x.id === id);
      if (!q) return;
      const isMulti = Array.isArray(q.answer);
      if (isMulti) {
        // For MSQ, allow selecting multiple? The data shows arrays; just record selection for now
        nptelProg[id] = [oi];
        saveJSON(NPTEL_KEY, nptelProg);
      } else {
        nptelProg[id] = oi;
        saveJSON(NPTEL_KEY, nptelProg);
      }
      card.classList.add("done");
      const correctArr = Array.isArray(q.answer) ? q.answer : [q.answer];
      card.querySelectorAll(".opt").forEach((el, i) => {
        if (correctArr.includes(i)) el.classList.add("right");
        else if (Number(el.dataset.o) === (Array.isArray(nptelProg[id]) ? nptelProg[id][0] : nptelProg[id])) el.classList.add("wrong");
      });
      updateStatsNptel(out.querySelectorAll(".q").length);
      return;
    }
    if (mode !== "mcq") return;
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

  if (tabTheory) tabTheory.addEventListener("click", () => {
    setMode("theory");
    render();
    syncHash();
    saveUI();
  });
  if (tabMcq) tabMcq.addEventListener("click", () => {
    setMode("mcq");
    render();
    syncHash();
    saveUI();
  });
  if (tabNptel) tabNptel.addEventListener("click", () => {
    mode = "nptel";
    setMode("nptel");
    render();
    syncHash();
    saveUI();
  });
  if (nptelSubTheory) nptelSubTheory.addEventListener("click", () => {
    nptelView = "theory";
    saveUI();
    if (mode !== "nptel") mode = "nptel";
    setMode("nptel");
    render();
    syncHash();
  });
  if (nptelSubPractice) nptelSubPractice.addEventListener("click", () => {
    nptelView = "practice";
    saveUI();
    if (mode !== "nptel") mode = "nptel";
    setMode("nptel");
    render();
    syncHash();
  });

  if (weekSel) weekSel.addEventListener("change", () => {
    render();
    syncHash();
    saveUI();
  });
  if (nptelWeekSel) nptelWeekSel.addEventListener("change", () => {
    saveUI();
    render();
    syncHash();
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

  const resetBtn = document.getElementById("reset");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    if (mode === "nptel") {
      if (!confirm("Clear your NPTEL Week Assessment answers?")) return;
      nptelProg = {};
      saveJSON(NPTEL_KEY, nptelProg);
      render();
      return;
    }
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
    if (h.mode === "nptel") {
      mode = "nptel";
      if (nptelWeekSel && h.nptelWeek) nptelWeekSel.value = h.nptelWeek;
      setMode(mode);
      render();
      return;
    }
    mode = h.mode;
    if (weekSel && h.week !== undefined) weekSel.value = h.week;
    pendingChapter = h.chapter;
    setMode(mode);
    render();
  });

  render();
})();
