# AGENTS.md – Onboarding für KI-Assistenten (`UMSCHULUNG_FIDPA_FNM`)

Questo file fornisce a qualsiasi agente AI il contesto completo per operare correttamente in questo workspace fin dal primo turno.

---

## 1. Lingua & Ruolo
- **Comunicazione con l'utente:** sempre in **italiano** (conciso, pratico, con link `file://` cliccabili ai file creati/modificati).
- **Contenuti di studio nel Vault Obsidian (`UMSCHULUNG_FIDPA_FNM/`):** sempre in **tedesco** (standard IHK AP1 & AP2 – *Fachinformatiker für Daten- und Prozessanalyse / FIDPA*), basati su Sascha Kersken (*IT-Handbuch für Fachinformatiker*innen).

---

## 2. Mappa delle Cartelle
- `00_Meta_und_Planung/`
  - `02_Regole_Lezioni_FNM.md` — Standard pedagogico **Metodo Fenomenico (FNM 2.0)** e regole di formattazione.
  - `Piano_Studio_120_SubLF_Kersken.md` — Piano didattico completo (123 Sub-LF su 7 Cluster).
- `UMSCHULUNG_FIDPA_FNM/` *(Obsidian Second Brain Vault)*
  - `00_Dashboard_SecondBrain_FNM.md` — Home Dashboard Obsidian (DataviewJS live). **Non spostare dalla root del vault** (linkata da tutte le 246 note).
  - `00_System_und_Routine/` — Regia operativa:
    - `01_Routine_Studio_FNM.md` — Routine 60/90 min, ritmo settimanale e comandi rapidi.
    - `00_NotebookLM_Hub.md` + `00_NotebookLM_Registry.json` — Registro dei 14 notebook su NotebookLM.
    - `Vorlage_Live_Unterricht.md` — Template FNM in tedesco per la classe virtuale / lezione in presenza.
  - `Live_Unterricht/` — Note snelle delle lezioni dal vivo/online (`YYYY-MM-DD_LFXX.XX_Live.md`).
  - `AP1/` (`LF01`–`LF05`, 53 unità) & `AP2_DPA/` (`LF06`–`LF12c`, 70 unità) — **123/123 lezioni + 123/123 `_Recall.md` complete**.
  - `Labs/` — Esercizi pratici Python/SQL.
  - `assets/` — Diagrammi `Pyramide.svg` (`1100×410`), `covers/*_Cover.svg` (`1200×675`), widget DataviewJS e snippet CSS.
- `.agents/skills/`
  - `fnm-oral-recall` — Ripasso orale guidato passo-passo su `_Recall.md` (Teil A + Rückfrage + Teil B senza svelare risposte, log silente su `Blockaden-Log`).
  - `fnm-live-debrief` — Debriefing vocale/testuale in tedesco post-lezione (classe virtuale/presenza) con mappatura su `LF XX.XX` e log silente delle lacune.
  - `fnm-practice-lab` — Esercizi pratici interattivi step-by-step per unità tecniche (Python, SQL, Java, Subnetting, Logica, ML/NumPy) con esecuzione reale e log silente.
  - `ihk-fachgespraech-sim` — Simulazione interattiva del colloquio IHK AP2 da 30 minuti con voto `0–100`.

---

## 3. Regole Tecniche Non Negoziabili
1. **Zero evidenziazioni `==...==`:** Obsidian usa il plugin **Cloze**, quindi `==testo==` rompe la visualizzazione. Non usarlo mai nelle lezioni o nei `_Recall.md`.
2. **Cover SVG:** Ogni lezione incorpora in alto `![[../../assets/covers/LFXX.XX_Cover.svg]]` (`1200×675` Cyber-Vector).
3. **Domande `⏸️ Denkstopp (10 Sek.)` in Schritt 2:** Sempre **senza risposta visibile** (solo `> [!question]`, mai aggiungere `> [!tip]- Lösung` dentro la lezione).
4. **NotebookLM Sync:** Tutti i 12 Lernfelder (`LF 1`–`LF 12c`) sono già caricati su NotebookLM (solo i file `.md` delle lezioni, mai i `*_Recall.md`) con i rispettivi quiz IHK in tedesco.
5. **Skill vocali:** Se l'utente chiede di ripetere una lezione o simulare l'esame orale (specie via microfono), seguire sempre le istruzioni in `.agents/skills/fnm-oral-recall/SKILL.md` o `.agents/skills/ihk-fachgespraech-sim/SKILL.md`.
