// FNM 2.0 DataviewJS Widget: FNM-Routine-Cockpit (Konfigurator, Phasen-Timer, Live-Tempo & 7-Tage-Roadmap)
const STORAGE_KEY = "fnm_dv_routine_v1";

const ROADMAP_DAYS = [
  { day: "Di, 24.11.", title: "Abschluss LF 1.01 + Priming LF 1.09a", desc: "4 Blockaden in LF01.01_Recall.md schließen + Daniel-Jung-Video & Schritte 1–4 von LF 1.09a.", link: "AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.01_Recall" },
  { day: "Mi, 25.11.", title: "Recall LF 1.09a + Python-Lab", desc: "Teil A + Teil B schriftlich + Execute Code in LF01.09a_Recall.md, Lab_01_09a & NotebookLM Cold-Check.", link: "AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09a_Recall" },
  { day: "Do, 26.11.", title: "LF 1.09b (Mengenlehre → SQL/Python)", desc: "Schritte 0–5 von LF 1.09b komplett + Lab_01_09b_Mengen_SQL.", link: "AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09b_Mengenlehre_Mengenoperationen_SQL_Python" },
  { day: "Fr, 27.11.", title: "LF 1.09c (Dreisatz/Gleichungen) + Tag 3 LF 1.01", desc: "10 Min. kalter Tag-3-Check für LF 1.01 + Schritte 0–5 von LF 1.09c.", link: "AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09c_Alltagsmathematik_Dreisatz_Gleichungen" },
  { day: "Sa, 28.11.", title: "LF 1.10a (Binär, KiB vs. kB, Zweierkomplement)", desc: "Schritte 0–5 von LF 1.10a + kurzer Tag-3-Check der Blockaden von LF 1.09a.", link: "AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10a_Zahlensysteme_Bits_Bytes" },
  { day: "So, 29.11.", title: "Interleaving Logik/Mathe (Keine neuen Lektionen)", desc: "Gemischt: 1× De Morgan + 1× UNION/EXCEPT + 1× antiproportionaler Dreisatz + 1× KiB/kB + Dashboard.", link: "00_Dashboard_SecondBrain_FNM" },
  { day: "Mo, 30.11.", title: "LF 1.10b (Stochastik & Statistik)", desc: "Schritte 0–5 von LF 1.10b: schließt Mathe-Block von LF 1 ab und bereitet LF 10.02 vor.", link: "AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10b_Grundlagen_Stochastik_Statistik" }
];

function loadState() {
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      tab: p.tab || "timer",
      budget: Number(p.budget) || 60,
      studyType: p.studyType || "proc",
      pace: Number(p.pace) || 4,
      roadmap: p.roadmap || {}
    };
  } catch (_) {
    return { tab: "timer", budget: 60, studyType: "proc", pace: 4, roadmap: {} };
  }
}

const state = loadState();
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function computePhases(total, type) {
  const p1 = Math.max(8, Math.round(total * 0.17));
  const p4 = Math.max(8, Math.round(total * 0.15));
  const rem = total - p1 - p4;
  const p2 = type === "proc" ? Math.round(rem * 0.52) : Math.round(rem * 0.45);
  const p3 = rem - p2;
  return [
    { name: "1. Blockaden-Chirurgie & SR (#fnm-review-active)", min: p1, desc: "Nur offene Zeilen im Blockaden-Log trainieren. Kein zweites Lesen." },
    { name: type === "proc" ? "2. Video-Priming + Schritte 1–4 (1× Lesen)" : "2. Schritte 1–4 (4 Leitfragen + 1× Lesen + SVG)", min: p2, desc: type === "proc" ? "Video ≤ 10 Min., dann ruhig lesen inkl. Faded Example & SVG." : "Flüssig ohne Mitschreiben lesen, dann SVG-Pyramide verinnerlichen." },
    { name: type === "proc" ? "3. Schritt 5 (_Recall.md + Teil B + Python-Lab)" : "3. Schritt 5 (_Recall.md: Teil A + ≥ 2 Fragen Teil B)", min: p3, desc: "Ohne Text: freies Schema + schriftliche ZPA-Antworten." },
    { name: "4. NotebookLM Cold-Check & Fehler-Log", min: p4, desc: "Kaltes Quiz durchführen, Fehler nach Fenu klassifizieren & next_review setzen." }
  ];
}

function getLiveOpenAp1Count() {
  try {
    const pages = dv.pages("#fnm").where((p) => p.sub_lf && p.file && p.file.path.startsWith("AP1/") && p.type !== "recall" && p.type !== "lab");
    if (!pages || pages.length === 0) return 53;
    const doneSet = ["abgeschlossen", "fertig", "done", "gemeistert", "erledigt"];
    const open = pages.where((p) => !doneSet.includes(String(p.status || "").toLowerCase()));
    return open.length > 0 ? open.length : 53;
  } catch (_) {
    return 53;
  }
}

let timerIndex = 0;
let timerSeconds = computePhases(state.budget, state.studyType)[0].min * 60;
let timerHandle = null;

