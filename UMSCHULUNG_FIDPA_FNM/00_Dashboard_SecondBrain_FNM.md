---
title: "Phänomenales Second Brain – UMSCHULUNG FIDPA"
methode: "Phänomenales Lernen (FNM)"
---

# 🧠 Phänomenales Second Brain – Dashboard

> [[00_System_und_Routine/01_Routine_Studio_FNM|🗓️ Lernroutine & Coach-Protokoll]] · [[00_System_und_Routine/Vorlage_Live_Unterricht|🎧 Vorlage Live-Unterricht]] · [[00_System_und_Routine/00_NotebookLM_Hub|📓 NotebookLM Hub (14 Notebooks)]] · [[../00_Meta_und_Planung/02_Regole_Lezioni_FNM|📐 FNM-Regeln]] · [[../00_Meta_und_Planung/Piano_Studio_120_SubLF_Kersken|🗺️ Studienplan]]

> [!TIP] FNM 2.0-Workflow in 5 Schritten pro Sub-LF
> 1. **Schritt 0 & 1 (F – Phänomenologie):** Optionales Priming-Video, dann **4 Leitfragen** aktiv erfassen.
> 2. **Schritt 2 (Einmaliges Lesen):** Text einmalig konzentriert lesen inkl. **Worked/Faded Examples** und **Kontrast-Matrix**.
> 3. **Schritt 3 (N – Nuklei):** Visuelle Verdichtung in der **SVG-Pyramide**.
> 4. **Schritt 4 (M – Bewegung):** Vernetzung über `[[Links]]` + **DPA-Brille** (Transfer auf AP2 & 40h-Projekt).
> 5. **Schritt 5 (Active Recall 2.0):** Im separaten `_Recall.md`: *Gesprochenes Schema* + *Selbst-Checkliste* → *IHK-Operatoren-Training* → *Execute-Code / Parsons* → *NotebookLM Cold-Check* → *Blockaden-Log*.

![[assets/00_Mappa_Cluster_Globale.svg]]

---

## 📊 Interaktives FNM-Cockpit *(DataviewJS)*

