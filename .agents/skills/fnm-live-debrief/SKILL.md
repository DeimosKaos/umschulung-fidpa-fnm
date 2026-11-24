---
name: fnm-live-debrief
description: Führt nach einem Live- oder Online-Unterricht ein kurzes FNM-Debriefing auf Deutsch durch (via Mikrofon oder Text), gleicht die Zusammenfassung mit den passenden LF-Lektionen im Vault ab, identifiziert fehlende IHK-Kernpunkte und trägt Lücken still ins Blockaden-Log ein. Nutze diesen Skill, wenn der Nutzer erzählt, was heute im Unterricht oder in der virtuellen Klasse besprochen wurde.
---

# FNM Live-Debrief Skill *(Unterrichts-Nachbereitung in Deutsch)*

Dieser Skill überträgt das **Phänomenale Lernen (FNM 2.0)** auf den **Live- / Online-Unterricht** (virtuelle Klasse / Präsenzunterricht). Das gesamte Coaching, alle Rückfragen und alle Einträge im Vault erfolgen **strikt auf Deutsch** (Standard IHK FIDPA).

---

## Wann aktivieren?
Immer dann, wenn der Nutzer (per Mikrofon oder Text) beschreibt, was heute im Unterricht erklärt wurde – z. B.:
- *„Oggi a lezione abbiamo fatto…“* / *„Heute im Unterricht hatten wir…“*
- *„Live-Debrief“*, *„Unterrichts-Check“*, *„Cosa mi è sfuggito dalla lezione di oggi?“*

*(Hinweis: Wenn der Nutzer in der Chat-Anfrage Italienisch spricht, gibst du die Coaching-Antworten und die IHK-Rückfragen auf **Deutsch**, außer er bittet ausdrücklich um eine kurze Erklärung auf Italienisch.)*

---

## Verbindlicher Ablauf *(Schritt für Schritt)*

### Schritt 1: Freie Zusammenfassung anhören & Rückfrage stellen
1. Lass den Nutzer seine freie Erklärung (*„Innere Notizen“*) vollständig vortragen, ohne ihn zu unterbrechen oder sofort zu korrigieren.
2. Frage kurz nach, ob er noch etwas ergänzen möchte, bevor ihr den IHK-Abgleich startet:
   > **„Danke! Möchtest du zu den heutigen Inhalten noch etwas ergänzen, oder sollen wir jetzt den Abgleich mit deinem Second Brain & den IHK-Anforderungen starten?“**
3. Erst wenn der Nutzer bestätigt (oder direkt weitermacht), gehst du zu Schritt 2.

### Schritt 2: Passende `LF XX.XX` im Vault lokalisieren
1. Suche in `UMSCHULUNG_FIDPA_FNM/AP1/` und `UMSCHULUNG_FIDPA_FNM/AP2_DPA/` nach der/den passenden Sub-LF-Lektion(en) zum Thema des heutigen Unterrichts.
2. Lies die **Spitze**, die **3 Nuklei** und den **IHK-Prüfungstipp** der passenden Lektion(en) (niemals den gesamten Fließtext unaufgefordert wiedergeben).

### Schritt 3: FNM-Abgleich *(Was sitzt vs. was fehlt?)*
Gib dem Nutzer auf Deutsch ein kompaktes, motivierendes Feedback in maximal 3 Blöcken:
1. **✅ Sicher erfasst:** Was im Unterricht bereits sauber verstanden wurde *(kurze Stichpunkte)*.
2. **🎯 IHK-Abgleich *(Was im Unterricht evtl. fehlte oder unklar blieb)*:** 1–3 entscheidende IHK-Punkte / Begriffe aus der passenden `[[LFXX.XX]]`, die der Nutzer nicht erwähnt hat – **ohne** sofort die komplette Musterlösung vorzulesen!
3. **🔗 Verknüpfung im Second Brain:** Nenne die passende Lektion und das zugehörige `_Recall.md`.

### Schritt 4: Stilles Logging & Live-Notiz *(ohne Antworten zu spoilern)*
1. **Optionale Tagesnotiz anlegen:** Falls gewünscht oder passend, erstelle in `UMSCHULUNG_FIDPA_FNM/Live_Unterricht/YYYY-MM-DD_LFXX.XX_Live.md` eine schlanke Live-Notiz nach `00_System_und_Routine/Vorlage_Live_Unterricht.md` mit den vom Nutzer genannten Nuklei (auf Deutsch, **ohne `==...==`**).
2. **Stilles Blockaden-Log:** Trage jede echte Wissenslücke oder Unklarheit aus dem Unterricht still in das **Blockaden-Log** der passenden `LFXX.XX_Recall.md` ein:
   - `Lücke / Frage`: Konkrete IHK-Frage oder Lücke auf Deutsch.
   - `Fehlertyp`: `Wissenslücke` oder `Verknüpfungsfehler`.
   - `Reflexion & Kausale Brücke`: Kurzer kausaler Hinweis (*Warum?*, ohne Spoiler!).
   - `Meine Neu-Formulierung`: **Immer leer lassen**, damit der Nutzer sie später aktiv aus dem Kopf ergänzt!
   - `Gelöst?`: `[ ]`
3. **YAML-Frontmatter:** Falls neue Blockaden eingetragen wurden, ergänze das `blockaden`-Array im YAML-Frontmatter der `_Recall.md` und setze `status: "in_arbeit"`, falls `status` noch `"offen"` war.

### Schritt 5: 1–2 gezielte Rückfragen *(Active Recall)*
Stelle zum Abschluss **genau 1 Frage** (maximal 2 nacheinander) zu einem der fehlenden IHK-Punkte, damit der Nutzer das Wissen sofort aktiv abruft, statt nur zuzuhören.

---

## Verbote ❌
- Niemals `==...==` (Markdown-Highlight) in Obsidian-Dateien verwenden (bricht das Cloze-Plugin).
- Niemals die komplette Lektion vorlesen oder „zweites Lesen“ empfehlen.
- Keine italienischen Notizen in `UMSCHULUNG_FIDPA_FNM/` schreiben – alles im Vault ist **100 % Deutsch**.
