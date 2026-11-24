---
title: "Regole & Standard per le Lezioni FNM (Second Brain FIDPA)"
methode: "Phänomenales Lernen (FNM) + IHK-Fokus"
---

# 📐 Regole & Standard delle Lezioni (`UMSCHULUNG_FIDPA_FNM`)

Questo documento raccoglie tutte le regole metodologiche, stilistiche e grafiche definite insieme sul prototipo **LF 1.01** da applicare a ogni futura lezione del Vault.

---

## 1. Lingua e Fedeltà ai Contenuti
- **Tutto in tedesco:** titoli, testo di lettura, diagrammi SVG, domande, collegamenti, routine di studio (`01_Routine_Studio_FNM.md`), potenziatore interattivo e dialoghi/interrogazioni in chat con l'insegnante interattivo devono essere in **tedesco** (lingua di Kersken e dell'esame IHK). L'italiano si usa solo su richiesta esplicita in caso di blocchi profondi.
- **100 % fedele a Kersken:** nessuna invenzione; tutte le definizioni, i numeri e i concetti devono corrispondere al testo originale.
- **Filtro IHK (taglio del superfluo):** eliminare le parti palesemente fuori programma IHK (es. *Studiengänge*, percorsi scolastici statali o dettagli non richiesti per **FIDPA**).
- **Stile discorsivo fenomenico:** evitare elenchi freddi da imparare a pappagallo; riscrivere i concetti in **prosa chiara orientata al problema reale e al "perché" logico**, così da favorire la comprensione immediata alla prima lettura.

---

## 2. Struttura Obbligatoria della Pagina (Ordine Cronologico FNM)
Ogni nota deve seguire esattamente questi **5 passi dall'alto verso il basso** (senza anticipare le soluzioni prima del testo):

1. **Schritt 1: F – Phänomenologie *(Vor dem Lesen: Fokus einstellen)***
   - **4 Leitfragen mirate IHK** da leggere *prima* del testo per accendere il radar attentivo (*Prequestion Effect*).
   - **Regola pratica:** non memorizzare le domande a sforzo e **non** trascrivere risposte durante la lettura (evita il sovraccarico della *Working Memory*).
2. **Schritt 2: Einmaliges Lesen *(IHK-relevanter Text, phänomenologisch aufbereitet)***
   - Testo continuo, scorrevole e denso di senso, da leggere **una sola volta** senza interrompere il flusso.
