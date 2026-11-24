---
title: "FNM-Lernroutine & Interaktives Coach-Protokoll"
methode: "Phänomenales Lernen (FNM 2.0) + Kein zweites Lesen (Fenu)"
tags:
  - fnm
  - routine
---

# 🗓️ FNM-Lernroutine & Interaktives Coach-Protokoll

> [[../00_Dashboard_SecondBrain_FNM|🏠 Dashboard Second Brain]] · [[00_NotebookLM_Hub|📓 NotebookLM Hub]] · [[../../00_Meta_und_Planung/02_Regole_Lezioni_FNM|📐 FNM-Regeln & Standards]]

Diese Seite legt die **tägliche und wöchentliche Lernroutine** für alle 123 Einheiten von `UMSCHULUNG_FIDPA_FNM` fest – ohne passives Wiederlesen, mit maximaler Behaltensleistung und konsequentem Fokus auf **AP1 (20 %)** und **AP2 – FIDPA (80 %)**.

---

## 🎛️ Interaktives FNM-Routine-Cockpit *(Timer, Live-Tempo-Rechner & 7-Tage-Roadmap)*
```dataviewjs
await dv.view("assets/widgets/fnm_routine_coach");
```

---

## 1. Tägliche FNM-Routine *(Protokoll für eine Lerneinheit)*

Wähle jeden Tag das passende Zeitfenster (**60 Min. Standard** oder **90 Min. Intensiv** für mathematisch-prozedurale Einheiten mit Python-Lab):

| Phase | Zeit (60m) | Zeit (90m) | Konkrete Aktion *(FNM-Regel)* | Verboten ❌ |
| :--- | :---: | :---: | :--- | :--- |
| **1. Blockaden-Chirurgie & SR** | `00–10` | `00–15` | Öffne nur heute fällige Notizen mit Tag `#fnm-review-active` und trainiere **ausschließlich** die offenen Zeilen im `Blockaden-Log` (max. 10 Sek. Blick in die SVG-Pyramide bei Stocken). | Ganze Lektionen erneut lesen oder bereits beherrschten Stoff wiederholen. |
| **2. Schritte 0–4 (Neue Einheit)** | `10–35` | `15–50` | **Schritt 0:** Video-Priming `≤ 10 Min.` *(nur bei Logik/Mathe/SQL/Python)*.<br>**Schritt 1:** Die 3–4 *Leitfragen* aktiv lesen (ohne mitzuschreiben).<br>**Schritt 2:** **Einmaliges** ruhiges Lesen + *Faded Example* + *Kontrast-Matrix*.<br>**Schritt 3–4:** *SVG-Pyramide* einprägen + Verknüpfungen & *DPA-Brille* lesen. | Alles markieren, während des Lesens Notizen herausschreiben (*Working-Memory*-Überlast), zweimal lesen. |
| **3. Schritt 5 (`_Recall.md` ohne Text)** | `35–50` | `50–75` | Lektion schließen!<br>1. **Teil A:** Die 4 Fragen des *Gesprochenen Schemas* frei beantworten (laut oder schriftlich) und mit der `Selbst-Checkliste` abgleichen.<br>2. **Teil B:** **Mindestens 2 IHK-Fragen schriftlich** unter Beachtung der **ZPA-Operatoren** (`NENNEN`, `BESCHREIBEN`, `ERLÄUTERN`, `BERECHNEN`) lösen, danach `Denkanstoß` → `Lösung`.<br>3. `Execute Code` / `Labs/*.py` ausführen, falls vorhanden. | In die Lektion spicken oder `Teil B` leer lassen. |
| **4. Cold-Check & Abschluss** | `50–60` | `75–90` | **Cold-Check auf NotebookLM** im passenden LF-Notebook durchführen. Fehler sofort ins `Blockaden-Log` eintragen (`Lesefehler` / `Verknüpfungsfehler` / `Wissenslücke`), unter `Meine Neu-Formulierung` **aus dem Kopf korrekt formulieren** und Frontmatter aktualisieren. | Sitzung beenden, ohne Fehler zu klassifizieren oder mit `status: offen`. |