```dataviewjs
const lessons = dv.pages('#fnm').where(p => p.sub_lf && p.type !== "recall" && p.type !== "lab");
const recalls = dv.pages('#fnm-recall');
const recallBySub = {};
for (const r of recalls) {
  if (r.sub_lf) recallBySub[r.sub_lf] = r;
}

const isDone = (s) => ["abgeschlossen", "fertig", "done", "gemeistert", "erledigt"].includes(String(s || "").toLowerCase());
const isInProgress = (s) => ["in_arbeit", "aktiv", "lernen"].includes(String(s || "").toLowerCase());

function getEffectiveStatus(p) {
  const r = recallBySub[p.sub_lf];
  const sLesson = p.status;
  const sRecall = r ? r.status : null;
  if (isDone(sLesson) || isDone(sRecall)) return "done";
  if (isInProgress(sLesson) || isInProgress(sRecall)) return "progress";
  return "open";
}

const totalCount = lessons.length;
let doneCount = 0;
let progressCount = 0;
let readyFullCount = 0;
let ap1Total = 0, ap1Done = 0, ap1Prog = 0;
let ap2Total = 0, ap2Done = 0, ap2Prog = 0;

const clusterOrder = [
  "Cluster 1 (AP1): Fundament, Logik, Hardware, OS & Netze",
  "Cluster 2 (AP1): Geschäftsprozesse, Daten, Python, Algorithmen & SQL",
  "Cluster 3 (AP1): Betrieb, Wirtschaft, Recht & Kundenanforderungen",
  "Cluster 4 (AP2): IT-Service, Infrastruktur, Server & CPS/IoT",
  "Cluster 5 (AP2): Systemübergreifende Datenbereitstellung, Java, APIs & Web",
  "Cluster 6 (AP2 – DPA): Machine Learning, KI & Datenanalyse",
  "Cluster 7 (AP2 – DPA): Prozessoptimierung, Kundenprojekt & IHK-Abschluss"
];

const clusterStats = {};
for (const c of clusterOrder) {
  clusterStats[c] = { total: 0, done: 0, progress: 0, ready: 0 };
}

for (const p of lessons) {
  const st = getEffectiveStatus(p);
  const isReady = (p.file && p.file.size > 2500) || (p.file && p.file.path.startsWith("AP1/"));
  const isAP1 = p.file && p.file.path.startsWith("AP1/");

  if (st === "done") doneCount++;
  else if (st === "progress") progressCount++;
  if (isReady) readyFullCount++;

  if (isAP1) {
    ap1Total++;
    if (st === "done") ap1Done++;
    else if (st === "progress") ap1Prog++;
  } else {
    ap2Total++;
    if (st === "done") ap2Done++;
    else if (st === "progress") ap2Prog++;
  }

  const cName = p.cluster;
  if (cName) {
    if (!clusterStats[cName]) clusterStats[cName] = { total: 0, done: 0, progress: 0, ready: 0 };
    clusterStats[cName].total++;
    if (st === "done") clusterStats[cName].done++;
    else if (st === "progress") clusterStats[cName].progress++;
    if (isReady) clusterStats[cName].ready++;
  }
}

const pct = (n, d) => d > 0 ? Math.round((n / d) * 100) : 0;

const container = dv.container;
const wrapper = container.createDiv();
wrapper.innerHTML = `
<div class="fnm-dashboard-grid">
  <div class="fnm-card">
    <h3><span>🎯 Gesamt-Fortschritt</span><span class="fnm-badge fnm-badge--progress">${pct(doneCount, totalCount)}%</span></h3>
    <div class="fnm-progress-container">
      <div class="fnm-progress-bar" style="width: ${pct(doneCount, totalCount)}%;"></div>
    </div>
    <div class="fnm-stats">
      <span>✅ ${doneCount} / ${totalCount} gemeistert</span>
      <span>🟡 ${progressCount} aktiv · 📚 ${readyFullCount} bereit</span>
    </div>
  </div>
  <div class="fnm-card">
    <h3><span>📘 Teil 1: AP1 (20 %)</span><span class="fnm-badge fnm-badge--done">${pct(ap1Done, ap1Total)}%</span></h3>
    <div class="fnm-progress-container">
      <div class="fnm-progress-bar fnm-progress-bar--ap1" style="width: ${pct(ap1Done, ap1Total)}%;"></div>
    </div>
    <div class="fnm-stats">
      <span>✅ ${ap1Done} / ${ap1Total} gemeistert</span>
      <span>🟡 ${ap1Prog} in Arbeit</span>
    </div>
  </div>
  <div class="fnm-card">
    <h3><span>📙 Teil 2: AP2 – FIDPA (80 %)</span><span class="fnm-badge fnm-badge--open">${pct(ap2Done, ap2Total)}%</span></h3>
    <div class="fnm-progress-container">
      <div class="fnm-progress-bar fnm-progress-bar--ap2" style="width: ${pct(ap2Done, ap2Total)}%;"></div>
    </div>
    <div class="fnm-stats">
      <span>✅ ${ap2Done} / ${ap2Total} gemeistert</span>
      <span>🟡 ${ap2Prog} in Arbeit</span>
    </div>
  </div>
</div>
`;

// Cluster-Bars
const clusterHtml = ['<div class="fnm-cluster-list">'];
for (const cName of Object.keys(clusterStats)) {
  const st = clusterStats[cName];
  if (st.total === 0) continue;
  const pDone = pct(st.done, st.total);
  const barClass = cName.includes("AP1") ? "fnm-progress-bar--ap1" : "fnm-progress-bar--ap2";
  clusterHtml.push(`
    <div class="fnm-cluster-row">
      <div class="fnm-cluster-header">
        <span>${cName}</span>
        <span class="fnm-stats">${st.done}/${st.total} (${pDone}%) · 🟡 ${st.progress} · 📚 ${st.ready} voll</span>
      </div>
      <div class="fnm-progress-container" style="height: 8px; margin: 4px 0 0 0;">
        <div class="fnm-progress-bar ${barClass}" style="width: ${pDone}%;"></div>
      </div>
    </div>
  `);
}
clusterHtml.push('</div>');
const clusterBox = container.createDiv();
clusterBox.innerHTML = clusterHtml.join("");
```

