// FNM 2.0 DataviewJS Widget: LF 1.01 Coach (Visuelle Karte, Rollen-Simulator & Blockaden-Drill)
const STORAGE_KEY = "fnm_dv_lf01_01_v1";

const EXAM_DATA = {
  ap1: {
    title: "AP1 – Einrichtung eines IT-gestützten Arbeitsplatzes (20 % · 90 Min.)",
    summary: "Für alle vier Fachrichtungen identisch. Prüft die ganzheitliche Planung eines Kundenarbeitsplatzes.",
    details: [
      "Dauer: 90 Min. schriftlich · Gewichtung: 20 % der Gesamtnote.",
      "Die 5 Pflicht-Themenbereiche (T-W-B-E-S): Technik · Wirtschaft · Betriebsorganisation · Ergonomie · IT-Sicherheit & Datenschutz.",
      "Lernform: duale Ausbildung (Ausbildungsbetrieb + Berufsschule ca. 60 Tage/Jahr), NICHT duales Studium!"
    ],
    trap: "In LF 1.01 fehlten die 5 Themenbereiche, und im Text stand „duales Studium“ statt „duale Ausbildung“."
  },
  projekt: {
    title: "AP2 – Betriebliche Projektarbeit (50 % · 40 Std. + 30 Min. Präsi/Fachgespräch)",
    summary: "Macht die Hälfte der Gesamtnote aus: Du löst ein reales Daten- oder Prozessproblem im Betrieb.",
    details: [
      "Gesamtumfang: 40 Stunden, davon ca. 8 Stunden für die Dokumentation.",
      "Die 4 Pflichtphasen: Planung → Durchführung → Test → Abnahme.",
      "Mündlicher Abschluss: 30 Minuten (Präsentation + Fachgespräch)."
    ],
    trap: "In LF 1.01 fehlten die 4 Projektphasen und das feste Doku-Budget von ca. 8 Stunden."
  },
  prozess: {
    title: "AP2 Schriftlich 1 – Durchführung einer Prozessanalyse (10 % · 90 Min.)",
    summary: "Erste berufsspezifische FIDPA-Klausur: Ist-/Soll-Prozesse, BPMN 2.0, Engpässe und KPIs.",
    details: [
      "Dauer: 90 Minuten · Gewichtung: 10 % (getrennt von „Sicherstellen der Datenqualität“).",
      "Schwerpunkte: Prozessmodellierung (BPMN 2.0 / UML), Process Mining und Automatisierung."
    ],
    trap: "Darf nicht mit Datenqualität zu „20 % Datensicherung“ zusammengezogen werden – eigene Klausur!"
  },
  daten: {
    title: "AP2 Schriftlich 2 – Sicherstellen der Datenqualität (10 % · 90 Min.)",
    summary: "Zweite berufsspezifische FIDPA-Klausur: Datenbereinigung, SQL, Python/NumPy, Statistik und ML.",
    details: [
      "Dauer: 90 Minuten · Gewichtung: 10 %.",
      "Exakter Fachbegriff: Datenqualität (Bereinigung, Vollständigkeit, Validität), NICHT Datensicherung (Backup!)."
    ],
    trap: "In Teil A stand „20 Prozent Datensicherung“ – klassischer Verknüpfungsfehler!"
  },
  wiso: {
    title: "AP2 Schriftlich 3 – Wirtschafts- und Sozialkunde / WiSo (10 % · 60 Min.)",
    summary: "Dritte schriftliche Klausur: Arbeitsrecht, BWL/VWL, Betriebsorganisation und Arbeitssicherheit.",
    details: [
      "Dauer: 60 Minuten · Gewichtung: 10 % · überwiegend Multiple-Choice.",
      "Prüfungssubjekt ist der Prüfling / Azubi (du selbst), NICHT der Ausbilder!"
    ],
    trap: "In Teil A stand „wo der Ausbilder sich mit der WiSo auseinandersetzt“ – gemeint ist der Prüfling/Azubi."
  }
};