function stopTimer() {
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
  }
}

const root = dv.container.createDiv({ cls: "fnm-w-box" });

function formatMMSS(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateTimerDomOnly() {
  const disp = root.querySelector('[data-pane="timer-display"]');
  const badge = root.querySelector('[data-pane="timer-badge"]');
  const pname = root.querySelector('[data-pane="timer-pname"]');
  const phases = computePhases(state.budget, state.studyType);
  const cur = phases[timerIndex] || phases[0];
  if (disp) disp.textContent = formatMMSS(timerSeconds);
  if (badge) badge.textContent = `Phase ${timerIndex + 1} / 4`;
  if (pname) pname.textContent = cur.name;
}

function startTimer() {
  if (timerHandle) return;
  timerHandle = setInterval(() => {
    if (!root.isConnected) {
      stopTimer();
      return;
    }
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDomOnly();
    } else {
      stopTimer();
      const phases = computePhases(state.budget, state.studyType);
      if (timerIndex < phases.length - 1) {
        timerIndex++;
        timerSeconds = phases[timerIndex].min * 60;
        render();
      }
    }
  }, 1000);
}

function render() {
  const rmDone = ROADMAP_DAYS.filter((_, idx) => !!state.roadmap[idx]).length;
  const rmPct = Math.round((rmDone / ROADMAP_DAYS.length) * 100);
  const phases = computePhases(state.budget, state.studyType);
  const curPhase = phases[timerIndex] || phases[0];
  const openAp1 = getLiveOpenAp1Count();
  const weeks = Math.ceil(openAp1 / state.pace);
  const targetDate = new Date(Date.now() + weeks * 7 * 86400000).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  root.innerHTML = `
    <div class="fnm-w-header">
      <div>
        <div class="fnm-w-title">🎛️ Interaktives FNM-Routine-Cockpit</div>
        <div class="fnm-w-sub">Sitzungs-Konfigurator, Phasen-Timer, Live-AP1-Tempo-Rechner &amp; 7-Tage-Roadmap.</div>
      </div>
      <div class="fnm-w-progress-wrap">
        <span>Roadmap: <strong>${rmDone} / ${ROADMAP_DAYS.length} Tage</strong></span>
        <div class="fnm-w-progress-track">
          <div class="fnm-w-progress-fill" style="width:${rmPct}%"></div>
        </div>
      </div>
    </div>

    <div class="fnm-w-tabs">
      <button class="fnm-w-tab ${state.tab === "timer" ? "is-active" : ""}" data-tab="timer">1. Routine-Konfigurator &amp; Timer</button>
      <button class="fnm-w-tab ${state.tab === "roadmap" ? "is-active" : ""}" data-tab="roadmap">2. 7-Tage-Roadmap (24.–30. Nov)</button>
    </div>

    <div data-pane="body"></div>
  `;

  root.querySelectorAll(".fnm-w-tab").forEach((b) => {
    b.addEventListener("click", () => {
      state.tab = b.dataset.tab;
      saveState();
      render();
    });
  });

  const body = root.querySelector('[data-pane="body"]');

  if (state.tab === "roadmap") {
    body.innerHTML = `
      <div class="fnm-w-grid-2">
        ${ROADMAP_DAYS.map((d, idx) => {
          const checked = !!state.roadmap[idx];
          return `
            <div class="fnm-w-rm-card ${checked ? "is-done" : ""}">
              <input type="checkbox" data-rm="${idx}" ${checked ? "checked" : ""} style="margin-top:3px;cursor:pointer;" />
              <div style="flex:1;">
                <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:4px;">
                  <span class="fnm-w-pill fnm-w-pill--info">${d.day}</span>
                  <strong>${d.title}</strong>
                </div>
                <div class="fnm-w-sub" style="margin-bottom:6px;">${d.desc}</div>
                <a href="#" data-open-note="${d.link}" style="font-size:0.82em;font-weight:600;">📄 Notiz öffnen →</a>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    body.querySelectorAll("input[data-rm]").forEach((cb) => {
      cb.addEventListener("change", () => {
        state.roadmap[cb.dataset.rm] = cb.checked;
        saveState();
        render();
      });
    });

    body.querySelectorAll("[data-open-note]").forEach((a) => {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const target = a.dataset.openNote;
        if (app && app.workspace) {
          app.workspace.openLinkText(target, dv.current()?.file?.path || "");
        }
      });
    });
    return;
  }

  // Tab 1: Konfigurator & Timer
  body.innerHTML = `
    <div class="fnm-w-grid-2">
      <div class="fnm-w-panel" style="margin-top:0;">
        <strong>Heutiges Zeitbudget &amp; Einheitstyp</strong>
        <div class="fnm-w-actions" style="margin:8px 0;">
          ${[45, 60, 90, 120].map((m) => `
            <button class="fnm-w-btn ${state.budget === m ? "is-active" : ""}" data-budget="${m}">${m} Min.</button>
          `).join("")}
        </div>
        <div class="fnm-w-actions" style="margin-bottom:10px;">
          <button class="fnm-w-btn ${state.studyType === "theory" ? "is-active" : ""}" data-stype="theory">Theorie / BWL / ITIL</button>
          <button class="fnm-w-btn ${state.studyType === "proc" ? "is-active" : ""}" data-stype="proc">Prozedural / Logik / Python</button>
        </div>
        ${phases.map((p, idx) => `
          <div class="fnm-w-phase-row ${idx === timerIndex ? "is-active" : ""}">
            <div>
              <div><strong>${p.name}</strong></div>
              <div class="fnm-w-sub">${p.desc}</div>
            </div>
            <span class="fnm-w-pill fnm-w-pill--info">${p.min} Min.</span>
          </div>
        `).join("")}
      </div>

      <div>
        <div class="fnm-w-panel" style="margin-top:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong>Geführter Phasen-Timer</strong>
            <span class="fnm-w-pill fnm-w-pill--info" data-pane="timer-badge">Phase ${timerIndex + 1} / 4</span>
          </div>
          <div class="fnm-w-sub" data-pane="timer-pname" style="text-align:center;margin-top:8px;">${curPhase.name}</div>
          <div class="fnm-w-timer-display" data-pane="timer-display">${formatMMSS(timerSeconds)}</div>
          <div class="fnm-w-actions" style="justify-content:center;">
            <button class="fnm-w-btn fnm-w-btn--primary" data-tact="start">Start</button>
            <button class="fnm-w-btn" data-tact="pause">Pause</button>
            <button class="fnm-w-btn" data-tact="next">Nächste Phase</button>
            <button class="fnm-w-btn" data-tact="reset">Reset</button>
          </div>
        </div>

        <div class="fnm-w-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong>Live-AP1-Tempo-Rechner</strong>
            <span class="fnm-w-pill fnm-w-pill--ok" data-pane="pace-val">${state.pace} / Woche</span>
          </div>
          <input type="range" min="2" max="7" value="${state.pace}" data-pane="pace-slider" style="width:100%;margin:8px 0;cursor:pointer;" />
          <div class="fnm-w-sub" data-pane="pace-out">
            Offene AP1-Einheiten im Vault: <strong>${openAp1}</strong> · Bei <strong>${state.pace} Einheiten/Woche</strong> (Sonntag = Interleaving) erreichst du AP1-Vollständigkeit in ca. <strong>${weeks} Wochen</strong> (Ziel: <strong>${targetDate}</strong>).
          </div>
        </div>
      </div>
    </div>
  `;

  body.querySelectorAll("[data-budget]").forEach((b) => {
    b.addEventListener("click", () => {
      state.budget = Number(b.dataset.budget);
      saveState();
      stopTimer();
      timerIndex = 0;
      timerSeconds = computePhases(state.budget, state.studyType)[0].min * 60;
      render();
    });
  });

  body.querySelectorAll("[data-stype]").forEach((b) => {
    b.addEventListener("click", () => {
      state.studyType = b.dataset.stype;
      saveState();
      stopTimer();
      timerIndex = 0;
      timerSeconds = computePhases(state.budget, state.studyType)[0].min * 60;
      render();
    });
  });

  const tStart = body.querySelector('[data-tact="start"]');
  const tPause = body.querySelector('[data-tact="pause"]');
  const tNext = body.querySelector('[data-tact="next"]');
  const tReset = body.querySelector('[data-tact="reset"]');

  if (tStart) tStart.addEventListener("click", startTimer);
  if (tPause) tPause.addEventListener("click", stopTimer);
  if (tNext) {
    tNext.addEventListener("click", () => {
      stopTimer();
      timerIndex = (timerIndex + 1) % 4;
      timerSeconds = computePhases(state.budget, state.studyType)[timerIndex].min * 60;
      render();
    });
  }
  if (tReset) {
    tReset.addEventListener("click", () => {
      stopTimer();
      timerSeconds = computePhases(state.budget, state.studyType)[timerIndex].min * 60;
      updateTimerDomOnly();
    });
  }

  const slider = body.querySelector('[data-pane="pace-slider"]');
  if (slider) {
    slider.addEventListener("input", () => {
      state.pace = Number(slider.value);
      saveState();
      const w = Math.ceil(openAp1 / state.pace);
      const td = new Date(Date.now() + w * 7 * 86400000).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
      const pv = body.querySelector('[data-pane="pace-val"]');
      const po = body.querySelector('[data-pane="pace-out"]');
      if (pv) pv.textContent = `${state.pace} / Woche`;
      if (po) {
        po.innerHTML = `Offene AP1-Einheiten im Vault: <strong>${openAp1}</strong> · Bei <strong>${state.pace} Einheiten/Woche</strong> (Sonntag = Interleaving) erreichst du AP1-Vollständigkeit in ca. <strong>${w} Wochen</strong> (Ziel: <strong>${td}</strong>).`;
      }
    });
  }
}

render();