### 📅 Heute fällig & Aktiver Fokus (`Spaced Repetition`)
```dataviewjs
const today = moment().startOf('day');
const pages = dv.pages('#fnm OR #fnm-recall').where(p => p.sub_lf);
const rows = [];

for (const p of pages) {
  const dueDateStr = p.next_review || p["sr-due"];
  const dueMoment = dueDateStr ? moment(String(dueDateStr), "YYYY-MM-DD") : null;
  const isDue = dueMoment && dueMoment.isValid() && dueMoment.isSameOrBefore(today);
  const isActive = p.status && p.status !== "offen";

  if (isDue || isActive) {
    let badge = '<span class="fnm-badge fnm-badge--open">Offen</span>';
    if (isDue) badge = '<span class="fnm-badge fnm-badge--due">🚨 Heute fällig</span>';
    else if (["abgeschlossen", "fertig", "done", "gemeistert"].includes(String(p.status).toLowerCase())) {
      badge = '<span class="fnm-badge fnm-badge--done">✅ Gemeistert</span>';
    } else if (isActive) {
      badge = '<span class="fnm-badge fnm-badge--progress">🟡 In Arbeit</span>';
    }
    rows.push({
      sortKey: (isDue ? 0 : 1) * 1000 + (p.step || 999),
      data: [
        p.sub_lf,
        p.file.link,
        p.type === "recall" ? "🎙️ Recall" : "📖 Lektion",
        badge,
        p.retrieval_stage ?? 0,
        dueDateStr || "—"
      ]
    });
  }
}

rows.sort((a, b) => a.sortKey - b.sortKey);
if (rows.length === 0) {
  dv.paragraph("*Noch keine fälligen Wiederholungen — starte mit **LF 1.09a**!*");
} else {
  dv.table(["Sub-LF", "Notiz", "Typ", "Status", "Stufe", "Fällig am"], rows.map(r => r.data));
}
```

### 🔧 Aktiver Blockaden-Radar *(Giovanni Fenu – Nur Schwachstellen trainieren)*
```dataviewjs
const allPages = dv.pages('#fnm OR #fnm-recall').where(p => p.blockaden && p.blockaden.length > 0);
const seen = new Set();
const radarRows = [];

for (const p of allPages) {
  const key = `${p.sub_lf}-${p.type || "lesson"}`;
  if (seen.has(key)) continue;
  seen.add(key);
  const listStr = Array.isArray(p.blockaden) ? p.blockaden.map(b => `• ${b}`).join("<br>") : String(p.blockaden);
  radarRows.push([
    p.sub_lf || p.file.name,
    p.file.link,
    listStr
  ]);
}

if (radarRows.length === 0) {
  dv.paragraph("✅ *Aktuell keine offenen Blockaden im Frontmatter eingetragen.*");
} else {
  dv.table(["Sub-LF", "Datei", "Offene Blockaden (direkt gezielt wiederholen!)"], radarRows);
}
```

---

# 🗺️ Optimaler Lernpfad nach Clustern (Alle 123 Einheiten)

## Cluster 1 (AP1): Fundament, Logik, Hardware, OS & Netze *(35 Einheiten)*

1. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.01_Fachrichtungen_der_Informatik_IT_Ausbildung|LF 1.01: Fachrichtungen der Informatik & IT-Ausbildung]]
2. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09a_Logik_Aussagen_Verknuepfungen_De_Morgan|LF 1.09a: Einführung in die Logik (Aussagen, Operatoren & De Morgan)]]
3. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09b_Mengenlehre_Mengenoperationen_SQL_Python|LF 1.09b: Mengenlehre & Mengenoperationen (Basis für SQL & Python)]]
4. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09c_Alltagsmathematik_Dreisatz_Gleichungen|LF 1.09c: Alltagsmathematik: Dreisatz, Gleichungen & Gleichungssysteme]]
5. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10a_Zahlensysteme_Bits_Bytes|LF 1.10a: Zahlensysteme, Bits & Bytes (kB vs. KiB & Zweierkomplement)]]
6. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10b_Grundlagen_Stochastik_Statistik|LF 1.10b: Grundlagen Stochastik & Statistik]]
7. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.01_Elektronische_Grundlagen_Schaltungen|LF 2.01: Elektronische Grundlagen & Schaltungen]]
8. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.02_Algorithmen_Turingmaschine_Virtueller_Prozessor|LF 2.02: Algorithmen, Turingmaschine & Virtueller Prozessor]]
9. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.03_CPU_Architektur_Arbeitsspeicher_RAM|LF 2.03: CPU-Architektur & Arbeitsspeicher (RAM)]]
10. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.04_BIOS_UEFI_Bus_Anschlusssysteme_PCIe_USB_NVMe|LF 2.04: BIOS/UEFI & Bus-/Anschlusssysteme (PCIe, USB, NVMe)]]
11. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.05_Massenspeicher_Peripheriegeraete_Ein_Ausgabe_Sound|LF 2.05: Massenspeicher & Peripheriegeräte (Ein-/Ausgabe, Sound)]]
12. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.06_Betriebssysteme_Aufbau_Prozess_Speicherverwaltung|LF 2.06: Betriebssysteme: Aufbau, Prozess-, Speicherverwaltung & Dateisysteme]]
13. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.07_Windows_Clientsysteme_Einsatz_CMD_PowerShell|LF 2.07: Windows-Clientsysteme: Einsatz, CMD & PowerShell]]
14. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.08_Linux_Systeme_Shell_Systembefehle_Automatisierung|LF 2.08: Linux-Systeme: Shell, Systembefehle & Automatisierung]]
15. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.09_Virtualisierung_VirtualBox_Container_Docker_Cloud|LF 2.09: Virtualisierung (VirtualBox), Container (Docker) & Cloud]]
16. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.01_Netzwerke_Einfuehrung_Historie|LF 3.01: Netzwerke: Einführung & Historie]]
17. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.02_Funktionsebenen_OSI_Referenzmodell_TCP_IP_Schichte|LF 3.02: Funktionsebenen: OSI-Referenzmodell & TCP/IP-Schichten]]
18. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.03_Klassifizierung_Reichweite_Topologien_Zentralisier|LF 3.03: Klassifizierung: Reichweite, Topologien & Zentralisierung]]
19. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.04_Netzwerkkarten_Kabel_Ethernet_Standards|LF 3.04: Netzwerkkarten, Kabel & Ethernet-Standards]]
20. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.05_Drahtlose_Netze_WLAN_Datenfernuebertragung_DSL_Mob|LF 3.05: Drahtlose Netze (WLAN) & Datenfernübertragung (DSL, Mobilfunk)]]
21. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.06_TCP_IP_Netzzugang_IPv4_Adressierung_Subnetting|LF 3.06: TCP/IP-Netzzugang & IPv4-Adressierung / Subnetting]]
22. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.07_IPv6_Adressierung_Routing|LF 3.07: IPv6-Adressierung & Routing]]
23. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.08_Transportprotokolle_TCP_vs_UDP|LF 3.08: Transportprotokolle (TCP vs. UDP)]]
24. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.09_DNS_Internetanwendungsprotokolle_HTTP_SMTP_SSH_DHC|LF 3.09: DNS & Internetanwendungsprotokolle (HTTP, SMTP, SSH, DHCP)]]
25. [ ] [[AP1/LF03_Clients_in_Netzwerke_einbinden/LF03.10_Netzwerke_pruefen_konfigurieren_Stromversorgung_E|LF 3.10: Netzwerke prüfen/konfigurieren & Stromversorgung/E-Technik]]
26. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.01_Grundlagen_Informationssicherheit_Schutzziele_CIA|LF 4.01: Grundlagen Informationssicherheit & Schutzziele (CIA)]]
27. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.02_Datenschutz_Grundlagen_DSGVO_BDSG|LF 4.02: Datenschutz-Grundlagen: DSGVO & BDSG]]
28. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.03_BSI_IT_Grundschutz_ISO_IEC_27001|LF 4.03: BSI IT-Grundschutz & ISO/IEC 27001]]
29. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.04_Malware_Teil_1_Viren_Wuermer_Trojaner_Backdoors|LF 4.04: Malware Teil 1: Viren, Würmer, Trojaner & Backdoors]]
30. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.05_Malware_Teil_2_Ransomware_Spyware_Social_Engineeri|LF 4.05: Malware Teil 2: Ransomware, Spyware, Social Engineering]]
31. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.06_Netzwerk_Servergefahren_DoS_Sniffing_Spoofing|LF 4.06: Netzwerk- & Servergefahren (DoS, Sniffing, Spoofing)]]
32. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.07_Schutzbedarfs_Risikoanalyse_durchfuehren|LF 4.07: Schutzbedarfs- & Risikoanalyse durchführen]]
33. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.08_Technische_Gegenmassnahmen_Firewalls_IDS_IPS_Recht|LF 4.08: Technische Gegenmaßnahmen (Firewalls, IDS/IPS, Rechte)]]
34. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.09_Kryptografie_Grundlagen_Symmetrisch_Asymmetrisch_H|LF 4.09: Kryptografie-Grundlagen (Symmetrisch, Asymmetrisch, Hash, PKI)]]
35. [ ] [[AP1/LF04_Schutzbedarfsanalyse_im_eigenen_Arbeitsbereic/LF04.10_Backup_Strategien_Notfallmanagement_Richtlinien|LF 4.10: Backup-Strategien, Notfallmanagement & Richtlinien]]