const ROLES_TASKS = [
  {
    id: "t1",
    task: "Physische Netzwerkkabel verlegen und Stromversorgung anschließen",
    role: "IT-Systemelektroniker*in",
    why: "Zuständig für Stromversorgung und physische Verkabelung bis zum Anschluss.",
    contrast: "Nicht FIDV: Der FIDV plant vernetzte IoT-/OT-Systeme, verlegt aber nicht primär Stromleitungen."
  },
  {
    id: "t2",
    task: "Vernetzte Produktionsmaschinen und IoT-Sensoren planen/warten (Industrie 4.0)",
    role: "FIDV (Digitale Vernetzung)",
    why: "Verbindet Produktionsanlagen, OT-/CPS-Protokolle und Industrie-4.0-Infrastruktur.",
    contrast: "Geht über reine Stromkabel (IT-Systemelektroniker*in) hinaus und baut keine ML-Modelle (FIDPA)."
  },
  {
    id: "t3",
    task: "Sensordaten bereinigen, KPIs berechnen und ein ML-Prognosemodell trainieren",
    role: "FIDPA (Daten- und Prozessanalyse)",
    why: "Dein Kerngeschäft: Datenqualität sichern, Statistik/ML anwenden und Prozesse optimieren.",
    contrast: "Administriert keine Server-Cluster (FISI) und entwickelt keine komplette Endanwender-UI (FIAE)."
  },
  {
    id: "t4",
    task: "Server einrichten, Rechte verwalten und Admin-Skripte automatisieren",
    role: "FISI (Systemintegration)",
    why: "Betreibt Infrastruktur, Betriebssysteme, Netzwerke, Active Directory und Systemstabilität.",
    contrast: "Nutzt Skripting für IT-Betrieb, nicht für statistische Datenanalyse oder ML."
  },
  {
    id: "t5",
    task: "Kunden-Software inkl. Benutzeroberfläche und Geschäftslogik programmieren",
    role: "FIAE (Anwendungsentwicklung)",
    why: "Entwirft, programmiert und testet Anwendungen End-to-End für Nutzer und Kunden.",
    contrast: "Baut das Softwareprodukt; der FIDPA durchleuchtet Datenqualität und Geschäftsprozesse."
  },
  {
    id: "t6",
    task: "Kundenangebote kalkulieren, ROI berechnen und Pflichtenhefte kaufmännisch prüfen",
    role: "IT-Kaufleute",
    why: "Führen wirtschaftliche Beratung, Kalkulation, Beschaffung und Vertragssteuerung durch.",
    contrast: "Technische Berufe liefern Fachexpertise, die kaufmännische Steuerung liegt bei den IT-Kaufleuten."
  }
];

const FLIP_PAIRS = [
  {
    frontTitle: "Datenqualität vs. Datensicherung",
    frontSub: "Wie heißt die schriftliche FIDPA-Klausur (10 %)?",
    backText: "Datenqualität = Bereinigung, Vollständigkeit & Validität (FIDPA-Klausur, 10 %). Datensicherung = Backup & Recovery (LF 4.10)."
  },
  {
    frontTitle: "Duale Ausbildung vs. Duales Studium",
    frontSub: "Welche Ausbildungsform beschreibt LF 1.01?",
    backText: "Duale Ausbildung = Ausbildungsbetrieb + Berufsschule (~60 Tage/Jahr, IHK-Abschluss). Duales Studium = Betrieb + Hochschule."
  },
  {
    frontTitle: "Prüfling (Azubi) vs. Ausbilder",
    frontSub: "Wer schreibt die WiSo-Prüfung (10 %)?",
    backText: "Der Prüfling / Azubi (du!) schreibt WiSo in 60 Min. Der Ausbilder ist dein betrieblicher Betreuer."
  }
];

