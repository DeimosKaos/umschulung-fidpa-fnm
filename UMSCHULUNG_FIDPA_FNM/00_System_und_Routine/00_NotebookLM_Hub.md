---
title: "NotebookLM Hub & Sync Registry – UMSCHULUNG FIDPA"
methode: "Phänomenales Lernen (FNM 2.0) + NotebookLM Cold-Check"
tags:
  - fnm
  - notebooklm
  - hub
---

# 📓 NotebookLM Hub & Sync Registry

> [[../00_Dashboard_SecondBrain_FNM|🏠 Dashboard Second Brain]] · [[01_Routine_Studio_FNM|🗓️ Routine di Studio]] · [[../../00_Meta_und_Planung/02_Regole_Lezioni_FNM|📐 Regole & Standard FNM]]

Questo hub è la **Single Source of Truth** del collegamento tra il Second Brain (`UMSCHULUNG_FIDPA_FNM`) e i **14 notebook su NotebookLM**, alimentato live da `00_System_und_Routine/00_NotebookLM_Registry.json` e dai metadati YAML (`nlm_id`, `nlm_url`) presenti in ogni nota.

---

## 📊 Stato Sincronizzazione Live *(DataviewJS)*

```dataviewjs
const raw = await dv.io.load("00_System_und_Routine/00_NotebookLM_Registry.json");
const registry = JSON.parse(raw);
const notebooks = registry.notebooks || [];

const lessons = dv.pages('#fnm').where(p => p.sub_lf && p.type !== "recall" && p.type !== "lab");
const recalls = dv.pages('#fnm-recall');
const allTracked = dv.pages('#fnm OR #fnm-recall OR #fnm-lab').where(p => p.lf);

const recallBySub = {};
for (const r of recalls) {
  if (r.sub_lf) recallBySub[r.sub_lf] = r;
}

const isDone = (s) => ["abgeschlossen", "fertig", "done", "gemeistert", "erledigt"].includes(String(s || "").toLowerCase());

const vaultByLf = {};
for (const p of lessons) {
  const lfKey = String(p.lf || "").trim();
  if (!lfKey) continue;
  if (!vaultByLf[lfKey]) vaultByLf[lfKey] = { total: 0, ready: 0, mastered: 0 };
  vaultByLf[lfKey].total++;
  const isReady = (p.file && p.file.size > 2500) || (p.file && p.file.path.startsWith("AP1/"));
  if (isReady) vaultByLf[lfKey].ready++;
  const r = recallBySub[p.sub_lf];
  if (isDone(p.status) || (r && isDone(r.status))) vaultByLf[lfKey].mastered++;
}

const lfNotebooks = notebooks.filter(n => n.area === "AP1" || n.area === "AP2");
const metaNotebooks = notebooks.filter(n => n.area === "META");
const syncedCount = lfNotebooks.filter(n => n.sync_status === "synced").length;
const pdfOnlyCount = lfNotebooks.filter(n => n.sync_status === "pdf_only").length;

const missingNlm = [];
for (const p of allTracked) {
  if (!p.nlm_id || !p.nlm_url) missingNlm.push(p);
}

const container = dv.container;
const cards = container.createDiv();
cards.innerHTML = `
<div class="fnm-dashboard-grid">
  <div class="fnm-card">
    <h3><span>📓 Notebook Totali</span><span class="fnm-badge fnm-badge--done">${notebooks.length}</span></h3>
    <div class="fnm-stats"><span>12 Lernfelder (AP1 + AP2)</span><span>2 Meta (FNM + Priming)</span></div>
  </div>
  <div class="fnm-card">
    <h3><span>✅ LF Sincronizzati</span><span class="fnm-badge fnm-badge--done">${syncedCount} / ${lfNotebooks.length}</span></h3>
    <div class="fnm-progress-container">
      <div class="fnm-progress-bar fnm-progress-bar--ap1" style="width: ${Math.round((syncedCount / lfNotebooks.length) * 100)}%;"></div>
    </div>
    <div class="fnm-stats"><span>AP1 completo (LF 1–5)</span><span>AP2 completo (LF 6–12c)</span></div>
  </div>
  <div class="fnm-card">
    <h3><span>📚 AP2 PDF-Only</span><span class="fnm-badge fnm-badge--done">${pdfOnlyCount} / ${lfNotebooks.length}</span></h3>
    <div class="fnm-stats"><span>123 / 123 lezioni sync</span><span>Tutti i Quiz IHK avviati</span></div>
  </div>
  <div class="fnm-card">
    <h3><span>🔗 Integrità YAML Vault</span><span class="fnm-badge ${missingNlm.length === 0 ? "fnm-badge--done" : "fnm-badge--due"}">${missingNlm.length === 0 ? "100% OK" : missingNlm.length + " mancanti"}</span></h3>
    <div class="fnm-stats"><span>Note controllate: ${allTracked.length}</span><span>Campi: nlm_id + nlm_url</span></div>
  </div>