## Cluster 2 (AP1): Geschäftsprozesse, Daten, Python, Algorithmen & SQL *(11 Einheiten)*

36. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.08_Geschaeftsprozesse_Prozessmanagement_BPMN_2_0|LF 1.08: Geschäftsprozesse, Prozessmanagement & BPMN 2.0]]
37. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.01_Datenverwaltung_Zeichensaetze_UTF_8_Textformate_CS|LF 5.01: Datenverwaltung, Zeichensätze (UTF-8) & Textformate (CSV, JSON)]]
38. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.02_Software_Entwicklungszyklus_Vorgehensmodelle_Agil|LF 5.02: Software-Entwicklungszyklus, Vorgehensmodelle (Agil/Scrum) & UML]]
39. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.03_Python_Teil_1_IDE_Syntax_Variablen_Datentypen_Kont|LF 5.03: Python Teil 1: IDE, Syntax, Variablen, Datentypen & Kontrollstrukturen]]
40. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.04_Python_Teil_2_Funktionen_Module_Exceptions_Dateizu|LF 5.04: Python Teil 2: Funktionen, Module, Exceptions & Dateizugriff]]
41. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.05_Python_Teil_3_Objektorientierung_Standardbibliothe|LF 5.05: Python Teil 3: Objektorientierung & Standardbibliothek]]
42. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.06_Algorithmen_Planung_Sortieren_Bubble_Quicksort_Suc|LF 5.06: Algorithmen: Planung, Sortieren (Bubble/Quicksort) & Suchen]]
43. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.07_Datenstrukturen_Baeume_Graphen|LF 5.07: Datenstrukturen: Bäume & Graphen]]
44. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.08_Datenbanktypen_ER_Modellierung_Normalisierung|LF 5.08: Datenbanktypen, ER-Modellierung & Normalisierung]]
45. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.09_MySQL_SQL_DDL_SELECT_DML_Transaktionen_Backups|LF 5.09: MySQL & SQL (DDL, SELECT, DML, Transaktionen, Backups)]]
46. [ ] [[AP1/LF05_Software_zur_Verwaltung_von_Daten_anpassen/LF05.10_Testgetriebene_Entwicklung_TDD_Unit_Tests_Dokument|LF 5.10: Testgetriebene Entwicklung (TDD), Unit-Tests & Dokumentation]]

## Cluster 3 (AP1): Betrieb, Wirtschaft, Recht & Kundenanforderungen *(7 Einheiten)*

47. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.02_Geschichte_der_Rechenmaschinen_Computer|LF 1.02: Geschichte der Rechenmaschinen & Computer]]
48. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.03_Programmiersprachen_Digitale_Informationsspeicheru|LF 1.03: Programmiersprachen & Digitale Informationsspeicherung (Bild, Audio, Text)]]
49. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.04_VWL_Grundlagen_Wirtschaftskreislauf_Marktformen|LF 1.04: VWL-Grundlagen, Wirtschaftskreislauf & Marktformen]]
50. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.05_Arbeitsrecht_KSchG_BetrVG_Tarifrecht_Sozialversich|LF 1.05: Arbeitsrecht (KSchG, BetrVG, Tarifrecht) & Sozialversicherung]]
51. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.06_Marktforschung_Marketing_4P_AIDA_Strategische_Anal|LF 1.06: Marktforschung, Marketing (4P, AIDA) & Strategische Analyse (PESTEL/SWOT/BCG)]]
52. [ ] [[AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.07_Aufbau_Ablauforganisation_Fuehrung_Vollmachten_Pro|LF 1.07: Aufbau-/Ablauforganisation, Führung & Vollmachten (Prokura, HGB)]]
53. [ ] [[AP1/LF02_Arbeitsplaetze_nach_Kundenwunsch_ausstatten/LF02.10_Bedarfsanalyse_Kunden_Projektmanagement_Kalkulatio|LF 2.10: Bedarfsanalyse, Kunden-/Projektmanagement & Kalkulation]]