const DRILL_ITEMS = [
  {
    id: "d1",
    logMatch: "AP1 5 Themenbereiche",
    operator: "NENNEN · 3 P.",
    blockade: "AP1 5 Themenbereiche",
    question: "Nenne die 5 Themenbereiche, die in der AP1 („Einrichtung eines IT-gestützten Arbeitsplatzes“, 90 Min., 20 %) geprüft werden.",
    hint: "Denke an den kompletten Kunden-Arbeitsplatz (T-W-B-E-S): PC, Preis, Firmenablauf, Gesundheit und Datenschutz.",
    solution: "1. Technik · 2. Wirtschaft · 3. Betriebsorganisation · 4. Ergonomie · 5. IT-Sicherheit & Datenschutz."
  },
  {
    id: "d2",
    logMatch: "AP1 5 Themenbereiche",
    operator: "UNTERSCHEIDEN · 2 P.",
    blockade: "Duale Ausbildung vs. Studium",
    question: "Wie heißen die beiden Lernorte im dualen Ausbildungssystem (nicht Studium!) und wie hoch ist der grobe Berufsschul-Anteil pro Jahr?",
    hint: "Ein Lernort ist die betriebliche Praxis, der andere die staatliche Schule (~ein Fünftel des Jahres).",
    solution: "Ausbildungsbetrieb (Praxis) + Berufsschule (ca. 60 Tage/Jahr, inkl. BWL/Recht). Bei Umschulung: Bildungsträger + Praktikumsbetrieb."
  },
  {
    id: "d3",
    logMatch: "AP2 Schriftlich",
    operator: "AUFTEILEN · 4 P.",
    blockade: "AP2 Schriftlich (10% + 10% + 10%)",
    question: "Wie teilen sich die 30 % schriftliche Prüfungen der AP2 (FIDPA) exakt auf? Nenne je Bezeichnung, Gewichtung (%) und Dauer.",
    hint: "Es gibt keine 20-%-Prüfung namens Datensicherung! Es sind drei getrennte Klausuren zu je 10 %.",
    solution: "1) Durchführung einer Prozessanalyse (10 %, 90 Min.) · 2) Sicherstellen der Datenqualität (10 %, 90 Min.) · 3) WiSo (10 %, 60 Min., meist MC)."
  },
  {
    id: "d4",
    logMatch: "AP2 40h-Projekt",
    operator: "BESCHREIBEN · 4 P.",
    blockade: "AP2 40h-Projekt: 4 Phasen & ~8h Doku",
    question: "Wie viele Stunden umfasst die Projektarbeit (50 %), wie viel Zeit entfällt auf die Doku, welche 4 Phasen durchläufst du und wie endet sie?",
    hint: "40 Stunden gesamt → 1 Arbeitstag für die Doku (~8 Std.). Phasen: erst denken, dann umsetzen, dann prüfen, dann übergeben.",
    solution: "40 Stunden gesamt (davon ca. 8 Std. Dokumentation). 4 Phasen: Planung → Durchführung → Test → Abnahme. Abschluss: 30 Min. Präsentation & Fachgespräch."
  },
  {
    id: "d5",
    logMatch: "Rollenabgrenzung: FIDV",
    operator: "ZUORDNEN · 3 P.",
    blockade: "FIDV vs. IT-Systemelektroniker",
    question: "Grenze die Aufgaben von IT-Systemelektroniker*in, FIDV und FIDPA anhand einer vernetzten Smart Factory ab.",
    hint: "Trenne 3 Ebenen: Strom/physische Kabel → vernetzte IoT/OT-Maschinen → Datenbereinigung und ML-Prognose.",
    solution: "IT-Systemelektroniker*in: Stromversorgung & physische Verkabelung. FIDV: Vernetzte Produktions-/IoT-Systeme (Industrie 4.0). FIDPA: Datenqualität, Statistik & ML-Prognose."
  },
  {
    id: "d6",
    logMatch: "AP2 Schriftlich",
    operator: "KORRIGIEREN · 2 P.",
    blockade: "Prüfling vs. Ausbilder",
    question: "Korrigiere diesen Satz für die IHK: „In der AP2 setzt sich der Ausbilder mit 20 % Datensicherung und WiSo auseinander.“",
    hint: "Korrigiere 3 Fehler im Satz: Wer wird geprüft, wie heißen die zwei Fachklausuren und wie hoch ist ihr jeweiliger Prozentanteil?",
    solution: "Korrektur: Der Prüfling (Azubi) legt in der AP2 zwei Fachklausuren à 10 % (Prozessanalyse + Sicherstellen der Datenqualität) sowie 10 % WiSo ab."
  }
];

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      tab: parsed.tab || "drill",
      exam: parsed.exam || "ap1",
      roleTask: parsed.roleTask || "t1",
      flipped: parsed.flipped || {},
      drill: parsed.drill || {}
    };
  } catch (_) {
    return { tab: "drill", exam: "ap1", roleTask: "t1", flipped: {}, drill: {} };
  }
}

const state = loadState();
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const root = dv.container.createDiv({ cls: "fnm-w-box" });