> [!tip] Goldene Anti-Überlastungs-Regel (Mathe & Prozedurales)
> Bei **Logik (`LF 1.09a`), Mengen (`LF 1.09b`), Dreisatz (`LF 1.09c`), Zahlensystemen/KiB (`LF 1.10a`) und Subnetting (`LF 3.06`)** immer zuerst das **Video-Priming** (max. 10 Min.) ansehen und danach direkt die passende Python-Datei in `Labs/` bzw. den `Execute Code`-Block in `_Recall.md` ausführen.

---

## 2. Wochenrhythmus *(Mo–So)*

- **Montag – Freitag:** **1 neue Einheit pro Tag** (oder 1 Einheit in 2 Tagen bei dichten Themen wie Python, SQL oder Subnetting) + 10–15 Min. *Blockaden-Chirurgie* zu Beginn.
- **Samstag (Puffer & Praxis):** Offene *Python-Labs* abschließen und fällige `Tag 3` / `Tag 7` Wiederholungen auf NotebookLM durchführen.
- **Sonntag (Interleaving & Vault-Pflege – 30–45 Min.):**
  - **Keine neuen Lektionen:** Mische verschiedene bereits gelernte Aufgabentypen in einer Sitzung (z. B. `De Morgan` + `Mengen` + `Dreisatz`), um die aktive Unterscheidung zu trainieren (*Interleaving*).
  - Prüfe im [[../00_Dashboard_SecondBrain_FNM|Dashboard]] den **Blockaden-Radar** und stufe nur Einheiten auf `gemeistert`, die alle Kriterien erfüllen.

---

## 3. Regel für den Status-Aufstieg (`offen` → `in_arbeit` → `gemeistert`)

| Frontmatter-Status | Wann vergeben? | Spaced-Repetition-Tag | Haken im Dashboard |
| :--- | :--- | :--- | :---: |
| `offen` | Einheit noch nicht begonnen | *(kein `fnm-review-active`, kein `sr-due`)* | `[ ]` |
| `in_arbeit` | Schritte 0–5 bearbeitet, aber noch offene `[ ]` Zeilen im `Blockaden-Log` **oder** `Tag 3` noch nicht kalt bestanden | `- fnm-review-active` + `next_review` / `sr-due` setzen | `[ ]` |
| `gemeistert` | Alle Zeilen im `Blockaden-Log` mit `Meine Neu-Formulierung` ausgefüllt & `[x]`, mindestens 2 Fragen in `Teil B` schriftlich gelöst und **Tag 3** fehlerfrei bestanden | `- fnm-review-active` für `Tag 7` und `Tag 21` beibehalten | `[x]` |

---

## 4. 7-Tage-Schlachtplan Cluster 1 *(ab 24. November 2026)*

1. **Tag 1 (Di, 24.11.) – Abschluss `LF 1.01` + Einstieg `LF 1.09a`:**
   - Die **4 Blockaden** in [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.01_Recall|LF 1.01_Recall]] schließen (AP1 5 Themenbereiche, AP2 `50+10+10+10`, 4 Projektphasen + ~8h Doku, FIDV vs. IT-Systemelektroniker) und für `Tag 3` vorbereiten.
   - **Schritt 0** (Video Daniel Jung) + **Schritte 1–4** von [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09a_Logik_Aussagen_Verknuepfungen_De_Morgan|LF 1.09a (Logik & De Morgan)]].
2. **Tag 2 (Mi, 25.11.) – Recall `LF 1.09a` + Python-Lab:**
   - [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09a_Recall|LF 1.09a_Recall]] komplett lösen (Teil A + Teil B + Python-Bug-Hunt) sowie [[../Labs/Lab_01_09a_Logik_DeMorgan|Lab 01.09a]].
   - Cold-Check in **NotebookLM LF 1**.
3. **Tag 3 (Do, 26.11.) – `LF 1.09b` (Mengenlehre → SQL/Python):**
   - Schritte 0–5 von [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09b_Mengenlehre_Mengenoperationen_SQL_Python|LF 1.09b]] + [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09b_Recall|LF 1.09b_Recall]] + [[../Labs/Lab_01_09b_Mengen_SQL|Lab 01.09b]].