## Cluster 4 (AP2): IT-Service, Infrastruktur, Server & CPS/IoT *(30 Einheiten)*

54. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.01_ITSM_ITIL_Grundlagen|LF 6.01: ITSM & ITIL-Grundlagen]]
55. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.02_Service_Level_Agreements_SLA_OLAs_Servicekatalog|LF 6.02: Service-Level-Agreements (SLA), OLAs & Servicekatalog]]
56. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.03_Ticketsysteme_Incident_Management|LF 6.03: Ticketsysteme & Incident Management]]
57. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.04_Problem_Change_Configuration_Management_CMDB|LF 6.04: Problem-, Change- & Configuration Management (CMDB)]]
58. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.05_Windows_Diagnose_Troubleshooting_CMD_PowerShell|LF 6.05: Windows-Diagnose & Troubleshooting (CMD / PowerShell)]]
59. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.06_Linux_Diagnose_Systembefehle_Shell|LF 6.06: Linux-Diagnose & Systembefehle (Shell)]]
60. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.07_Bearbeitungsprozesse_Dokumentation_Knowledge_Base|LF 6.07: Bearbeitungsprozesse & Dokumentation (Knowledge Base)]]
61. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.08_Kundenkommunikation_Gespraechsfuehrung_Deeskalatio|LF 6.08: Kundenkommunikation, Gesprächsführung & Deeskalation]]
62. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.09_Kundenberatung_Anforderungsaufnahme|LF 6.09: Kundenberatung & Anforderungsaufnahme]]
63. [ ] [[AP2_DPA/LF06_Serviceanfragen_bearbeiten/LF06.10_Kundenschulung_Fachenglisch_fuer_IT_Support|LF 6.10: Kundenschulung & Fachenglisch für IT-Support]]
64. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.01_Kundenanforderungen_Topologien_LAN_Konzepte|LF 9.01: Kundenanforderungen, Topologien & LAN-Konzepte]]
65. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.02_Switching_VLANs_Ethernet_Routing|LF 9.02: Switching, VLANs, Ethernet & Routing]]
66. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.03_Server_Hardware_Massenspeicher_RAID_NAS_SAN|LF 9.03: Server-Hardware, Massenspeicher (RAID, NAS, SAN)]]
67. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.04_DNS_Server_BIND_Verzeichnisdienste_OpenLDAP_AD|LF 9.04: DNS-Server (BIND) & Verzeichnisdienste (OpenLDAP / AD)]]
68. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.05_HTTP_Protokoll_Meta_Server_inetd_xinetd|LF 9.05: HTTP-Protokoll & Meta-Server (`inetd` / `xinetd`)]]
69. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.06_Webserver_Apache_PHP_Serverkonfiguration|LF 9.06: Webserver Apache & PHP-Serverkonfiguration]]
70. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.07_WAN_DSL_Mobilfunk_VPN_Anbindungen|LF 9.07: WAN, DSL/Mobilfunk & VPN-Anbindungen]]
71. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.08_Virtualisierung_Hypervisor_VirtualBox|LF 9.08: Virtualisierung (Hypervisor, VirtualBox)]]
72. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.09_Container_Docker_Cloud_Computing|LF 9.09: Container (Docker) & Cloud Computing]]
73. [ ] [[AP2_DPA/LF09_Netzwerke_und_Dienste_bereitstellen/LF09.10_Netzwerksicherheit_Kryptografie_Replikation_Hochve|LF 9.10: Netzwerksicherheit, Kryptografie & Replikation/Hochverfügbarkeit]]
74. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.01_Grundlagen_CPS_IoT_Automatentheorie|LF 7.01: Grundlagen CPS, IoT & Automatentheorie]]
75. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.02_Sensorik_Aktorik_Elektronische_Schaltungen|LF 7.02: Sensorik, Aktorik & Elektronische Schaltungen]]
76. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.03_Mikrocontroller_Virtueller_Prozessor_Echtzeitsyste|LF 7.03: Mikrocontroller, Virtueller Prozessor & Echtzeitsysteme]]
77. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.04_Hardware_Schnittstellen_Bussysteme_I2C_SPI_UART_CA|LF 7.04: Hardware-Schnittstellen & Bussysteme (I2C, SPI, UART, CAN)]]
78. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.05_Drahtlose_CPS_Vernetzung_WLAN_Bluetooth_Zigbee_Mob|LF 7.05: Drahtlose CPS-Vernetzung (WLAN, Bluetooth, Zigbee, Mobilfunk)]]
79. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.06_IoT_CPS_Kommunikationsprotokolle_MQTT_CoAP_HTTP|LF 7.06: IoT-/CPS-Kommunikationsprotokolle (MQTT, CoAP, HTTP)]]
80. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.07_Systemnahe_Programmierung_Prozesse_Pipes_Threads|LF 7.07: Systemnahe Programmierung: Prozesse, Pipes & Threads]]
81. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.08_Netzwerkprogrammierung_mit_der_Berkeley_Socket_API|LF 7.08: Netzwerkprogrammierung mit der Berkeley Socket API]]
82. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.09_Edge_Computing_Datenformate_Cloud_Anbindung|LF 7.09: Edge Computing, Datenformate & Cloud-Anbindung]]
83. [ ] [[AP2_DPA/LF07_Cyber_physische_Systeme_ergaenzen/LF07.10_CPS_OT_Sicherheit_Wartung_im_Betrieb|LF 7.10: CPS-/OT-Sicherheit & Wartung im Betrieb]]