function getStatusPill(st) {
  if (st === "mastered") return '<span class="fnm-w-pill fnm-w-pill--ok">Gemeistert</span>';
  if (st === "lesefehler") return '<span class="fnm-w-pill fnm-w-pill--warn">Lesefehler</span>';
  if (st === "verknuepfung") return '<span class="fnm-w-pill fnm-w-pill--warn">Verknüpfungsfehler</span>';
  if (st === "luecke") return '<span class="fnm-w-pill fnm-w-pill--err">Wissenslücke</span>';
  return '<span class="fnm-w-pill fnm-w-pill--info">Offen</span>';
}

function sanitizeCell(txt) {
  return String(txt || "").replace(/\|/g, "/").replace(/\r?\n+/g, " ").trim();
}

async function writeDrillToBlockadenLog() {
  const current = dv.current();
  if (!current || !current.file || !current.file.path) return;
  const file = app.vault.getAbstractFileByPath(current.file.path);
  if (!file) return;

  const rowGroups = [
    { match: "AP1 5 Themenbereiche", ids: ["d1", "d2"] },
    { match: "AP2 Schriftlich", ids: ["d3", "d6"] },
    { match: "AP2 40h-Projekt", ids: ["d4"] },
    { match: "Rollenabgrenzung: FIDV", ids: ["d5"] }
  ];

  await app.vault.process(file, (content) => {
    const lines = content.split("\n");
    const updated = lines.map((line) => {
      if (!line.trim().startsWith("|")) return line;
      const group = rowGroups.find((g) => line.includes(g.match));
      if (!group) return line;
      const parts = line.split("|");
      if (parts.length < 7) return line;

      const texts = group.ids
        .map((id) => sanitizeCell((state.drill[id] || {}).answer))
        .filter(Boolean);
      const allMastered = group.ids.every((id) => (state.drill[id] || {}).status === "mastered");

      if (texts.length > 0) {
        parts[4] = " " + texts.join(" · ") + " ";
      }
      parts[5] = allMastered ? " [x] " : " [ ] ";
      return parts.join("|");
    });
    return updated.join("\n");
  });

  if (typeof Notice !== "undefined") {
    new Notice("Blockaden-Log in LF01.01_Recall.md aktualisiert!");
  }
}

