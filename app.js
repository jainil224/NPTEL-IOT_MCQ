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

  const EASY_WEEK_SUMMARIES = [
    {
      week: 1,
      title: "Introduction to IoT, Sensors & Actuators",
      lectures: "Lectures 1–5",
      simpleWords: "IoT connects physical everyday objects (lights, fans, industrial machines, cars) to the internet so they can measure the environment, share data, and trigger actions automatically without human intervention.",
      keyNotes: [
        "<b>IoT System Architecture:</b> Real World → Sensor (measures) → Embedded Controller (processes) → Local Network → Gateway → Cloud/Backend → User App.",
        "<b>Embedded System:</b> A dedicated micro-computer built into a machine to do one specific job (has limited CPU, memory, and power compared to a PC).",
        "<b>Sensor vs. Actuator:</b> A <i>Sensor</i> is input (detects temperature, light, motion). An <i>Actuator</i> is output (physically moves a motor, opens a valve, or switches a light).",
        "<b>Transducer:</b> Any device that converts one form of energy into another. Sensors and actuators are types of transducers.",
        "<b>6 Types of Actuators:</b> Electrical (motors), Mechanical (gears), Hydraulic (uses pressurized liquid), Pneumatic (uses compressed air/gas), Thermal (uses heat), Magnetic (uses electromagnets).",
        "<b>Accuracy vs. Precision:</b> Accuracy is how close you are to the true correct value. Precision is how consistently you get the same reading when measuring repeatedly.",
        "<b>Resolution vs. Sensitivity:</b> Resolution is the smallest step or change a sensor can detect. Sensitivity is how much the sensor output changes when the input changes.",
        "<b>Gateway vs. Proxy:</b> A <i>Gateway</i> works at the IP/network layer to route packets between LAN and WAN. A <i>Proxy</i> works at the Application layer to translate protocols and data formats."
      ],
      examTraps: [
        "<b>High Resolution ≠ High Accuracy:</b> A digital thermometer showing 3 decimals (e.g. 24.125°C) has high resolution, but if the room is 30°C, it has very poor accuracy!",
        "<b>Ultrasonic Distance Formula:</b> Distance = (Speed of Sound × Echo Round-Trip Time) ÷ 2. You MUST divide by 2 because the sound wave travels forward to the object and back again.",
        "<b>Relay vs. Solenoid Valve:</b> A Relay is an electrically operated switch. A Solenoid Valve uses an electromagnet to open or close fluid/gas flow (like in smart irrigation)."
      ],
      formula: "Distance = (Speed × Time) ÷ 2 · IPv6 = 128 bits (IPv4 = 32 bits)"
    },
    {
      week: 2,
      title: "IoT Networking Protocols & Standards",
      lectures: "Lectures 6–15",
      simpleWords: "Constrained IoT sensors have tiny batteries and limited CPU, so normal heavy web protocols like HTTP are too slow and power-hungry. IoT uses special lightweight protocols like MQTT and CoAP to send small messages quickly.",
      keyNotes: [
        "<b>MQTT (Message Queue Telemetry Transport):</b> Lightweight publish-subscribe protocol running over <b>TCP/IP</b>. Created by IBM (1999) and standardized by OASIS (2013).",
        "<b>How MQTT Works:</b> Publishers send messages to a <b>Topic</b> on a central <b>Broker</b>. The Broker forwards messages to all <b>Subscribers</b> interested in that topic. Publishers and subscribers never talk to each other directly.",
        "<b>MQTT Wildcards:</b> <code>+</code> is single-level wildcard (matches e.g. <code>home/+/temp</code>). <code>#</code> is multi-level wildcard (matches everything after).",
        "<b>CoAP (Constrained Application Protocol):</b> Lightweight REST-like request-response protocol designed specifically for constrained devices running over <b>UDP</b>.",
        "<b>CoAP Methods:</b> <code>GET</code> (read), <code>POST</code> (create/process), <code>PUT</code> (update/replace), <code>DELETE</code> (remove).",
        "<b>CoAP Message Types:</b> <i>CON</i> (Confirmable — receiver must send ACK back) vs. <i>NON</i> (Non-confirmable — fire and forget, no ACK needed).",
        "<b>Piggyback vs. Separate Response:</b> Piggyback delivers the response data inside the ACK packet. Separate response sends the ACK first, and delivers data later in a second message.",
        "<b>XMPP & AMQP:</b> XMPP is XML-based for instant messaging and presence. AMQP is a binary queued protocol over TCP using Exchanges, Bindings, and Queues.",
        "<b>IEEE 802.15.4:</b> Defines the <b>PHY (Physical) and MAC (Medium Access)</b> layers for low-power wireless personal area networks (LR-WPAN). Uses CSMA/CA.",
        "<b>ZigBee:</b> Sits on top of 802.15.4 and adds <b>Network and Application</b> layers. Roles: Coordinator (ZC), Router (ZR), End Device (ZED).",
        "<b>6LoWPAN:</b> Header compression and fragmentation standard that shrinks big 128-bit IPv6 packets so they fit into small 127-byte 802.15.4 wireless packets.",
        "<b>RPL (Routing Protocol for LLNs):</b> Distance-vector IPv6 routing protocol that builds a tree called a <b>DODAG</b> rooted at the gateway. Uses DIO, DAO, and DIS messages."
      ],
      examTraps: [
        "<b>MQTT runs on TCP, CoAP runs on UDP:</b> This is the #1 most repeated NPTEL question!",
        "<b>Confirmable/NON vs. Piggyback/Separate:</b> CON/NON is about acknowledgement. Piggyback/Separate is about HOW the response is carried.",
        "<b>802.15.4 vs. ZigBee:</b> 802.15.4 is ONLY layers 1 & 2 (PHY + MAC). ZigBee provides the higher network/application layers."
      ],
      formula: "MQTT = TCP + Pub/Sub + Broker · CoAP = UDP + REST (GET/POST/PUT/DELETE)"
    },
    {
      week: 3,
      title: "Connectivity Technologies & Wireless Sensor Networks",
      lectures: "Lectures 16–20",
      simpleWords: "Covers the different wireless options to connect sensors (Wi-Fi, Bluetooth/BLE, Cellular, ZigBee) and how hundreds of tiny battery nodes organize into a Wireless Sensor Network (WSN).",
      keyNotes: [
        "<b>Bluetooth Low Energy (BLE):</b> Designed for ultra-low power consumption. Sleeps 99% of the time, wakes up quickly, sends a tiny packet, and sleeps again. Perfect for wearables and health monitors.",
        "<b>Wi-Fi vs. BLE:</b> Wi-Fi offers high bandwidth and internet connectivity, but drains batteries very quickly. BLE offers low bandwidth but lasts months/years on a coin cell.",
        "<b>Wireless Sensor Network (WSN):</b> A network of distributed autonomous sensor nodes that wirelessly pass measurements hop-by-hop toward a central <b>Base Station (Sink)</b>.",
        "<b>WSN Node 4 Core Components:</b> 1) Sensing unit (sensor + ADC), 2) Processing unit (microcontroller + memory), 3) Transceiver (radio transmitter/receiver), 4) Power unit (battery).",
        "<b>Top Priority in WSN:</b> Battery conservation is the single most critical design factor. Radio transmission takes 100x to 1000x more power than local calculation!"
      ],
      examTraps: [
        "<b>Energy Consumption Trap:</b> In a sensor node, transmitting a single bit wirelessly uses vastly more energy than executing hundreds of CPU instructions.",
        "<b>Star vs. Mesh:</b> Star topology is simple (all nodes talk to gateway directly). Mesh topology allows nodes to relay packets for each other across long distances."
      ],
      formula: "WSN Node = Sensor + Microcontroller + Transceiver + Battery"
    },
    {
      week: 4,
      title: "Sensor-Network Coverage, Mobility, UAV & M2M",
      lectures: "Lectures 21–25",
      simpleWords: "Explains how to place sensors so no area is left unmonitored, how moving networks (cars, drones) operate, and how industrial machines communicate without humans.",
      keyNotes: [
        "<b>Sensor Coverage Types:</b> 1) <i>Area Coverage</i> (monitor the entire region), 2) <i>Target/Point Coverage</i> (monitor specific fixed spots), 3) <i>Barrier Coverage</i> (detect intrusions across a boundary line).",
        "<b>k-Coverage:</b> Every point in the area must be simultaneously seen by at least <i>k</i> distinct sensors (so if 1 sensor dies, others still cover the spot).",
        "<b>Mobile Sensor Networks:</b> Nodes that move around. Includes <b>MANET</b> (Mobile Ad-hoc Networks) and <b>VANET</b> (Vehicular Ad-hoc Networks between moving cars).",
        "<b>UAVs (Drones in IoT):</b> Can act as mobile aerial sensors or 'data mules' flying over remote ground sensors to collect stored data.",
        "<b>M2M (Machine-to-Machine):</b> Automated communication between machines without human intervention, widely used in factory automation and smart meters."
      ],
      examTraps: [
        "<b>Barrier Coverage:</b> Used specifically for perimeter security, border defense, and pipeline monitoring where crossing detection is needed, not 100% full area coverage.",
        "<b>VANET Constraints:</b> Vehicles move at high speeds, so wireless link topology changes constantly in seconds."
      ],
      formula: "k-Coverage = Every point monitored by ≥ k sensors simultaneously"
    },
    {
      week: 5,
      title: "Interoperability, Arduino, Sensors & Actuators",
      lectures: "Lectures 26–30",
      simpleWords: "Explains how to make different IoT brands work together, and how to program microcontrollers like Arduino to read sensors and switch circuits.",
      keyNotes: [
        "<b>Interoperability:</b> The ability of hardware and software from different manufacturers to exchange information correctly. <i>Semantic interoperability</i> means both sides understand the exact meaning and units (e.g. Celsius vs Fahrenheit).",
        "<b>Arduino Platform:</b> An open-source microcontroller board (such as Arduino Uno based on the 8-bit ATmega328P chip). It runs bare-metal C/C++ without an operating system.",
        "<b>Arduino Code Structure:</b> Requires two functions: <code>setup()</code> (runs once at power-on to initialize pins) and <code>loop()</code> (repeats endlessly to read and act).",
        "<b>Digital vs. Analog Pins:</b> Digital pins read/write binary <code>HIGH</code> (5V) or <code>LOW</code> (0V). Analog pins read varying voltages through a 10-bit ADC (converts 0–5V into numbers 0–1023).",
        "<b>PWM (Pulse Width Modulation):</b> A technique to fake analog output using digital pins by switching 5V on and off thousands of times per second (controls motor speed and LED brightness)."
      ],
      examTraps: [
        "<b>ADC Calculation:</b> A 10-bit ADC divides 5V into $2^{10} = 1024$ steps. Voltage = $(ADC\\text{ value} \\times 5.0) / 1023.0$.",
        "<b>Arduino is NOT a computer:</b> Arduino is a microcontroller (executes one program, low clock speed ~16 MHz, no Linux, no display)."
      ],
      formula: "10-bit ADC Range = 0 to 1023 · PWM Duty Cycle = (Time ON / Total Time) × 100%"
    },
    {
      week: 6,
      title: "Python Programming & Raspberry Pi",
      lectures: "Lectures 31–35",
      simpleWords: "Introduces the Raspberry Pi—a complete $35 credit-card computer running Linux—and how to write Python scripts to interact with real-world electronics.",
      keyNotes: [
        "<b>Raspberry Pi:</b> A full Single Board Computer (SBC) built around a System on Chip (SoC) with an ARM processor, GPU, RAM, HDMI output, USB ports, Wi-Fi, Ethernet, and running Linux (Raspberry Pi OS).",
        "<b>Arduino vs. Raspberry Pi (Big Difference):</b> Arduino is a low-power microcontroller (no OS, instant start, real-time sensor control). Raspberry Pi is a micro-computer (runs Linux, multi-tasking, runs Python, web servers, but needs safe shutdown and uses more power).",
        "<b>Hardware Bus Interfaces:</b>",
        "• <b>UART:</b> Asynchronous serial, 2 wires (TX transmit, RX receive), no clock wire.",
        "• <b>I2C:</b> Synchronous, 2 wires (SDA data, SCL clock), supports multiple devices with unique addresses.",
        "• <b>SPI:</b> Synchronous, 4 wires (MOSI, MISO, SCK clock, CS chip select), very fast full-duplex speed.",
        "<b>Python GPIO:</b> Python uses libraries like <code>RPi.GPIO</code> to control physical pins. Must specify pin numbering: <code>GPIO.setmode(GPIO.BCM)</code> (by chip pin) or <code>GPIO.BOARD</code> (by physical pin number)."
      ],
      examTraps: [
        "<b>3.3V Logic Warning:</b> Raspberry Pi GPIO pins operate strictly at 3.3V! Connecting a 5V sensor output directly will permanently burn the pin! Arduino uses 5V.",
        "<b>Wire Count Clue:</b> UART = 2 wires, I2C = 2 wires, SPI = 4 wires."
      ],
      formula: "SPI = 4 wires (MOSI, MISO, SCK, CS) · I2C = 2 wires (SDA, SCL) · Logic = 3.3V"
    },
    {
      week: 7,
      title: "Raspberry Pi Networking & Software-Defined Networking (SDN)",
      lectures: "Lectures 36–40",
      simpleWords: "Networking your Raspberry Pi, and understanding Software-Defined Networking (SDN)—the modern way to control networks by separating the brain from the switches.",
      keyNotes: [
        "<b>Raspberry Pi Networking:</b> Connecting via Wi-Fi (`wpa_supplicant.conf`), SSH (Secure Shell on port 22 for headless control), and DHCP / static IP.",
        "<b>The Problem with Traditional Networks:</b> Normal routers have the 'Brain' (Control Plane: deciding routing tables) and 'Muscle' (Data Plane: moving packets) tied together inside every box, making network changes slow and expensive.",
        "<b>The SDN Solution:</b> Separate the Control Plane from the Data Plane!",
        "• <b>Control Plane (Brain):</b> Centralized software controller decides routing rules for the entire network.",
        "• <b>Data Plane (Muscle):</b> Cheap, simple switches simply forward packets according to rules sent from the controller.",
        "<b>OpenFlow Protocol:</b> The open standard protocol used by the SDN Controller to program flow tables inside network switches (the <i>Southbound</i> interface).",
        "<b>Mininet:</b> A standard network emulation tool used to create realistic virtual OpenFlow networks on a PC or Raspberry Pi."
      ],
      examTraps: [
        "<b>Northbound vs. Southbound APIs:</b> Southbound API connects Controller to Switches (e.g. OpenFlow). Northbound API connects Controller to user software applications.",
        "<b>Plane Roles:</b> Data plane = packet forwarding; Control plane = routing logic/decisions; Management plane = user configuration."
      ],
      formula: "SDN = Separate Control Plane (Brain) from Data Plane (Muscle) via OpenFlow"
    },
    {
      week: 8,
      title: "Advanced SDN & Cloud Computing",
      lectures: "Lectures 41–45",
      simpleWords: "Using SDN to handle complex IoT traffic, and understanding Cloud Computing—renting powerful servers over the internet instead of buying expensive hardware.",
      keyNotes: [
        "<b>5 NIST Cloud Characteristics (Must Memorize!):</b> 1) On-demand self-service, 2) Broad network access, 3) Resource pooling, 4) Rapid elasticity (instant scale up/down), 5) Measured service (pay-per-use).",
        "<b>3 Cloud Service Models:</b>",
        "• <b>IaaS (Infrastructure as a Service):</b> Rent virtual machines, storage, and networking (e.g. Amazon EC2). You install and manage the OS and apps.",
        "• <b>PaaS (Platform as a Service):</b> Rent a ready programming runtime and databases (e.g. Google App Engine). You only write your app code.",
        "• <b>SaaS (Software as a Service):</b> Ready-to-use software accessed through a browser (e.g. Gmail, Google Docs). The provider manages everything.",
        "<b>Security CIA Triad:</b> <i>Confidentiality</i> (protecting data from unauthorized eyes via encryption), <i>Integrity</i> (ensuring data cannot be tampered with), <i>Availability</i> (ensuring services stay online when needed).",
        "<b>Cloud Simulators:</b> <i>CloudSim</i> (Java-based framework for cloud modeling), <i>CloudAnalyst</i> (focuses on geographically distributed users), <i>GreenCloud</i> (focuses on cloud energy consumption)."
      ],
      examTraps: [
        "<b>Customer Responsibility:</b> Highest in IaaS (customer manages OS, runtime, and data); lowest in SaaS (customer only uses the software).",
        "<b>Cloud is NOT always cheaper:</b> For 24/7 steady heavy workloads, buying physical servers can sometimes cost less than cloud hourly billing."
      ],
      formula: "5 NIST Traits = Self-Service + Network Access + Pooling + Elasticity + Measured"
    },
    {
      week: 9,
      title: "OpenStack, Sensor-Cloud & Fog Computing",
      lectures: "Lectures 46–50",
      simpleWords: "Building your own cloud with OpenStack, renting sensors as a service (Sensor-Cloud), and Fog Computing—doing calculations close to the device so there is no cloud delay.",
      keyNotes: [
        "<b>OpenStack:</b> Open-source software suite for building private and public clouds.",
        "• <b>Nova:</b> Compute (creates and manages virtual machines).",
        "• <b>Swift & Cinder:</b> Swift = Object storage; Cinder = Block storage (VM hard drives).",
        "• <b>Neutron:</b> Networking (virtual switches, subnets, routers, floating IPs).",
        "• <b>Glance:</b> Disk image storage (OS templates like Ubuntu, Debian).",
        "• <b>Keystone:</b> Authentication and Identity service.",
        "• <b>Horizon:</b> Web-based GUI dashboard.",
        "<b>Sensor-Cloud (Se-aaS):</b> Virtualizes physical sensor networks so multiple different applications can subscribe to and share sensor data as a cloud service.",
        "• <b>CoV-I:</b> Grouping homogeneous sensors in the same geographic region.",
        "• <b>CoV-II:</b> Grouping heterogeneous sensors spread across multiple regions.",
        "<b>Fog Computing:</b> Extends cloud services to the local network edge near devices. Why? The cloud is too far away and introduces 200–500 ms lag. Fog computing makes critical decisions locally in milliseconds!"
      ],
      examTraps: [
        "<b>Fog Latency Formula:</b> Total Latency = Time(device to cloud) + Time(cloud analysis) + Time(cloud to device). Example: 180 ms + 40 ms + 130 ms = 350 ms.",
        "<b>DevStack Commands:</b> <code>./stack.sh</code> starts the installation; <code>./unstack.sh</code> cleans up and stops it."
      ],
      formula: "Nova = Compute · Neutron = Network · Swift = Object · Cinder = Block · Fog = Low Latency"
    },
    {
      week: 10,
      title: "Smart Cities, Data Fusion, Smart Homes & Connected Vehicles",
      lectures: "Lectures 51–55",
      simpleWords: "Real-world smart applications: Smart Cities using the human body analogy, merging multiple sensor readings into one truth (Data Fusion), Home Automation, and Connected Vehicles (V2X).",
      keyNotes: [
        "<b>Smart City Human-Body Analogy (Exam Favorite!):</b>",
        "• Sensory Organs = Sensors (measure traffic, pollution, water).",
        "• Nerves = Communication Networks (Wi-Fi, 4G/5G, fiber optic).",
        "• Brain = Embedded Intelligence & Cloud Processing.",
        "• Organs = City Services (healthcare, water, power, sanitation).",
        "• Skeleton = Physical Buildings and Infrastructure.",
        "<b>6 Smart City Dimensions:</b> Economy, Governance, People, Mobility, Environment, Living.",
        "<b>Data Fusion:</b> Combining data from multiple sensors to achieve higher accuracy and confidence than any single sensor alone.",
        "• <b>3 Fusion Levels:</b> 1) <i>Pixel Level</i> (raw sensor data fused), 2) <i>Feature Level</i> (extracted traits fused), 3) <i>Decision Level</i> (high-level decisions combined).",
        "<b>Smart Home Protocols (HAN):</b> UPnP (zero-config device discovery), DLNA (media streaming), KNX & LonWorks (building automation), ZigBee (low-power smart devices), X-10 (signals over AC power lines).",
        "<b>Connected Vehicles (V2X):</b> V2V (Vehicle-to-Vehicle for crash prevention), V2I (Vehicle-to-Infrastructure for traffic lights/tolls), V2P (Vehicle-to-Pedestrian).",
        "<b>DSRC (Dedicated Short-Range Communications):</b> Standard wireless technology for connected cars. Uses <b>75 MHz of spectrum</b> in the <b>5.9 GHz band</b> (5.850 to 5.925 GHz). Governed by <b>IEEE 802.11p</b> and <b>IEEE 1609</b>."
      ],
      examTraps: [
        "<b>DSRC Frequency and Bandwidth:</b> Bandwidth is <b>75 MHz</b>, frequency is <b>5.9 GHz</b> (5850–5925 MHz). This is asked in almost every NPTEL final exam!",
        "<b>Data Fusion Hierarchy:</b> Pixel Level (lowest/raw) → Feature Level → Decision Level (highest abstraction)."
      ],
      formula: "DSRC = 75 MHz (5.9 GHz) · V2X = V2V + V2I + V2P · Body Analogy: Nerves = Networks"
    }
  ];

  function renderRevision(term) {
    const fullForms = getMasterFullForms();

    let html = `<div class="hero">
      <h2>📚 NPTEL IoT Quick Revision Hub</h2>
      <p class="sub">Two comprehensive revision options: Consolidated 1–10 Week Summaries in Easy Language with High-Yield Exam Topics, or the Master Glossary of 165+ Full Forms at once.</p>
    </div>`;

    // 2 Option Cards
    html += `<div class="rev-option-grid">
      <div class="rev-option-card${revView === "summary" ? " active" : ""}" data-action="rev-switch-view" data-view="summary">
        <span class="roc-icon">📋</span>
        <div>
          <h3>Option 1: All 1–10 Week Summaries &amp; Exam IMP Topics</h3>
          <p>Consolidated lecture summaries in easy and simple language, core exam highlights, key terms, and 10 high-yield topics frequently tested in NPTEL exams.</p>
        </div>
        <span class="roc-badge">Easy Language &amp; High-Yield</span>
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

      // Section B: All 1-10 Week Summaries & Important Notes (Easy Language)
      html += `<div class="rev-section-title">
        <span>📖 All 1–10 Week Consolidated Summaries &amp; Important Notes</span>
        <span class="rs-pill">Easy &amp; Simple Language</span>
      </div>`;

      // Week filter bar + expand/collapse controls
      html += `<div class="rev-filter-bar">
        <span style="font-size:.82rem;font-weight:700;color:var(--fg);margin-right:4px">Filter Week:</span>
        <button class="rev-filter-btn${revFilterWeek === "all" ? " active" : ""}" data-action="rev-filter-week" data-week="all">All Weeks (1–10)</button>
        ${EASY_WEEK_SUMMARIES.map(w => `<button class="rev-filter-btn${revFilterWeek === String(w.week) ? " active" : ""}" data-action="rev-filter-week" data-week="${w.week}">W${w.week}</button>`).join("")}
        <div style="margin-left:auto;display:flex;gap:6px">
          <button class="ghost" data-action="rev-expand-all" style="font-size:.78rem;padding:3px 8px">▾ Expand All</button>
          <button class="ghost" data-action="rev-collapse-all" style="font-size:.78rem;padding:3px 8px">▴ Collapse All</button>
        </div>
      </div>`;

      let weeksToShow = EASY_WEEK_SUMMARIES;
      if (revFilterWeek !== "all") {
        const targetW = Number(revFilterWeek);
        weeksToShow = EASY_WEEK_SUMMARIES.filter(w => Number(w.week) === targetW);
      }
      if (term) {
        weeksToShow = weeksToShow.filter(w => 
          (w.title + " " + w.simpleWords + " " + w.keyNotes.join(" ") + " " + w.examTraps.join(" ") + " " + w.formula).toLowerCase().includes(term)
        );
      }

      if (weeksToShow.length > 0) {
        weeksToShow.forEach(w => {
          const rawW = THEORY.find(x => x.week === Number(w.week));
          const isRead = rawW ? readCount(rawW) : 0;
          const totalCh = rawW ? rawW.chapters.length : 0;
          html += `<details class="rev-week-block" open>
            <summary>
              <span class="rwb-week-num">${w.week}</span>
              <span style="color:var(--fg);font-weight:700">Week ${w.week}: ${esc(w.title)}</span>
              <span style="font-size:.78rem;color:var(--mut);font-weight:500;margin-left:8px">${esc(w.lectures)}</span>
              <span style="font-size:.74rem;color:var(--ok);margin-left:auto;margin-right:12px;font-weight:600">${isRead}/${totalCh} read</span>
            </summary>
            <div class="rev-week-body">
              <div class="rev-simple-box">
                <b class="rsb-tag">🎯 In Simple Words (The Big Picture):</b>
                ${esc(w.simpleWords)}
              </div>
              <div style="margin-bottom:14px">
                <b style="font-size:.88rem;color:var(--fg);display:block;margin-bottom:8px">⚡ Key Concepts &amp; Important Notes (Easy Language):</b>
                <ul class="rev-highlights-list">
                  ${w.keyNotes.map(n => `<li>${n}</li>`).join("")}
                </ul>
              </div>
              <div class="rev-trap-box">
                <b class="rtb-tag">⚠️ Common NPTEL Exam Traps &amp; Tricks:</b>
                <ul style="margin:0;padding-left:18px">
                  ${w.examTraps.map(tr => `<li style="margin:3px 0">${tr}</li>`).join("")}
                </ul>
              </div>
              <div style="margin-top:10px;display:flex;align-items:center;flex-wrap:wrap;gap:10px;justify-content:space-between">
                <div class="rev-formula-pill">💡 ${esc(w.formula)}</div>
                <button class="rev-nav-btn" data-action="open-week" data-week="${Number(w.week) - 1}">Open Full Week ${w.week} Theory →</button>
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