</div>
`;

const statusBadge = (st) => {
  if (st === "synced") return '<span class="fnm-badge fnm-badge--done">✅ Synced</span>';
  if (st === "pdf_only") return '<span class="fnm-badge fnm-badge--open">📄 PDF-Only</span>';
  return '<span class="fnm-badge fnm-badge--progress">✨ Curated</span>';
};

dv.header(3, "📘 AP1 & 📙 AP2 – Lernfeld Notebooks (LF 1–12c)");
const lfRows = lfNotebooks.map(n => {
  const v = vaultByLf[n.key] || { total: 0, ready: 0, mastered: 0 };
  const clustersStr = (n.clusters || []).map(c => `C${c}`).join(", ") || "—";
  const link = `<a href="${n.url}">${n.title}</a>`;
  const sourcesStr = `${n.pdf_count} PDF · ${n.md_synced_count}/${n.md_expected_count} MD`;
  const vaultStr = `${v.ready}/${v.total} pronte (${v.mastered} ✅)`;
  return [n.key, n.area, clustersStr, link, sourcesStr, vaultStr, statusBadge(n.sync_status)];
});
dv.table(["LF", "Area", "Cluster", "NotebookLM", "Fonti NLM", "Vault Obsidian", "Stato Sync"], lfRows);

dv.header(3, "🧠 Meta & Priming Notebooks");
const metaRows = metaNotebooks.map(n => [
  n.key,
  `<a href="${n.url}">${n.title}</a>`,
  n.role,
  `${n.source_count} fonti`,
  statusBadge(n.sync_status)
]);
dv.table(["Chiave", "NotebookLM", "Ruolo nel Metodo", "Fonti", "Stato"], metaRows);

if (missingNlm.length > 0) {
  dv.header(3, "⚠️ Note senza metadati NotebookLM");
  dv.table(["File", "LF"], missingNlm.map(p => [p.file.link, p.lf]));
}
```

---

## 🔗 Mappa Rapida Static-Fallback *(Tutti i 14 Notebook)*