function render() {
  const masteredCount = DRILL_ITEMS.filter((d) => state.drill[d.id]?.status === "mastered").length;
  const pct = Math.round((masteredCount / DRILL_ITEMS.length) * 100);

  root.innerHTML = `
    <div class="fnm-w-header">
      <div>
        <div class="fnm-w-title">⚡ Interaktiver FNM-Verstärker – LF 1.01</div>
        <div class="fnm-w-sub">Kein zweites Lesen (Fenu): Trainiere gezielt deine 4 Blockaden direkt in Obsidian.</div>
      </div>
      <div class="fnm-w-progress-wrap">
        <span><strong>${masteredCount} / ${DRILL_ITEMS.length}</strong> gemeistert</span>
        <div class="fnm-w-progress-track">
          <div class="fnm-w-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
    </div>

    <div class="fnm-w-tabs">
      <button class="fnm-w-tab ${state.tab === "drill" ? "is-active" : ""}" data-tab="drill">1. Chirurgischer Drill (Blockaden)</button>
      <button class="fnm-w-tab ${state.tab === "visual" ? "is-active" : ""}" data-tab="visual">2. Visuelle IHK-Landkarte &amp; Flip-Cards</button>
      <button class="fnm-w-tab ${state.tab === "roles" ? "is-active" : ""}" data-tab="roles">3. IT-Rollen-Simulator</button>
    </div>

    <div data-pane="body"></div>
  `;

  root.querySelectorAll(".fnm-w-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.tab = btn.dataset.tab;
      saveState();
      render();
    });
  });

  const body = root.querySelector('[data-pane="body"]');

  if (state.tab === "visual") {
    const ed = EXAM_DATA[state.exam] || EXAM_DATA.ap1;
    body.innerHTML = `
      <div class="fnm-w-panel">
        <strong>Gestreckte IHK-Abschlussprüfung (100 %)</strong>
        <div class="fnm-w-sub">Klicke einen Prüfungsblock für Details &amp; erkannte Fehlerquelle:</div>
        <div class="fnm-w-ihk-bar">
          <button class="fnm-w-ihk-seg fnm-w-seg--ap1 ${state.exam === "ap1" ? "is-active" : ""}" style="width:20%" data-exam="ap1">AP1<br>20%</button>
          <button class="fnm-w-ihk-seg fnm-w-seg--proj ${state.exam === "projekt" ? "is-active" : ""}" style="width:50%" data-exam="projekt">AP2 Projekt (40 Std.)<br>50%</button>
          <button class="fnm-w-ihk-seg fnm-w-seg--proz ${state.exam === "prozess" ? "is-active" : ""}" style="width:10%" data-exam="prozess">Prozess<br>10%</button>
          <button class="fnm-w-ihk-seg fnm-w-seg--dat ${state.exam === "daten" ? "is-active" : ""}" style="width:10%" data-exam="daten">Daten<br>10%</button>
          <button class="fnm-w-ihk-seg fnm-w-seg--wiso ${state.exam === "wiso" ? "is-active" : ""}" style="width:10%" data-exam="wiso">WiSo<br>10%</button>
        </div>
        <div style="margin-top:8px;">
          <div><strong>${ed.title}</strong></div>
          <div class="fnm-w-sub" style="margin-bottom:6px;">${ed.summary}</div>
          <ul style="margin:4px 0 8px 18px; padding:0;">
            ${ed.details.map((x) => `<li>${x}</li>`).join("")}
          </ul>
          <div class="fnm-w-pill fnm-w-pill--warn">Korrektur LF 1.01: ${ed.trap}</div>
        </div>
      </div>

      <div style="margin-top:12px;">
        <strong>3 Anti-Verknüpfungsfehler-Karten</strong> <span class="fnm-w-sub">(zum Umdrehen klicken)</span>
        <div class="fnm-w-grid-3" style="margin-top:8px;">
          ${FLIP_PAIRS.map((f, idx) => {
            const back = !!state.flipped[idx];
            return `
              <button class="fnm-w-flip" data-flip="${idx}">
                <div style="display:flex;justify-content:space-between;width:100%;font-weight:700;font-size:0.86em;">
                  <span>${back ? "✅ IHK-Lösung" : f.frontTitle}</span>
                  <span style="color:var(--text-muted);">${back ? "↺" : "Umdrehen"}</span>
                </div>
                <div style="font-size:0.84em;color:${back ? "var(--text-normal)" : "var(--text-muted)"};">
                  ${back ? f.backText : f.frontSub}
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;

    body.querySelectorAll("[data-exam]").forEach((b) => {
      b.addEventListener("click", () => {
        state.exam = b.dataset.exam;
        saveState();
        render();
      });
    });
    body.querySelectorAll("[data-flip]").forEach((b) => {
      b.addEventListener("click", () => {
        const idx = b.dataset.flip;
        state.flipped[idx] = !state.flipped[idx];
        saveState();
        render();
      });
    });
    return;
  }

  if (state.tab === "roles") {
    const cur = ROLES_TASKS.find((t) => t.id === state.roleTask) || ROLES_TASKS[0];
    body.innerHTML = `
      <div class="fnm-w-grid-2">
        <div class="fnm-w-role-list">
          ${ROLES_TASKS.map((t) => `
            <button class="fnm-w-role-btn ${t.id === cur.id ? "is-active" : ""}" data-rtask="${t.id}">${t.task}</button>
          `).join("")}
        </div>
        <div class="fnm-w-panel" style="margin-top:0;">
          <div class="fnm-w-sub">Zuständige IHK-Rolle</div>
          <div style="font-size:1.15em;font-weight:700;color:var(--interactive-accent);margin:4px 0 6px 0;">${cur.role}</div>
          <p style="margin:0 0 10px 0;">${cur.why}</p>
          <div class="fnm-w-pill fnm-w-pill--info">Abgrenzung: ${cur.contrast}</div>
        </div>
      </div>
    `;
    body.querySelectorAll("[data-rtask]").forEach((b) => {
      b.addEventListener("click", () => {
        state.roleTask = b.dataset.rtask;
        saveState();
        render();
      });
    });
    return;
  }

  // Default tab: drill
  body.innerHTML = `
    ${DRILL_ITEMS.map((item, i) => {
      const saved = state.drill[item.id] || {};
      return `
        <div class="fnm-w-drill-card">
          <div class="fnm-w-drill-head">
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
              <span class="fnm-w-pill fnm-w-pill--info">Blockade ${i + 1} · ${item.blockade}</span>
              <span class="fnm-w-pill fnm-w-pill--warn">${item.operator}</span>
            </div>
            <div>${getStatusPill(saved.status)}</div>
          </div>
          <div><strong>${item.question}</strong></div>
          <textarea class="fnm-w-textarea" data-ans="${item.id}" placeholder="Schreibe deine Antwort hier auf Deutsch (aus dem Kopf)...">${escapeHtml(saved.answer)}</textarea>
          <div class="fnm-w-actions">
            <button class="fnm-w-btn" data-hint-btn="${item.id}">Denkanstoß (Stufe 1)</button>
            <button class="fnm-w-btn fnm-w-btn--primary" data-sol-btn="${item.id}">ZPA-Lösung prüfen</button>
          </div>
          <div class="fnm-w-hint" data-hint-box="${item.id}" style="display:none;">
            <strong>Denkanstoß:</strong> ${item.hint}
          </div>
          <div class="fnm-w-sol" data-sol-box="${item.id}" style="display:none;">
            <div style="margin-bottom:8px;"><strong>IHK-Lösung:</strong> ${item.solution}</div>
            <div class="fnm-w-actions">
              <span class="fnm-w-sub">Bewertung (Fenu):</span>
              <button class="fnm-w-btn" data-rate="${item.id}:mastered">✅ Gemeistert</button>
              <button class="fnm-w-btn" data-rate="${item.id}:lesefehler">Lesefehler</button>
              <button class="fnm-w-btn" data-rate="${item.id}:verknuepfung">Verknüpfungsfehler</button>
              <button class="fnm-w-btn" data-rate="${item.id}:luecke">Wissenslücke</button>
            </div>
          </div>
        </div>
      `;
    }).join("")}

    <div class="fnm-w-save-bar">
      <div class="fnm-w-sub">Überträgt deine formulierten Antworten &amp; <code>[x]</code>-Haken direkt in die Tabelle <strong>Blockaden-Log</strong> unten.</div>
      <div class="fnm-w-actions">
        <button class="fnm-w-btn" data-action="reset-drill">Zurücksetzen</button>
        <button class="fnm-w-btn fnm-w-btn--primary" data-action="save-log">💾 Ins Blockaden-Log schreiben</button>
      </div>
    </div>
    <div data-pane="save-msg" class="fnm-w-sub" style="margin-top:6px;"></div>
  `;

  body.querySelectorAll("textarea[data-ans]").forEach((ta) => {
    ta.addEventListener("input", () => {
      const id = ta.dataset.ans;
      if (!state.drill[id]) state.drill[id] = {};
      state.drill[id].answer = ta.value;
      saveState();
    });
  });

  body.querySelectorAll("[data-hint-btn]").forEach((b) => {
    b.addEventListener("click", () => {
      const box = body.querySelector(`[data-hint-box="${b.dataset.hintBtn}"]`);
      if (box) box.style.display = box.style.display === "none" ? "block" : "none";
    });
  });

  body.querySelectorAll("[data-sol-btn]").forEach((b) => {
    b.addEventListener("click", () => {
      const box = body.querySelector(`[data-sol-box="${b.dataset.solBtn}"]`);
      if (box) box.style.display = box.style.display === "none" ? "block" : "none";
    });
  });

  body.querySelectorAll("[data-rate]").forEach((b) => {
    b.addEventListener("click", () => {
      const [id, rate] = b.dataset.rate.split(":");
      if (!state.drill[id]) state.drill[id] = {};
      state.drill[id].status = rate;
      saveState();
      render();
    });
  });

  const resetBtn = body.querySelector('[data-action="reset-drill"]');
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.drill = {};
      saveState();
      render();
    });
  }

  const saveBtn = body.querySelector('[data-action="save-log"]');
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const msg = body.querySelector('[data-pane="save-msg"]');
      try {
        await writeDrillToBlockadenLog();
        if (msg) msg.textContent = "✅ Blockaden-Log erfolgreich direkt in LF01.01_Recall.md gespeichert.";
      } catch (err) {
        if (msg) msg.textContent = "⚠️ Speichern fehlgeschlagen: " + (err?.message || err);
      }
    });
  }
}

render();
