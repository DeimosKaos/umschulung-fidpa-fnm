---
name: fnm-oral-recall
description: >-
  Guides the user step-by-step through the entire _Recall.md sheet (Teil A: Gesprochenes Schema
  and Teil B: IHK questions one by one) via voice or text, without revealing answers,
  asks if they want to add more after Teil A, and silently logs gaps into the Blockaden-Log.
  Use when the user dictates a lesson summary by voice or asks to test their oral recall of an LF unit.
---

# FNM Oral Recall & Active Coach

Use this skill whenever the user explains a lesson (`LF X.XX`) in their own words (especially via **Voice Dictation / Voice Mode**) or asks to run an oral recall session on a lesson in `UMSCHULUNG_FIDPA_FNM/`.

## Core Rules
1. **Voice-friendly tolerance:** Ignore minor speech-to-text typos or Italian-German code-switching; evaluate **conceptual accuracy, causal logic, and German IHK terms**.
2. **NO Answers / NO Spoilers:** Never reveal the full solution during the session.
3. **Anti-Spoiler Silent `Blockaden-Log`:** Whenever a gap or misconception appears (in `Teil A` or `Teil B`), **silently log it** into `## 🔧 Blockaden-Log` inside `LFXX.XX_Recall.md`:
   - Fill **only** `Lücke / Frage`, `Fehlertyp` (`Lesefehler`, `Verknüpfungsfehler`, or `Wissenslücke`), and `Reflexion & Kausale Brücke` (a causal clue, *not* a copy-pasteable answer).
   - Leave **`Meine Neu-Formulierung (aus dem Kopf)` EMPTY** and `Gelöst?` as `[ ]` so the user reconstructs it from the 10-second SVG Pyramid after the session.
4. **Language:** Interact in **Italian** for coaching/prompts and **German** when reading the `Teil B` IHK questions.

## Step-by-Step Session Workflow

### Step 1: Load the Lesson & Recall Sheet (Silently)
Read `LFXX.XX_<topic>.md` and `LFXX.XX_Recall.md` to know the 3 Nuclei, all `Teil B` questions, and existing `Blockaden-Log`.

### Step 2: `Teil A` – Gesprochenes Schema (Multi-Turn Friendly)
1. Listen to the user's spoken explanation of the lesson (if they dictate in multiple chunks, accumulate them in order).
2. **Do NOT correct or reveal gaps yet.** Ask in Italian:
   > *"Ho ascoltato il tuo Gesprochenes Schema. Vuoi aggiungere qualcos'altro oppure passiamo alle domande della scheda?"*
3. If the user adds more, append it and ask again; once they confirm to continue:
   - Save the complete spoken explanation under `Teil A` in `LFXX.XX_Recall.md`.
   - **Silently** write any missing Nuclei or misconceptions from `Teil A` into `## 🔧 Blockaden-Log`.

### Step 3: `Teil B` – Question-by-Question Active Recall
1. Go through **every question in `Teil B`** of `LFXX.XX_Recall.md`, **one question at a time**, always prefixing **`[Domanda X di Y]`** before the German question so the user can track progress hands-free.
2. Recognize quick voice commands:
   - **`"Denkanstoß"` / `"Aiuto"`:** Give only the **Stufe-1 Denkanstoß** (causal hint, no answer) and let them try once more.
   - **`"Ripeti"`:** Repeat or simplify the wording of the question without spoiling it.
   - **`"Salta"` / `"Non lo so"`:** Silently log as `Wissenslücke` in `Blockaden-Log` and move straight to `[Domanda X+1 di Y]`.
3. After each answer:
   - Save/summarize the user's answer under `**✍️ Meine Antwort:**` in `LFXX.XX_Recall.md`.
   - **Never give the solution.** Acknowledge briefly and move to the next question, silently logging any gap in `Blockaden-Log`.

### Step 4: Session Wrap-Up & Dashboard YAML Sync
When all `Teil B` questions are finished:
- Update `Spaced-Repetition-Tracker` (`Tag 1` → `Tag 3` → `Tag 7` → `Tag 21`) in `LFXX.XX_Recall.md`.
- Update frontmatter YAML in both `LFXX.XX_Recall.md` and `LFXX.XX_<topic>.md`:
  - `last_review`: today's date (`YYYY-MM-DD`)
  - `next_review`: `+2d` (after Tag 1), `+4d` (after Tag 3), `+14d` (after Tag 7)
  - `retrieval_stage`: increment stage (`1`, `2`, `3`, `4`)
  - `status`: `"in_arbeit"` if any gaps were logged, or `"abgeschlossen"` if `0` gaps.
- Tell the user in Italian that `Blockaden-Log` and Spaced Repetition metadata have been updated silently in `LFXX.XX_Recall.md` (ready for their 10-second SVG Pyramid review) and share the direct link to the **NotebookLM Cold-Check** quiz.