4. **Tag 4 (Fr, 27.11.) – `LF 1.09c` (Dreisatz & Gleichungen) + `Tag 3` von `LF 1.01`:**
   - *10 Min.:* Kalter `Tag 3`-Check für `LF 1.01` → wenn bestanden, auf `gemeistert` setzen und `[x]` im Dashboard abhaken!
   - Schritte 0–5 von [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09c_Alltagsmathematik_Dreisatz_Gleichungen|LF 1.09c]] + [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.09c_Recall|LF 1.09c_Recall]].
5. **Tag 5 (Sa, 28.11.) – `LF 1.10a` (Zahlensysteme, Bits/Bytes, KiB vs. kB):**
   - Schritte 0–5 von [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10a_Zahlensysteme_Bits_Bytes|LF 1.10a]] + [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10a_Recall|LF 1.10a_Recall]] + kurzer `Tag 3`-Check der Blockaden von `LF 1.09a`.
6. **Tag 6 (So, 29.11.) – Interleaving Logik/Mathe & Blockaden:**
   - Gemischte Kaltsitzung: 1× De Morgan + 1× Mengen (`UNION`/`EXCEPT`) + 1× antiproportionaler Dreisatz + 1× `KiB`/`kB`-Umrechnung + Dashboard-Check.
7. **Tag 7 (Mo, 30.11.) – `LF 1.10b` (Stochastik & Statistik):**
   - Schritte 0–5 von [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10b_Grundlagen_Stochastik_Statistik|LF 1.10b]] + [[../AP1/LF01_Das_Unternehmen_und_die_eigene_Rolle_im_Betri/LF01.10b_Recall|LF 1.10b_Recall]] (direkte Brücke zu `LF 10.02` in AP2).

---

## 5. Interaktives Coach-Protokoll *(Schnellkommandos im Chat)*

Für die Zusammenarbeit mit deinem interaktiven KI-Lehrer auf Deutsch kannst du jederzeit diese klaren Kommandos nutzen:
- **`Prüfe LF X.XX`** → kontrolliert deine `_Recall.md`, bewertet `Teil A`, `Teil B` und `Blockaden-Log`, klassifiziert Fehler nach Fenu und fragt gezielt nur Schwachstellen ab.
- **`Frag mich meine Blockaden ab`** → startet einen kalten Micro-Drill ausschließlich zu den offenen Zeilen deines `Blockaden-Log` (ohne erneutes Lesen).
- **`Erkläre mir <Konzept> neu`** → aktiviert die *Adaptive Kalibrierung* (konkrete IT-Analogie + Kontrast + Mini-Übung) und aktualisiert bei Bedarf die Lektion.
- **`IHK-Simulation <Thema>`** → stellt 2 Aufgaben mit echten ZPA-Operatoren (`NENNEN`, `ERLÄUTERN`, `BEGRÜNDEN`, `BERECHNEN`) und vergibt Teilpunkte nach IHK-Schema.
- **`Oral Recall LF X.XX`** *(Skill `fnm-oral-recall` – per Mikrofon oder Text)* → führt dich ohne Antworten zu verraten Schritt für Schritt durch dein `_Recall.md` (Teil A: *Gesprochenes Schema* mit Rückfrage zum Ergänzen + Teil B: alle IHK-Fragen einzeln) und loggt Lücken still ins `Blockaden-Log`.
- **`Live-Debrief`** *(Skill `fnm-live-debrief` – nach dem Live-/Online-Unterricht)* → du erzählst frei auf Deutsch, was der Dozent heute erklärt hat; die Skill gleicht es mit `LF X.XX` ab, markiert fehlende IHK-Punkte im `Blockaden-Log` und nutzt [[Vorlage_Live_Unterricht|Vorlage Live-Unterricht]].
- **`Practice Lab LF X.XX`** *(Skill `fnm-practice-lab` – für technische Einheiten)* → startet einen 3-stufigen Praxis-Drill (Warm-up / Bug-Hunt → Praxis-Transfer → IHK-Szenario) für Python, SQL, Subnetting, Logik oder ML inkl. echter Code-Ausführung.
- **`Fachgespräch simulieren`** *(Skill `ihk-fachgespraech-sim` – per Mikrofon oder Text)* → simuliert das offizielle 30-Minuten-IHK-Fachgespräch (40h-Projekt, Datenqualität, SQL/Python/ML, Prozessanalyse & WiSo) als strenger, fairer IHK-Prüfer inkl. IHK-Punktebewertung (`0–100`).