## Cluster 5 (AP2): Systemübergreifende Datenbereitstellung, Java, APIs & Web *(10 Einheiten)*

84. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.01_SW_Projektmanagement_Entwurfsmuster_Design_Pattern|LF 8.01: SW-Projektmanagement, Entwurfsmuster (Design Patterns) & UML]]
85. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.02_Java_Teil_1_Grundlagen_Syntax_Merkmale|LF 8.02: Java Teil 1: Grundlagen, Syntax & Merkmale]]
86. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.03_Java_Teil_2_OOP_Weitere_Elemente_Maven|LF 8.03: Java Teil 2: OOP, Weitere Elemente & Maven]]
87. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.04_Regulaere_Ausdruecke_Regex_Datenparsing|LF 8.04: Reguläre Ausdrücke (Regex) & Datenparsing]]
88. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.05_XML_DTD_XML_Schema_XSLT_xml_etree|LF 8.05: XML, DTD, XML Schema, XSLT & `xml.etree`]]
89. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.06_Web_Grundlagen_HTML_XHTML_CSS|LF 8.06: Web-Grundlagen: HTML/XHTML & CSS]]
90. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.07_Serverseitige_Datenbereitstellung_mit_PHP_MySQL|LF 8.07: Serverseitige Datenbereitstellung mit PHP & MySQL]]
91. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.08_REST_APIs_entwerfen_implementieren_testen|LF 8.08: REST-APIs entwerfen, implementieren & testen]]
92. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.09_JavaScript_DOM_Ajax_XML_JSON_React_js|LF 8.09: JavaScript, DOM & Ajax (XML/JSON) + React.js]]
93. [ ] [[AP2_DPA/LF08_Daten_systemuebergreifend_bereitstellen/LF08.10_Datenbankprogrammierung_NoSQL_CouchDB_Tests|LF 8.10: Datenbankprogrammierung, NoSQL (CouchDB) & Tests]]

## Cluster 6 (AP2 – DPA): Machine Learning, KI & Datenanalyse *(10 Einheiten)*

94. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.01_Einfuehrung_in_KI_Machine_Learning|LF 10.01: Einführung in KI & Machine Learning]]
95. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.02_Stochastik_Statistik_fuer_ML|LF 10.02: Stochastik & Statistik für ML]]
96. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.03_Lineare_Algebra_Vektoren_Matrizen_Analysis_Ableitu|LF 10.03: Lineare Algebra (Vektoren, Matrizen) & Analysis (Ableitungen)]]
97. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.04_Externe_Python_Module_NumPy|LF 10.04: Externe Python-Module & NumPy]]
98. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.05_Datenauswahl_Aufbereitung_von_Text_und_Bilddaten|LF 10.05: Datenauswahl & Aufbereitung von Text- und Bilddaten]]
99. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.06_Numerische_Daten_visualisieren_EDA|LF 10.06: Numerische Daten visualisieren (EDA)]]
100. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.07_Regelbasierte_Verfahren_Baeume_Bedingungserfuellun|LF 10.07: Regelbasierte Verfahren, Bäume & Bedingungserfüllung (CSP)]]
101. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.08_Lineare_Logistische_Regression|LF 10.08: Lineare & Logistische Regression]]
102. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.09_Unueberwachtes_Lernen_K_Means_Clustering|LF 10.09: Unüberwachtes Lernen: K-Means-Clustering]]
103. [ ] [[AP2_DPA/LF10c_Werkzeuge_des_maschinellen_Lernens_einsetzen/LF10.10_Kuenstliche_Neuronale_Netze_Modellbewertung|LF 10.10: Künstliche Neuronale Netze & Modellbewertung]]

