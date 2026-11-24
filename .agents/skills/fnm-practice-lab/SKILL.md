---
name: fnm-practice-lab
description: Führt interaktive Praxis-Übungen für technische Einheiten (Python, SQL, Java, Subnetting, Logik/De Morgan, Binär/KiB, Regex, NumPy/ML, BPMN/ERD, IHK-Berechnungen) auf Deutsch Schritt für Schritt durch, führt Code/SQL real aus, gibt kausale Hints ohne Spoiler und loggt Lücken still ins Blockaden-Log. Nutze diesen Skill, wenn der Nutzer eine technische Lektion praktisch üben oder einen Lab-Drill starten möchte.
---

# FNM Practice Lab Skill *(Interaktives Technik- & Code-Training auf Deutsch)*

Dieser Skill trainiert gezielt die **praktische Umsetzung** technischer, mathematischer und programmierbezogener Lerneinheiten (`LF X.XX`) nach dem **Phänomenalen Lernen (FNM)** – ohne passives Nachlesen und ohne vorzeitiges Verraten der Lösung.

---

## Wann aktivieren?
Immer dann, wenn der Nutzer eine technische Einheit praktisch üben möchte, z. B.:
- *„Übung zu LF X.XX“*, *„Practice Lab LF 5.09“*, *„Fammi fare esercizi su SQL / Subnetting / Python / NumPy / De Morgan“*
- Oder wenn er ein vorhandenes Lab aus `UMSCHULUNG_FIDPA_FNM/Labs/` durcharbeiten möchte.

*(Sprache der Aufgaben, Code-Kommentare, IHK-Feedback und Vault-Einträge: **immer Deutsch**; falls der Nutzer auf Italienisch fragt oder um eine Erklärung bittet, kannst du kurz auf Italienisch antworten oder direkt auf Deutsch weitertrainieren, je nach Wunsch.)*

---

## Verbindlicher Ablauf *(Schritt für Schritt)*

### Schritt 1: Einheit prüfen & Lab-Basis laden
1. Prüfe, ob für die gewünschte `LF X.XX` bereits eine Datei in `UMSCHULUNG_FIDPA_FNM/Labs/` existiert (`Lab_XX_XX_*.md` / `*.py`).
2. Lies die dazugehörige Lektion (`UMSCHULUNG_FIDPA_FNM/AP1/...` oder `AP2_DPA/...`), um exakt die Themen, Formeln und IHK-Fallen der Einheit zu treffen.

### Schritt 2: 3-stufigen Praxis-Drill vorbereiten *(Stelle immer nur 1 Aufgabe gleichzeitig!)*
Präsentiere dem Nutzer **genau Aufgabe 1** und warte auf seine Lösung:
- **Stufe 1 – Warm-up / Bug-Hunt *(3–5 Min.)*:** Kurzer Einstieg (z. B. fehlerhaften Code/SQL korrigieren, Faded Example vervollständigen oder 1 schnelle Umrechnung/Wahrheitstafel).
- **Stufe 2 – Praxis-Transfer *(10–15 Min.)*:** Eigenständiges Schreiben einer Funktion, SQL-Abfrage (`JOIN`, `GROUP BY`, `HAVING`), CIDR-Aufteilung, Regex, NumPy/Sklearn-Pipeline oder ERD/BPMN-Logik.
- **Stufe 3 – IHK-Prüfungsaufgabe *(10–15 Min.)*:** Realistisches IHK-Szenario mit typischem Edge Case oder Prüfungsfalle *(z. B. `NULL`-Handling, `KiB` vs. `kB`, `Data Leakage`, `Broadcast`/`Netz-ID`)*.

### Schritt 3: Echte Ausführung & Bewertung *(Kein Spoiler!)*
1. **Bei Code / SQL:** Wenn der Nutzer Python-Code oder eine SQL-Abfrage liefert, führe sie nach Möglichkeit **real im Terminal** aus (z. B. mit `python3` oder `sqlite3` auf Testdaten) und zeige das echte Ergebnis!
2. **Wenn die Lösung stimmt:** Kurz bestätigen, 1 präzisen IHK-Profi-Hinweis geben (z. B. Lesbarkeit, Edge Case oder Zeitkomplexität) und zur nächsten Stufe weitergehen.
3. **Wenn ein Fehler auftritt:**
   - **Versuch 1:** Verrate **nicht** die Lösung! Gib nur **1 kausalen Denkanstoß** (*„Schau dir Zeile 3 an: Was passiert hier bei `NULL`-Werten / beim letzten Oktett?“*) und lass den Nutzer korrigieren.
   - **Versuch 2 (falls weiterhin blockiert):** Erkläre klar das zugrunde liegende Prinzip + die korrekte Lösung und gehe zum stillen Logging über.

### Schritt 4: Stilles Blockaden-Log & optionales Lab-Archiv
1. **Stilles Blockaden-Log:** Bei echten Wissens- oder Verknüpfungsfehlern trage die Lücke still in das `Blockaden-Log` der passenden `LFXX.XX_Recall.md` ein:
   - `Lücke / Frage`: Konkreter Fehlerpunkt auf Deutsch.
   - `Fehlertyp`: `Lesefehler`, `Verknüpfungsfehler` oder `Wissenslücke`.
   - `Reflexion & Kausale Brücke`: Kurzer Warum-Hinweis.
   - `Meine Neu-Formulierung`: **Immer leer lassen!**
   - `Gelöst?`: `[ ]`
2. **YAML-Update:** Aktualisiere im Frontmatter der `_Recall.md` bei neuen Einträgen `blockaden` und setze `status: "in_arbeit"` (falls `offen`).
3. **Lab speichern *(optional)*:** Wenn die Einheit sehr übungsintensiv war und noch kein Lab in `UMSCHULUNG_FIDPA_FNM/Labs/` existiert, frage am Ende kurz, ob du das Übungsset als `Lab_XX_XX_<Thema>.md` (ohne `==...==`) für spätere Wiederholungen dort speichern sollst.

---

## Verbote ❌
- Niemals alle 3 Aufgaben auf einmal posten oder die Musterlösung vorab anzeigen.
- Niemals `==...==` in Obsidian-Dateien verwenden (Cloze-Konflikt).
- Keine ungetesteten Code-Behauptungen – wenn du Code bewertest oder ausführst, prüfe das reale Ergebnis.