3. **Schritt 3: N – Nuklei & Pyramidenschema® *(Nach dem Lesen verdichten)***
   - **Solo SVG** (nessun elenco puntato duplicato sotto l'immagine!).
   - File salvato in `UMSCHULUNG_FIDPA_FNM/assets/<SUB_LF>_Pyramide.svg` e incorporato con `![[../../assets/<SUB_LF>_Pyramide.svg]]`.
4. **Schritt 4: M – Bewegung *(Wissensnetz & Verknüpfungen)***
   - Link diretti Obsidian `[[...]]` verso **prerequisiti** (indietro), **sviluppi futuri** (avanti) e **Praxisbezug (IHK / DPA)**.
5. **Schritt 5: Gesprochenes Schema & Active Recall *(File separato `<SUB_LF>_Recall.md`!)***
   - Salvato **a parte** in `<SUB_LF>_Recall.md` nella stessa cartella e linkato a fine lezione, così si chiude la nota principale e non c'è rischio di sbirciare (*no spoiler*).
   - **Parte A (obbligatoria):** *Gesprochenes Schema* — spiegazione libera a testo chiuso guidata dalle **4 domande universali scrivibili** (*1. Problema pratico / Spitze · 2. Base / Nukleus 1 · 3. Meccanismo o sequenza di passi / Nukleus 2 · 4. Applicazione IT o trappola IHK / Nukleus 3*).
   - **Parte B (verifica mirata):** 1–4 domande IHK con blocco chiuso `> [!tip]- Lösung anzeigen` subito sotto ogni domanda (così in Obsidian la soluzione resta nascosta finché non ci clicchi per controllare!).
   - **Tracker Spaced Repetition:** `Tag 1 [ ] · Tag 3 [ ] · Tag 7 [ ] · Tag 21 [ ]`.

---

## 3. Standard Grafico per gli SVG (`Pyramidenschema®`)
- **Canvas ampio:** almeno `viewBox="0 0 1100 410"` (sfondo scuro ad alto contrasto `#0f172a`, leggibile in Obsidian).
- **Dimensioni delle bolle:**
  - *Spitze:* larghezza ~`820 px`, centrata.
  - *Nuklei (3 colonne):* larghezza ~`330 px` ciascuna.
- **Anti-overflow obbligatorio:** spezzare sempre le righe lunghe (`max ~35–38 caratteri` nei Nuklei, `~60` nella Spitze) in modo che restino almeno **45 px di margine laterale** e **14+ px di margine verticale** dentro ogni rettangolo.

---

## 4. Ordine di Studio (Logica a Cluster)
- Non seguire i 12 LF in modo rigidamente lineare.
- Seguire la sequenza a **7 Cluster** definita in [[UMSCHULUNG_FIDPA_FNM/00_Dashboard_SecondBrain_FNM|00_Dashboard_SecondBrain_FNM.md]] (prima `AP1`, poi `AP2 – FIDPA`) per massimizzare il **Movimento (M)** e rispettare i prerequisiti tecnici.

---

## 5. Protocollo di Passaggio tra una Lezione e la Successiva *(Movimento attivo)*
Per evitare che le lezioni restino blocchi isolati, ogni transizione segue 2 agganci fissi:
1. **Ponte in uscita (`Schritt 4` della lezione corrente):** contiene sempre il link diretto **Nächster Schritt im Cluster** con 1 frase che spiega *perché* la lezione successiva nasce da questa.
2. **Ancora d'ingresso (`Schritt 1` della lezione successiva):** si apre richiamando in 1 riga il concetto-ponte della lezione appena conclusa, così il nuovo Nucleo si aggancia subito alla rete esistente.

---

## 6. Calibrazione Adattiva & Diagnosi dei Blocchi
Quando una lezione o un passaggio non risulta chiaro, **non si rilegge passivamente**:
1. **Diagnosi della causa radice:** si individua *perché* il concetto non è passato (es. salto di prerequisito, astrazione eccessiva senza esempio IT, tedesco troppo denso, o sovraccarico di concetti).
2. **Sblocco mirato:** spiegazione alternativa con analogia concreta o micro-esempio (in italiano o tedesco semplice).
3. **Aggiornamento della nota & del profilo:** la lezione viene riscritta nel punto critico (incluso l'SVG se necessario) e il pattern appreso viene annotato qui sotto per calibrare automaticamente tutte le lezioni future.

### Profilo di apprendimento osservato *(si aggiorna lezione dopo lezione)*
- **Punti di forza (`LF 1.01`):** ottima comprensione fenomenologica del *perché* (evoluzione della DV e necessità dei 4 rami dell'informatica) e buona fluenza espositiva libera in tedesco in `Teil A` senza tradurre meccanicamente.
- **Pattern critici osservati (3 da correggere subito):**
  1. **`Verknüpfungsfehler` su etichette e pesi numerici simili:** tendenza ad accorpare o scambiare termini contigui (*20 % Datensicherung* invece di *10 % Prozessanalyse + 10 % Datenqualität*; *duales Studium* invece di *duale Ausbildung*; *Ausbilder* invece di *Prüfling/Azubi*; *FIDV* vs. *IT-Systemelektroniker*).
  2. **Salto della verifica scritta in `Teil B` e di `Meine Neu-Formulierung`:** in `LF 1.01_Recall.md` `Teil A` era completo ma `Teil B` (domande IHK con Operatori ZPA) e la colonna `Meine Neu-Formulierung` nel `Blockaden-Log` erano rimaste vuote, impedendo il consolidamento delle 4 lacune.
  3. **Precisione terminologica IHK in tedesco:** i concetti vengono capiti a senso, ma all'esame ZPA servono le parole-ancora esatte (*Datenqualität*, *Prozessanalyse*, *Ergonomie*, *Betriebsorganisation*, *Planung → Durchführung → Test → Abnahme*).
- **Contromisure attive:** tag Spaced Repetition isolato su `#fnm-review-active` (solo unità già studiate); micro-drill scritti mirati *esclusivamente* sulle voci del `Blockaden-Log` (Zero Seconda Lettura); risposta scritta obbligatoria ad almeno 2 domande di `Teil B` con Operatore ZPA esplicito prima di chiudere la sessione.

---

## 7. Adattamento per Materie Matematiche / Procedurali *(Logica, Calcoli, Subnetting, Codice, SQL)*
Per le materie procedurali non basta la sola lettura + spiegazione verbale:
1. **Schritt 0 = Video-Priming (≤ 10 min, tedesco) invece di Audio-Only:** per evitare il sovraccarico verbale su simboli ed equazioni (*Dual Coding*), usare un video breve su YouTube con lavagna passo-passo (es. *Daniel Jung*, *Simpleclub*, *Lehrerschmidt*).
2. **Un solo argomento per lezione, ritmo lento ed esteso:** non accorpare temi matematici diversi in un’unica nota; spiegare ogni simbolo e ogni passaggio intermedio in modo calmo ed esplicito senza dare nulla per scontato.
3. **Worked Examples in `Schritt 2`:** inserire sempre più **esempi svolti passo-passo** (così il cervello costruisce lo schema della procedura a basso carico cognitivo, senza procedere per tentativi casuali).
4. **Esercizi realistici IHK AP1/AP2 in `_Recall.md`:** oltre al *Gesprochenes Schema*, includere **2–3 esercizi situazionali di livello reale IHK** (mai banali, ma **sempre risolvibili al 100 % con i soli concetti già spiegati in `Schritt 2`** o nelle lezioni precedenti — senza introdurre unità o formule di lezioni future!).
5. **Interleaving nei ripassi (`Tag 3 / 7`):** mescolare problemi di tipo diverso nella stessa sessione (es. Dreisatz proporzionale vs. antiproportionale) per allenare la discriminazione attiva.

---

## 8. Protocollo FNM di Verifica & Riflessione sugli Errori *(Giovanni Fenu – Zero Seconda Lettura)*
Quando durante `Schritt 5` (`_Recall.md`) si verifica un errore o un'esitazione, **è vietato rileggere l'intera lezione (`Schritt 2`)** ed **è vietato rifare da capo ciò che si sa già**. Si applicano le 4 regole esatte di Giovanni Fenu:
1. **Immediatezza & Nessuna rilettura:** feedback subito dopo la risposta (prima tramite **`> [!hint]- Denkanstoß`** socratico o micro-sguardo di 10 sec. alla Piramide SVG, poi controllo della soluzione).
2. **Classificazione diagnostica dell'errore nel `Blockaden-Log`** in una delle **3 categorie di Fenu**:
   - **`Lesefehler` (Errore di lettura):** sapevi la risposta, ma hai saltato una negazione/parola chiave (*„nicht“*, *„außer“*). → *Azione:* nessuna rilettura; rallenta sulla domanda e cerchia mentalmente le parole che ribaltano il senso.
   - **`Verknüpfungsfehler` (Errore di collegamento):** conoscevi i concetti ma li hai confusi tra loro. → *Azione:* confronto chirurgico **solo tra i due concetti confusi** (*cosa li accomuna e cosa li distingue?*).
   - **`Wissenslücke` (Errore di lacuna):** il concetto o dato non era stato compreso/fissato. → *Azione:* recupero mirato sul **solo punto mancante** + riformulazione attiva da zero.
3. **Solo sui punti deboli & Intervalli variabili:** al ripasso successivo si ritestano **esclusivamente le righe del `Blockaden-Log`** (poche risorse cognitive, massimo impatto); i punti già padroneggiati si allungano negli intervalli di Spaced Repetition.
4. **Cold-Check interattivo su NotebookLM:** ogni `_Recall.md` include il link diretto al rispettivo notebook su **NotebookLM** (`LF 1`, `LF 2`, `LF 3`, `LF 4`, `LF 5`, …), dove si svolge il **Quiz interattivo a freddo** generato sulle nostre lezioni `.md`. Ogni risposta sbagliata o incerta viene poi classificata nel `Blockaden-Log` in Obsidian (`Lesefehler` / `Verknüpfungsfehler` / `Wissenslücke`).

---

## 9. Standard FNM 2.0 *(Content Quality, Active Recall 2.0 & Interactive UI)*

Per massimizzare il punteggio reale nelle prove scritte e pratiche IHK (ZPA Nord-West) e sfruttare appieno Obsidian (`DataviewJS`, `Execute Code`, Custom CSS Snippet `fnm-learning-ui.css`), ogni nuova lezione e le unità chiave seguono questi standard aggiuntivi:

### A. Qualità dei Contenuti (2.0)
1. **Faded Worked Examples (`> [!faded]-`):** al termine di `Schritt 2` nelle materie procedurali/tecniche (Logica, Calcoli, Subnetting, Python, SQL, ML, BPMN), inserire un esempio impostato al ~70 % in cui l'ultimo passaggio critico resta nascosto in un callout chiudibile, così da fare da ponte cognitivo verso gli esercizi autonomi.
2. **Kontrast-Matrix (`> [!falle]`):** tabella comparativa a 3 colonne (*`Wann A?` · `Wann B?` · `Typische IHK-Falle`*) per disambiguare subito i concetti gemelli ed evitare *Verknüpfungsfehler* all'esame.
3. **DPA-Brille (`> [!dpa]`):** in `Schritt 4` evidenziare l'impatto concreto del tema sulla **40h-Projektarbeit (50 % AP2)** e sulle prove scritte **FIDPA** (*Prozessanalyse* + *Datenqualität*).

### B. Qualità dell'Active Recall (2.0)
1. **Selbst-Checkliste per Teil A (`> [!selfcheck]-`):** subito sotto le 4 domande del *Gesprochenes Schema*, inserire un callout chiuso con i 5–6 concetti/numeri chiave tedeschi da verificare dopo l'esposizione libera.
2. **Allenamento esplicito ai `Prüfungsoperatoren` ZPA Nord-West:** ogni domanda in `Teil B` indica l'Operatore IHK e i punti (`[Operator: NENNEN / BESCHREIBEN / ERLÄUTERN / BEGRÜNDEN / BERECHNEN – X Punkte]`) e la soluzione mostra la ripartizione dei punti ZPA.
3. **Denkanstoß Socratico Obbligatorio (`> [!hint]- Denkanstoß`):** presente prima di ogni `> [!tip]- Lösung anzeigen` in tutti i file `_Recall.md` (nessuna eccezione).
4. **Parsons Problems, Bug-Hunting & Live Code (`Execute Code`):** nelle unità tecniche/matematiche inserire almeno 1 blocco `python` eseguibile direttamente in Obsidian (con `assert` automatici) o un esercizio di *Bug-Hunting / riordino logico* con *Self-Explanation*.

### C. Interfaccia & Interattività Obsidian
- **Dashboard `DataviewJS`:** barre di avanzamento live per Curriculum, `AP1`, `AP2` e tutti i **7 Cluster**, coda `Spaced Repetition` e **Radar automatico delle `Blockaden`** in [00_Dashboard_SecondBrain_FNM.md](file:///Users/federicofiorentino/Documents/AntiGravity/Metodo%20di%20studio%20/Metodo%20di%20studio%20Fenomenico/UMSCHULUNG_FIDPA_FNM/00_Dashboard_SecondBrain_FNM.md).
- **Custom CSS (`fnm-learning-ui.css`):** stile dedicato per `[!operator]`, `[!falle]`, `[!selfcheck]`, `[!faded]` e `[!dpa]`.

---

## 10. Architettura Dati & Collegamento NotebookLM ↔ Second Brain

Per mantenere sincronizzati in modo deterministico il Vault Obsidian (`UMSCHULUNG_FIDPA_FNM`) e i **14 notebook su NotebookLM**, valgono le seguenti regole strutturali:

1. **Topologia a 14 Notebook:**
   - **12 Notebook `LF` (`LF 1`–`LF 12c`):** un notebook dedicato per ciascun *Lernfeld* (AP1: `LF 1`–`LF 5`; AP2 – FIDPA: `LF 6`–`LF 12c`), configurati con persona d'esame IHK-FIDPA / ZPA Nord-West e taggati per Cluster e stato di sincronizzazione (`fnm-synced` / `pdf-only`).
   - **2 Notebook Meta trasversali:**
     - `FNM`: base metodologica su *Apprendimento Fenomenico*, *Active Recall*, *Spaced Repetition* e *Zero Seconda Lettura* (Giovanni Fenu / MemoVia).
     - `Audio-Priming FNM (FIDPA)`: notebook dedicato al **Passo 0** (materiali introduttivi, video di priming e lezioni propedeutiche).
2. **Igiene delle Fonti (`Source Hygiene`):**
   - `Kapitel_*.pdf` *(Kersken)* = **autorità tecnica di riferimento** per definizioni esatte, numeri ed esempi approfonditi.
   - `LF*.md` *(lezioni FNM)* = **fonte primaria filtrata IHK** per i *Cold-Check Quiz* e il ripasso attivo.
   - **Divieto di upload:** non caricare mai nei notebook i file `*_Recall.md` (per evitare spoiler/contaminazione dei quiz a freddo) né file obsoleti o pre-split (es. vecchie bozze sostituite da `a/b/c`).
3. **Single Source of Truth & Metadati YAML Obbligatori:**
   - Il registro canonico di tutti i 14 notebook risiede in `UMSCHULUNG_FIDPA_FNM/00_NotebookLM_Registry.json` ed è visualizzato live in [00_NotebookLM_Hub.md](file:///Users/federicofiorentino/Documents/AntiGravity/Metodo%20di%20studio%20/Metodo%20di%20studio%20Fenomenico/UMSCHULUNG_FIDPA_FNM/00_NotebookLM_Hub.md).
   - Ogni nota di lezione (`LF*.md`), di verifica (`*_Recall.md`) e di laboratorio (`Labs/*.md`) deve includere nel frontmatter YAML le proprietà `nlm_id` e `nlm_url` puntanti al notebook `LF` corrispondente.
4. **Tassonomia Label Interne sui Notebook (`Source Labels`):**
   - Ogni notebook `LF 1`–`LF 12c` separa funzionalmente le fonti in `🎯 FNM-Lektionen (IHK Cold-Check)` (lezioni `.md` filtrate IHK) e `📘 Kersken Referenz (PDF)` (capitoli integrali di riferimento), affiancate da label tematiche/di cluster sui moduli attivi (`LF 1`–`LF 6`).
   - Le fonti possono appartenere contemporaneamente sia alla label funzionale (`🎯 FNM-Lektionen`) sia alla propria label tematica.
   - I notebook meta usano etichette dedicate al metodo (`🧠 Memoria & Tecniche`, `📐 Metodo FNM & Strategia Esami`, `📚 Fonti, Libri & Ricerca Fenu`) e al priming (`🎬 Video-Priming`, `🎯 FNM-Lektionen`).