## Cluster 7 (AP2 – DPA): Prozessoptimierung, Kundenprojekt & IHK-Abschluss *(20 Einheiten)*

104. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.01_Historie_Grundlagen_digitaler_Geschaeftsprozesse|LF 11.01: Historie & Grundlagen digitaler Geschäftsprozesse]]
105. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.02_Aufgabenbereiche_im_Prozessmanagement_Ist_Aufnahme|LF 11.02: Aufgabenbereiche im Prozessmanagement & Ist-Aufnahme]]
106. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.03_BPMN_2_0_Elemente_Notation_im_Ueberblick|LF 11.03: BPMN 2.0: Elemente & Notation im Überblick]]
107. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.04_BPMN_2_0_in_der_Praxis_Diagramm_Beispiele|LF 11.04: BPMN 2.0 in der Praxis: Diagramm-Beispiele]]
108. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.05_Ergaenzende_Prozessmodellierung_mit_UML|LF 11.05: Ergänzende Prozessmodellierung mit UML]]
109. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.06_KPIs_Process_Mining_Datenvisualisierung|LF 11.06: KPIs, Process Mining & Datenvisualisierung]]
110. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.07_Prozessautomatisierung_mit_Python_APIs|LF 11.07: Prozessautomatisierung mit Python & APIs]]
111. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.08_Werkzeuge_fuer_Prozessmodellierung_Kollaboration|LF 11.08: Werkzeuge für Prozessmodellierung & Kollaboration]]
112. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.09_Entwicklungsverfahren_Agil_Wasserfall_fuer_Prozess|LF 11.09: Entwicklungsverfahren (Agil/Wasserfall) für Prozessprojekte]]
113. [ ] [[AP2_DPA/LF11c_Digitale_Geschaeftsprozesse_mit_Daten_vorantr/LF11.10_Prozessdokumentation_Compliance_Qualitaetsmanageme|LF 11.10: Prozessdokumentation, Compliance & Qualitätsmanagement]]
114. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.01_Projektmanagement_Entwicklungszyklus|LF 12.01: Projektmanagement & Entwicklungszyklus]]
115. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.02_Auftragsklaerung_Planung_Anforderungsanalyse|LF 12.02: Auftragsklärung, Planung & Anforderungsanalyse]]
116. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.03_Datenquellen_Datenbanktypen_Dateiformate_CSV_JSON|LF 12.03: Datenquellen, Datenbanktypen & Dateiformate (CSV, JSON, XML)]]
117. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.04_Datenbereinigung_Transformation_Text_Bild_NumPy|LF 12.04: Datenbereinigung & Transformation (Text/Bild/NumPy)]]
118. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.05_SQL_Auswertungen_Datenbankprogrammierung|LF 12.05: SQL-Auswertungen & Datenbankprogrammierung]]
119. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.06_Explorative_statistische_Datenanalyse_Visualisieru|LF 12.06: Explorative & statistische Datenanalyse + Visualisierung]]
120. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.07_ML_Modelle_Prozessoptimierung_BPMN_2_0|LF 12.07: ML-Modelle & Prozessoptimierung (BPMN 2.0)]]
121. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.08_Qualitaetssicherung_Validierung_Unit_Tests|LF 12.08: Qualitätssicherung, Validierung & Unit-Tests]]
122. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.09_Wirtschaftlichkeit_Projektdokumentation|LF 12.09: Wirtschaftlichkeit & Projektdokumentation]]
123. [ ] [[AP2_DPA/LF12c_Kundenspezifische_Datenanalyse_und_Prozessopt/LF12.10_Abschlusspraesentation_Fachgespraech_IHK_Vorbereit|LF 12.10: Abschlusspräsentation, Fachgespräch & IHK-Vorbereitung]]