| Chiave | Area | Cluster | NotebookLM (Link Diretto) | Stato Sync |
| :--- | :---: | :---: | :--- | :---: |
| **LF 1** | AP1 | C1, C2, C3 | [LF 1 Das Unternehmen und die eigene Rolle im Betrieb beschreiben](https://notebooklm.google.com/notebook/174709d0-b98b-430b-b015-437582224f3f) | ✅ Synced (4 PDF + 13 MD) |
| **LF 2** | AP1 | C1, C3 | [LF 2 Arbeitsplätze nach Kundenwunsch ausstatten](https://notebooklm.google.com/notebook/898481eb-a0a4-4cc8-b72d-db814c4af6e8) | ✅ Synced (4 PDF + 10 MD) |
| **LF 3** | AP1 | C1 | [LF 3 Clients in Netzwerke einbinden](https://notebooklm.google.com/notebook/1ff0b183-2dc9-434c-ac5d-9e218d1e9f66) | ✅ Synced (1 PDF + 10 MD) |
| **LF 4** | AP1 | C1 | [LF 4 Schutzbedarfsanalyse im eigenen Arbeitsbereich durchführen](https://notebooklm.google.com/notebook/d4be8de7-3274-4ae9-b1ef-82bb22858eb9) | ✅ Synced (1 PDF + 10 MD) |
| **LF 5** | AP1 | C2 | [LF 5 Software zur Verwaltung von Daten anpassen](https://notebooklm.google.com/notebook/3159e806-f394-4c4e-81b3-d548d963ec2d) | ✅ Synced (5 PDF + 10 MD) |
| **LF 6** | AP2 | C4 | [LF 6 Serviceanfragen bearbeiten](https://notebooklm.google.com/notebook/5b594004-8af9-426e-b55d-9bf97e6dea9d) | ✅ Synced (3 PDF + 10 MD) |
| **LF 7** | AP2 | C4 | [LF 7 Cyber-physische Systeme ergänzen](https://notebooklm.google.com/notebook/d0238e85-f2d7-41c3-bbb8-25874012c69e) | ✅ Synced (4 PDF + 10 MD) |
| **LF 8** | AP2 | C5 | [LF 8 Daten systemübergreifend bereitstellen](https://notebooklm.google.com/notebook/f2c0873c-106d-41f6-a945-213349adfe1c) | ✅ Synced (7 PDF + 10 MD) |
| **LF 9** | AP2 | C4 | [LF 9 Netzwerke und Dienste bereitstellen](https://notebooklm.google.com/notebook/efb8b98f-0dab-4440-baa2-aed13419a301) | ✅ Synced (5 PDF + 10 MD) |
| **LF 10c** | AP2 | C6 | [LF 10c Werkzeuge des maschinellen Lernens einsetzen (DPA)](https://notebooklm.google.com/notebook/9feb15fa-3af3-4e9d-9fd3-242a1b01c233) | ✅ Synced (4 PDF + 10 MD) |
| **LF 11c** | AP2 | C7 | [LF 11c Prozesse analysieren und gestalten (DPA)](https://notebooklm.google.com/notebook/8953c3c0-57d0-449e-b763-0b4a94b37dd5) | ✅ Synced (2 PDF + 10 MD) |
| **LF 12c** | AP2 | C7 | [LF 12c Kundenspezifische Prozess- und Datenanalyse durchführen (DPA)](https://notebooklm.google.com/notebook/5f9483fc-3eed-4941-9c3c-b948585290ab) | ✅ Synced (5 PDF + 10 MD) |
| **FNM** | META | — | [FNM (Metodo Giovanni Fenu / MemoVia)](https://notebooklm.google.com/notebook/a8516885-4bed-4fd1-ae01-a2cfa050012d) | ✨ Curated (10 fonti) |
| **AUDIO_PRIMING** | META | C1 | [Audio-Priming FNM (FIDPA)](https://notebooklm.google.com/notebook/3cccd48f-24cd-4c36-a10b-4d60306fc545) | ✨ Curated (6 fonti) |

---

## 🛠️ Protocollo di Sincronizzazione *(Quando si completano nuove unità AP2)*

1. Quando vengono scritte le 10 lezioni `.md` di un nuovo Lernfeld (`LF 7`–`LF 12c`), caricare **solo i file `LF*.md`** nel relativo notebook (mai i file `*_Recall.md`).
2. Aggiornare i tag del notebook su NotebookLM (`pdf-only` → `fnm-synced,cold-check`).
3. Aggiornare `00_NotebookLM_Registry.json` (`sync_status`, `md_synced_count`, `source_count`, `tags`) e creare i rispettivi file `*_Recall.md` con `nlm_id` e `nlm_url`.
