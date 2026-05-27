# Slovník pojmov: Sprievodca AI terminológiou pre učiteľov

Svet umelej inteligencie (AI) prináša množstvo nových výrazov, ktoré môžu znieť technicky a mätúco. Tento slovník vám pomôže rýchlo sa zorientovať v tých najdôležitejších pojmoch, s ktorými sa pri práci s AI nástrojmi stretnete.

---

### 🤖 Základné pojmy

*   **LLM (Large Language Model / Veľký jazykový model):** Jadro moderných chatbotov (ako ChatGPT alebo Claude). Je to program vytrénovaný na obrovskom množstve textu, vďaka čomu dokáže predpovedať nasledujúce slová a komunikovať takmer ako človek.
*   **Prompt (Príkaz / Zadanie):** Akýkoľvek textový pokyn, ktorý napíšete umelej inteligencii. Je to spôsob, akým s AI komunikujete.
*   **Prompt Engineering (Inžinierstvo príkazov):** Umenie a technika formulovania príkazov tak, aby ste od AI dostali čo najlepší a najpresnejší výsledok.
*   **Halucinácia (Hallucination):** Keď si AI sebavedomo vymyslí fakt, ktorý nie je pravdivý (napr. neexistujúci dátum alebo citát). AI "nevie", že klame; len generuje slová, ktoré znejú pravdepodobne.

---

### 🧠 Pokročilé techniky komunikácie

*   **Kontextové okno (Context Window):** "Pracovná pamäť" modelu AI. Určuje, koľko textu (strán dokumentov, predchádzajúcich správ) si AI dokáže naraz udržať v hlave a brať do úvahy pri odpovedi.
*   **Context Engineering (Inžinierstvo kontextu):** Príprava prostredia pre AI predtým, než jej zadáte úlohu. Zahŕňa nahranie dokumentov, určenie pravidiel a definovanie presnej situácie.
*   **Ukotvenie (Grounding):** Technika, ktorou AI prikážete, aby čerpala informácie *výhradne* z vami poskytnutých podkladov (napr. z nahraného PDF), čím sa dramaticky znižuje riziko halucinácií.
*   **Persona (Rola):** Inštrukcia pre AI, aby sa správala ako konkrétny odborník (napr. "Pôsob ako skúsený učiteľ dejepisu"). Pomáha to nastaviť správny tón a úroveň odbornosti.
*   **System Prompt (Systémový prompt):** Skryté inštrukcie na pozadí, ktoré definujú základné správanie AI (napr. "Vždy odpovedaj stručne a v slovenčine").

---

### 🛠️ Technické detaily (jednoducho)

*   **Token:** Základná jednotka, ktorú AI spracúva. Nie je to vždy celé slovo, ale často jeho časť (približne 1000 tokenov je asi 750 slov). Modely majú limity na to, koľko tokenov dokážu naraz spracovať.
*   **RAG (Retrieval-Augmented Generation):** Proces, pri ktorom AI najprv vyhľadá relevantné informácie vo vašich dokumentoch a až potom na ich základe vytvorí odpoveď. Toto je technológia v pozadí nástrojov ako NotebookLM.
*   **Zero-Shot / Few-Shot:** "Zero-shot" znamená, že AI zadáte úlohu bez príkladu. "Few-shot" znamená, že jej ukážete 1-2 príklady toho, ako má výsledok vyzerať, čo výrazne zvyšuje kvalitu výstupu.
*   **Chain-of-Thought (CoT / Reťazec myšlienok):** Technika, pri ktorej AI prikážete, aby nad problémom uvažovala "krok za krokom" predtým, než dá finálnu odpoveď. Pomáha to najmä pri logických a matematických úlohách.

---

### 🖥️ Používateľské prostredie a formáty

*   **Multimodálny (Multimodal):** AI model, ktorý dokáže spracovať nielen text, ale aj obrázky, zvuk alebo video (napr. ukážete mu fotku tabule a on ju prepíše do textu).
*   **Artifacts (Artefakty):** Špeciálna funkcia v nástroji Claude, ktorá otvára samostatné okno pre dlhšie texty, tabuľky alebo kód, aby ste ich mohli vidieť a upravovať popri písaní.
*   **Deep Research (Hlboký výskum):** Funkcia, pri ktorej AI samostatne prehľadáva desiatky webových stránok, aby vytvorila komplexnú správu na danú tému.
*   **Markdown:** Jednoduchý spôsob formátovania textu pomocou symbolov (napr. `#` pre nadpis, `**` pre tučné písmo). AI takto formátuje väčšinu svojich výstupov.

---

### ⚠️ Etika a riziká

*   **Bias (Predpojatosť):** Sklon AI modelu uprednostňovať určité názory, stereotypy alebo demografické skupiny na základe dát, na ktorých bol vytrénovaný.
*   **GDPR:** Európske nariadenie o ochrane osobných údajov. V kontexte AI to znamená, že do bezplatných nástrojov by ste nikdy nemali vkladať mená žiakov alebo iné citlivé údaje.
