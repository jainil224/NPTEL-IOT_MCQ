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
  const themeToggleBtn = document.getElementById("theme-toggle");
  const tabTheory = document.getElementById("tab-theory");
  const tabMcq = document.getElementById("tab-mcq");
  const tabNptel = document.getElementById("tab-nptel");
  const tabRevision = document.getElementById("tab-revision");
  const THEME_KEY = "iot-theme";

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getActiveTheme() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "dark" || explicit === "light") return explicit;
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "dark" || stored === "light") return stored;
    } catch (e) {}
    return getSystemTheme();
  }

  function updateThemeUI(currentTheme) {
    if (!themeToggleBtn) return;
    const isDark = currentTheme === "dark";
    const icon = themeToggleBtn.querySelector(".theme-icon");
    const label = themeToggleBtn.querySelector(".theme-label");
    if (icon) icon.textContent = isDark ? "☀️" : "🌙";
    if (label) label.textContent = isDark ? "Light" : "Dark";
    themeToggleBtn.setAttribute("title", isDark ? "Switch to Light mode" : "Switch to Dark mode");
    themeToggleBtn.setAttribute("aria-label", isDark ? "Switch to Light mode" : "Switch to Dark mode");
  }

  function setTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);
    if (save) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
    updateThemeUI(theme);
  }

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
  let mode = ui.mode === "mcq" || ui.mode === "nptel" || ui.mode === "revision" ? ui.mode : "theory";
  let revView = ui.revView === "fullforms" ? "fullforms" : "summary";
  let revFilterWeek = ui.revFilterWeek || "all";
  let nptelView = ui.nptelView === "practice" ? "practice" : "theory";
  let showAll = false;
  let pendingChapter = null;
  let searchTimer = null;
  const pendingMultiSelections = new Map();

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
      revView,
      revFilterWeek,
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
    if (tabRevision) tabRevision.setAttribute("aria-selected", String(mode === "revision"));
    toggleBtn.hidden = mode !== "mcq" && mode !== "nptel";
    if (mode === "theory") search.placeholder = "Search theory…";
    else if (mode === "mcq") search.placeholder = "Search questions…";
    else if (mode === "nptel") search.placeholder = nptelView === "theory" ? "Search NPTEL theory…" : "Search assessment questions…";
    else if (mode === "revision") search.placeholder = revView === "fullforms" ? "Search all full forms & abbreviations…" : "Search 1-10 week summaries & IMP topics…";
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
    if (mode === "revision") {
      return `#/revision/${revView}`;
    }
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
    const mRev = location.hash.match(/^#\/revision(?:\/(summary|fullforms))?/);
    if (mRev) return { mode: "revision", revView: mRev[1] || "summary" };
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
    if (initialHash.mode === "revision") {
      mode = "revision";
      if (initialHash.revView) revView = initialHash.revView;
    } else if (initialHash.mode === "nptel") {
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
    } else if (mode === "revision") {
      if (revView === "fullforms") {
        const count = getMasterFullForms().length;
        stats.textContent = `Revision Hub · Option 2: All ${count} Full Forms & Abbreviations across Weeks 1–10`;
      } else {
        stats.textContent = `Revision Hub · Option 1: Weeks 1–10 Consolidated Summaries & High-Yield Exam IMP Topics`;
      }
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
      const pendingSel = isMulti && !done ? (pendingMultiSelections.get(id) || new Set()) : null;
      const multiBadge = isMulti ? ` <span class="multi-badge">Multiple Choice</span>` : "";
      html += `<div class="q${done ? " done" : ""}" data-id="${id}" data-nptel="1" data-multi="${isMulti ? "1" : "0"}"><div class="topic-head"><p style="margin:0;font-weight:700">Q${q.qnum}. ${esc(q.q)}${multiBadge}</p><button class="nptel-read-theory" data-action="nptel-read-theory" data-qid="${id}">Read theory</button></div>`;
      q.options.forEach((o, oi) => {
        let cls = "";
        let box = "";
        if (isMulti) {
          const isPending = pendingSel && pendingSel.has(oi);
          const wasChosen = done && (Array.isArray(chosen) ? chosen.includes(oi) : false);
          const isCorrect = correctArr.includes(oi);
          const boxChar = done
            ? (wasChosen ? "✓" : (isCorrect ? "○" : ""))
            : (isPending ? "✓" : "");
          box = `<span class="opt-box">${boxChar}</span>`;
          if (isPending && !done) cls += " selected";
        }
        if (done || showAll) {
          const wasChosen = Array.isArray(chosen) ? chosen.includes(oi) : oi === chosen;
          const isCorrect = correctArr.includes(oi);
          if (wasChosen && isCorrect) cls = " right";
          else if (wasChosen && !isCorrect) cls = " wrong";
          else if (!wasChosen && isCorrect) cls = " missed";
        }
        html += `<button class="opt${cls}" data-o="${oi}">${box}<b>${"ABCD"[oi]}.</b><span>${esc(o)}</span></button>`;
      });
      if (isMulti && !done) {
        const selCount = pendingSel ? pendingSel.size : 0;
        html += `<div class="msq-submit-row"><button class="msq-submit-btn" data-action="submit-msq" data-qid="${id}" ${selCount === 0 ? "disabled" : ""}>Submit Answers</button><span class="msq-hint">${selCount === 0 ? "Select one or more options then submit" : `${selCount} option(s) selected`}</span></div>`;
      }
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

  /* ------------------------------------------------------------------ *
   * Revision Hub (Summaries, IMP Topics, All Full Forms)
   * ------------------------------------------------------------------ */
  let cachedFullForms = null;
  function getMasterFullForms() {
    if (cachedFullForms) return cachedFullForms;
    const map = new Map();
    THEORY.forEach(w => {
      w.chapters.forEach(c => {
        if (c.title.toLowerCase().includes("key full forms and abbreviations") || c.html.includes("ff-table")) {
          const regex = /<tr>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/gi;
          let m;
          while ((m = regex.exec(c.html)) !== null) {
            const abbr = m[1].replace(/<[^>]+>/g, "").trim();
            const full = m[2].replace(/<[^>]+>/g, "").trim();
            if (abbr && full && abbr.toLowerCase() !== "abbreviation") {
              if (!map.has(abbr)) {
                map.set(abbr, { abbr, full, weeks: [w.week] });
              } else {
                const item = map.get(abbr);
                if (!item.weeks.includes(w.week)) item.weeks.push(w.week);
              }
            }
          }
        }
      });
    });
    cachedFullForms = Array.from(map.values()).sort((a, b) => a.abbr.localeCompare(b.abbr, undefined, { sensitivity: "base" }));
    return cachedFullForms;
  }

  const NPTEL_IMP_TOPICS = [
    {
      week: "Week 1",
      title: "Sensors, Transducers & Actuators",
      badge: "EXAM CORE",
      points: [
        "Sensor: Measures/detects physical properties or environmental states.",
        "Transducer: Converts one form of energy or signal into another.",
        "Actuator: Converts control decision/signal into physical action (movement/flow).",
        "6 Actuator Types: Electrical, Mechanical, Hydraulic (pressurised liquid), Pneumatic (compressed gas/air), Thermal (heat), Magnetic."
      ],
      formula: "Relay = electrically controlled switch · Solenoid valve = electromagnetic control of flow"
    },
    {
      week: "Week 1",
      title: "Sensor Metrics & Distance Formula",
      badge: "HIGH YIELD",
      points: [
        "Accuracy = Closeness of measurement to the true reference value.",
        "Precision = Repeatability / agreement among repeated measurements.",
        "Resolution = Smallest detectable change (High resolution ≠ High accuracy!).",
        "Sensitivity = ΔOutput / ΔInput · Drift = Slow output change over time under similar conditions."
      ],
      formula: "Ultrasonic Distance = (Speed of Sound × Round-Trip Time) ÷ 2"
    },
    {
      week: "Week 1 & 2",
      title: "Gateway vs. Proxy (Classic Exam Trap)",
      badge: "TRAP QUESTION",
      points: [
        "IoT Gateway: Router-like, operates at IP/network layer, connects LAN to WAN and forwards packets.",
        "IoT Proxy: Operates at Application layer, mediates application-level functions, protocol translation, caching."
      ],
      formula: "Gateway = IP Layer Forwarding · Proxy = Application Layer Mediation"
    },
    {
      week: "Week 2",
      title: "MQTT Messaging Protocol",
      badge: "TOP FAVORITE",
      points: [
        "Lightweight Publish-Subscribe messaging over TCP/IP.",
        "Components: Publisher, Central Broker, Subscriber, Topics.",
        "Standardized by OASIS (2013), created by IBM (1999).",
        "Methods: CONNECT, DISCONNECT, SUBSCRIBE, UNSUBSCRIBE, PUBLISH.",
        "Wildcards: '+' = single-level wildcard (e.g. house/+/temperature), '#' = multi-level."
      ],
      formula: "Exam Clue: 'Topic + Broker + Pub/Sub over TCP' → MQTT"
    },
    {
      week: "Week 2",
      title: "CoAP (Constrained Application Protocol)",
      badge: "TOP FAVORITE",
      points: [
        "REST-like Request/Response protocol for constrained devices over UDP.",
        "Methods: GET (retrieve), POST (create/process), PUT (update), DELETE (remove).",
        "CON (Confirmable, expects ACK) vs NON (Non-confirmable, no ACK).",
        "Piggyback (response inside ACK) vs Separate (ACK first, response later)."
      ],
      formula: "Exam Clue: 'Lightweight REST-like over UDP' → CoAP"
    },
    {
      week: "Week 2 & 3",
      title: "IEEE 802.15.4, ZigBee & 6LoWPAN",
      badge: "NETWORKING",
      points: [
        "IEEE 802.15.4: Defines PHY & MAC layers for LR-WPAN. Uses CSMA-CA. FFD vs RFD.",
        "ZigBee: Adds Network & Application layers above 802.15.4. Roles: ZC (Coordinator), ZR (Router), ZED (End Device).",
        "6LoWPAN: Adapts 128-bit IPv6 over 802.15.4 via compression, fragmentation, and mesh routing."
      ],
      formula: "802.15.4 = PHY/MAC · ZigBee = Network/App · 6LoWPAN = IPv6 Adaptation"
    },
    {
      week: "Week 2 & 4",
      title: "RPL & LOADng Routing Protocols",
      badge: "ROUTING",
      points: [
        "RPL: Distance-vector IPv6 routing for LLNs. Builds Destination-Oriented DAG (DODAG) rooted at border router.",
        "RPL Control Messages: DIO (Information Object), DAO (Advertisement Object), DIS (Information Solicitation).",
        "LOADng: Lightweight On-demand Ad hoc Distance-vector routing (reactive protocol based on AODV)."
      ],
      formula: "RPL = Proactive DODAG tree · LOADng = Reactive On-Demand"
    },
    {
      week: "Week 5 & 6",
      title: "Arduino vs. Raspberry Pi & Buses",
      badge: "HARDWARE",
      points: [
        "Arduino: Microcontroller board (e.g. ATmega328P), bare-metal execution, simple C/C++ (setup & loop), real-time GPIO control.",
        "Raspberry Pi: Single Board Computer (SBC) with SoC (ARM CPU, GPU, RAM), runs Linux OS, supports Python, HDMI, USB, networking.",
        "Bus Interfaces: SPI (4-wire: MOSI, MISO, SCK, CS), I2C (2-wire: SDA, SCL), UART (TX, RX)."
      ],
      formula: "Arduino = Microcontroller (low power) · Pi = Microprocessor SBC (Full OS)"
    },
    {
      week: "Week 8 & 9",
      title: "NIST Cloud, CIA Triad & Fog Latency",
      badge: "CLOUD & FOG",
      points: [
        "5 NIST Cloud Characteristics: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service.",
        "Service Models: IaaS (Infrastructure), PaaS (Platform), SaaS (Software) - user responsibility decreases from IaaS to SaaS.",
        "CIA Triad: Confidentiality, Integrity, Availability.",
        "Fog Computing: Low-latency compute near edge devices for time-critical decisions."
      ],
      formula: "Fog Latency: L = T(device→cloud) + T(analysis) + T(cloud→device)"
    },
    {
      week: "Week 9 & 10",
      title: "OpenStack, Sensor-Cloud & Smart Cities (V2X)",
      badge: "APPLICATIONS",
      points: [
        "OpenStack: Nova (Compute), Swift/Cinder (Storage), Neutron (Network), Glance (Images), Keystone (Identity), Horizon (Dashboard).",
        "Sensor-Cloud: Sensing-as-a-Service (Se-aaS). CoV-I (same region) vs CoV-II (multi-region).",
        "Connected Vehicles (V2X): V2V, V2I, V2P. Dedicated Short-Range Communications (DSRC): 75 MHz bandwidth at 5.850–5.925 GHz, IEEE 802.11p/1609.",
        "Smart City Body Analogy: Nerves = Networks, Brain = Intelligence, Organs = Services."
      ],
      formula: "DSRC = 75 MHz (5.9 GHz band) · V2X = V2V + V2I + V2P"
    }
  ];

  function renderRevision(term) {
    const fullForms = getMasterFullForms();

    let html = `<div class="hero">
      <h2>📚 NPTEL IoT Quick Revision Hub</h2>
      <p class="sub">Two comprehensive revision options: Consolidated 1–10 Week Summaries with High-Yield Exam Topics, or the Master Glossary of 165+ Full Forms at once.</p>
    </div>`;

    // 2 Option Cards
    html += `<div class="rev-option-grid">
      <div class="rev-option-card${revView === "summary" ? " active" : ""}" data-action="rev-switch-view" data-view="summary">
        <span class="roc-icon">📋</span>
        <div>
          <h3>Option 1: All 1–10 Week Summaries &amp; Exam IMP Topics</h3>
          <p>Consolidated lecture summaries, core exam highlights, key terms, and 10 high-yield topics frequently tested in NPTEL exams.</p>
        </div>
        <span class="roc-badge">High-Yield Exam Prep</span>
      </div>
      <div class="rev-option-card${revView === "fullforms" ? " active" : ""}" data-action="rev-switch-view" data-view="fullforms">
        <span class="roc-icon">🔤</span>
        <div>
          <h3>Option 2: All Week Full Forms at Once (165+)</h3>
          <p>Master alphabetical list of every abbreviation, networking protocol, hardware term, and standard across all 10 weeks.</p>
        </div>
        <span class="roc-badge">All 10 Weeks at Once</span>
      </div>
    </div>`;

    if (revView === "summary") {
      // -------------------------------------------------------------
      // OPTION 1: 1-10 WEEK SUMMARIES & HIGH-YIELD EXAM IMP TOPICS
      // -------------------------------------------------------------

      // Section A: High-Yield Exam IMP Topics
      let filteredImp = NPTEL_IMP_TOPICS;
      if (term) {
        filteredImp = filteredImp.filter(it => 
          (it.title + " " + it.points.join(" ") + " " + it.formula + " " + it.week).toLowerCase().includes(term)
        );
      }

      html += `<div class="rev-section-title">
        <span>🎯 High-Probability NPTEL Exam Topics</span>
        <span class="rs-pill">Must Revise</span>
      </div>`;

      if (filteredImp.length > 0) {
        html += `<div class="imp-grid">`;
        filteredImp.forEach(it => {
          html += `<div class="imp-card">
            <div>
              <div class="imp-card-top">
                <span class="imp-week-label">${esc(it.week)}</span>
                <span class="imp-badge">${esc(it.badge)}</span>
              </div>
              <h4>${esc(it.title)}</h4>
              <ul>
                ${it.points.map(pt => `<li>${esc(pt)}</li>`).join("")}
              </ul>
            </div>
            <div class="imp-formula">💡 ${esc(it.formula)}</div>
          </div>`;
        });
        html += `</div>`;
      } else {
        html += `<div class="empty" style="margin-bottom:20px">No IMP topics match "${esc(term)}".</div>`;
      }

      // Section B: All 1-10 Week Summaries & Important Notes
      html += `<div class="rev-section-title">
        <span>📖 All 1–10 Week Consolidated Summaries &amp; Important Notes</span>
        <span class="rs-pill">Weeks 1–10</span>
      </div>`;

      // Week filter bar + expand/collapse controls
      html += `<div class="rev-filter-bar">
        <span style="font-size:.82rem;font-weight:700;color:var(--fg);margin-right:4px">Filter Week:</span>
        <button class="rev-filter-btn${revFilterWeek === "all" ? " active" : ""}" data-action="rev-filter-week" data-week="all">All Weeks (1–10)</button>
        ${THEORY.map(w => `<button class="rev-filter-btn${revFilterWeek === String(w.week) ? " active" : ""}" data-action="rev-filter-week" data-week="${w.week}">W${w.week}</button>`).join("")}
        <div style="margin-left:auto;display:flex;gap:6px">
          <button class="ghost" data-action="rev-expand-all" style="font-size:.78rem;padding:3px 8px">▾ Expand All</button>
          <button class="ghost" data-action="rev-collapse-all" style="font-size:.78rem;padding:3px 8px">▴ Collapse All</button>
        </div>
      </div>`;

      let weeksToShow = THEORY;
      if (revFilterWeek !== "all") {
        const targetW = Number(revFilterWeek);
        weeksToShow = THEORY.filter(w => w.week === targetW);
      }
      if (term) {
        weeksToShow = weeksToShow.filter(w => 
          (w.title + " " + w.intro + " " + w.highlights.join(" ")).toLowerCase().includes(term)
        );
      }

      if (weeksToShow.length > 0) {
        weeksToShow.forEach(w => {
          const isRead = readCount(w);
          html += `<details class="rev-week-block" open>
            <summary>
              <span class="rwb-week-num">${w.week}</span>
              <span style="color:var(--fg)">Week ${w.week}: ${esc(w.title)}</span>
              <span style="font-size:.78rem;color:var(--mut);font-weight:500;margin-left:8px">${esc(w.lectures)}</span>
              <span style="font-size:.74rem;color:var(--ok);margin-left:auto;margin-right:12px;font-weight:600">${isRead}/${w.chapters.length} read</span>
            </summary>
            <div class="rev-week-body">
              <div class="rev-week-intro">
                <b style="color:var(--acc2)">Executive Summary:</b> ${esc(w.intro)}
              </div>
              <div>
                <b style="font-size:.88rem;color:var(--fg);display:block;margin-bottom:8px">⭐ Key Exam Highlights &amp; Notes:</b>
                <ul class="rev-highlights-list">
                  ${w.highlights.map(h => `<li>${esc(h)}</li>`).join("")}
                </ul>
              </div>
              <div class="rev-terms-row">
                <span style="font-size:.76rem;color:var(--mut);font-weight:700;align-self:center;margin-right:4px">Key Terms:</span>
                ${w.chapters.slice(0, 4).flatMap(c => c.terms || []).slice(0, 10).map(t => `<span class="rev-term">${esc(t)}</span>`).join("")}
              </div>
              <div>
                <button class="rev-nav-btn" data-action="open-week" data-week="${w.week - 1}">Open Full Week ${w.week} Theory →</button>
              </div>
            </div>
          </details>`;
        });
      } else {
        html += `<div class="empty">No week summaries match "${esc(term)}".</div>`;
      }

    } else {
      // -------------------------------------------------------------
      // OPTION 2: ALL WEEK FULL FORMS AT ONCE (MASTER GLOSSARY)
      // -------------------------------------------------------------
      let items = fullForms;
      if (revFilterWeek !== "all") {
        const targetW = Number(revFilterWeek);
        items = items.filter(it => it.weeks.includes(targetW));
      }
      if (term) {
        items = items.filter(it => (it.abbr + " " + it.full).toLowerCase().includes(term));
      }

      html += `<div class="rev-section-title">
        <span>🔤 All-Week Full Forms &amp; Abbreviations Master List</span>
        <span class="rs-pill">${items.length} Abbreviations</span>
      </div>`;

      // Filter bar & Copy button
      html += `<div class="rev-filter-bar">
        <span style="font-size:.82rem;font-weight:700;color:var(--fg);margin-right:4px">Filter Week:</span>
        <button class="rev-filter-btn${revFilterWeek === "all" ? " active" : ""}" data-action="rev-filter-week" data-week="all">All Weeks (${fullForms.length})</button>
        ${THEORY.map(w => `<button class="rev-filter-btn${revFilterWeek === String(w.week) ? " active" : ""}" data-action="rev-filter-week" data-week="${w.week}">W${w.week}</button>`).join("")}
        <div style="margin-left:auto">
          <button class="rev-copy-btn" data-action="rev-copy-fullforms">📋 Copy All Full Forms</button>
        </div>
      </div>`;

      if (items.length > 0) {
        html += `<div class="rev-ff-table-wrap">
          <table class="rev-ff-table">
            <thead>
              <tr>
                <th style="width:140px">Abbreviation</th>
                <th>Full Form / Expansion</th>
                <th style="width:180px">Week Origin</th>
              </tr>
            </thead>
            <tbody>`;
        items.forEach(it => {
          const weekTags = it.weeks.map(wk => `<span class="rev-ff-week-tag" data-action="open-week" data-week="${wk - 1}">Week ${wk}</span>`).join(" ");
          html += `<tr>
            <td><span class="rev-ff-abbr">${esc(it.abbr)}</span></td>
            <td><b>${esc(it.full)}</b></td>
            <td>${weekTags}</td>
          </tr>`;
        });
        html += `</tbody></table></div>`;
      } else {
        html += `<div class="empty">No full forms match "${esc(term)}".</div>`;
      }
    }

    out.innerHTML = html;
    out.classList.remove("show");
  }

  function render() {
    const wsel = weekSel ? weekSel.value : "0";
    const term = search.value.trim().toLowerCase();
    if (mode === "theory") renderTheory(wsel, term);
    else if (mode === "mcq") renderMCQ(wsel, term);
    else if (mode === "nptel") renderNptel(term);
    else if (mode === "revision") renderRevision(term);

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
      if (action === "rev-switch-view") {
        revView = actionEl.dataset.view || "summary";
        saveUI();
        syncHash();
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (action === "rev-filter-week") {
        revFilterWeek = actionEl.dataset.week || "all";
        saveUI();
        render();
        return;
      }
      if (action === "rev-expand-all") {
        out.querySelectorAll("details.rev-week-block").forEach(d => d.open = true);
        return;
      }
      if (action === "rev-collapse-all") {
        out.querySelectorAll("details.rev-week-block").forEach(d => d.open = false);
        return;
      }
      if (action === "rev-copy-fullforms") {
        const fullForms = getMasterFullForms();
        const text = fullForms.map(it => `${it.abbr} = ${it.full} (Week ${it.weeks.join(", ")})`).join("\n");
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            actionEl.textContent = "✓ Copied 165+ Full Forms!";
            setTimeout(() => { actionEl.textContent = "📋 Copy All Full Forms"; }, 2500);
          });
        }
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
      if (action === "submit-msq") {
        const qid = actionEl.dataset.qid;
        const card = actionEl.closest(".q");
        if (!card || nptelProg[qid] !== undefined) return;
        const pending = pendingMultiSelections.get(qid);
        if (!pending || pending.size === 0) return;
        const nw = nptelWeekSel ? Number(nptelWeekSel.value) : 1;
        const week = NPTEL_ASSESS.find(w => w.week === nw);
        if (!week) return;
        const q = week.questions.find(x => x.id === qid);
        if (!q) return;

        const chosenArr = Array.from(pending).sort((a,b)=>a-b);
        nptelProg[qid] = chosenArr;
        saveJSON(NPTEL_KEY, nptelProg);
        pendingMultiSelections.delete(qid);

        card.classList.add("done");
        const submitRow = card.querySelector(".msq-submit-row");
        if (submitRow) submitRow.remove();

        const correctArr = Array.isArray(q.answer) ? q.answer : [q.answer];
        card.querySelectorAll(".opt").forEach((el) => {
          const oi = Number(el.dataset.o);
          el.classList.remove("selected");
          const box = el.querySelector(".opt-box");
          const wasChosen = chosenArr.includes(oi);
          const isCorrect = correctArr.includes(oi);
          if (box) box.textContent = wasChosen ? "✓" : (isCorrect ? "○" : "");
          if (wasChosen && isCorrect) el.classList.add("right");       // chosen correctly ✓
          else if (wasChosen && !isCorrect) el.classList.add("wrong"); // chosen wrongly ✗
          else if (!wasChosen && isCorrect) el.classList.add("missed"); // correct but missed
        });
        updateStatsNptel(out.querySelectorAll(".q").length);
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
        // Toggle selection for multiple choice questions without immediately submitting
        if (!pendingMultiSelections.has(id)) {
          pendingMultiSelections.set(id, new Set());
        }
        const set = pendingMultiSelections.get(id);
        if (set.has(oi)) {
          set.delete(oi);
          b.classList.remove("selected");
          const box = b.querySelector(".opt-box");
          if (box) box.textContent = "";
        } else {
          set.add(oi);
          b.classList.add("selected");
          const box = b.querySelector(".opt-box");
          if (box) box.textContent = "✓";
        }
        const submitBtn = card.querySelector(".msq-submit-btn");
        const hintEl = card.querySelector(".msq-hint");
        if (submitBtn) submitBtn.disabled = set.size === 0;
        if (hintEl) {
          hintEl.textContent = set.size === 0 ? "Select one or more options then submit" : `${set.size} option(s) selected`;
        }
        return;
      } else {
        nptelProg[id] = oi;
        saveJSON(NPTEL_KEY, nptelProg);
      }
      card.classList.add("done");
      const correctArr2 = Array.isArray(q.answer) ? q.answer : [q.answer];
      card.querySelectorAll(".opt").forEach((el) => {
        const oi = Number(el.dataset.o);
        const isCorrect = correctArr2.includes(oi);
        const wasChosen = oi === (Array.isArray(nptelProg[id]) ? nptelProg[id][0] : nptelProg[id]);
        if (wasChosen && isCorrect) el.classList.add("right");
        else if (wasChosen && !isCorrect) el.classList.add("wrong");
        else if (!wasChosen && isCorrect) el.classList.add("missed");
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
  if (tabRevision) tabRevision.addEventListener("click", () => {
    setMode("revision");
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
      pendingMultiSelections.clear();
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
    if (h.mode === "revision") {
      mode = "revision";
      if (h.revView) revView = h.revView;
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

  // Initialize light/dark theme toggle
  const initialTheme = getActiveTheme();
  setTheme(initialTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = getActiveTheme();
      const next = current === "dark" ? "light" : "dark";
      setTheme(next, true);
    });
  }

  if (window.matchMedia) {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const mqlHandler = (e) => {
      let stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch (err) {}
      if (!stored) {
        setTheme(e.matches ? "dark" : "light", false);
      }
    };
    if (mql.addEventListener) mql.addEventListener("change", mqlHandler);
    else if (mql.addListener) mql.addListener(mqlHandler);
  }

  render();
})();
