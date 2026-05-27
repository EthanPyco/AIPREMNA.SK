# DeepSeek: Štandardizovaná príručka pre učiteľov

---

## 1. Všeobecný prípad použitia
DeepSeek je výkonný, vysokovýkonný AI asistent známy svojimi výnimočnými schopnosťami uvažovania a efektivitou. Pre učiteľov slúži ako vysoko logický partner pre komplexné riešenie problémov, plánovanie učebných osnov a generovanie presného vzdelávacieho obsahu, pričom v technických úlohách často konkuruje iným špičkovým modelom.

### 🛠️ Odporúčané prípady použitia
* **[Písanie e-mailov](../../../jednotlive_usecases/administrativa/pisanie_emailu/writing_email.md):** Vytváranie jasnej, profesionálnej a dobre štruktúrovanej komunikácie pre rôzne zainteresované strany školy.
* **[Tvorba písomiek](../../../jednotlive_usecases/pisomky/tvorba_pisomky/creating_exams.md):** Vypracovanie náročných hodnotiacich otázok, najmä v predmetoch STEM, kde sa vyžaduje logická presnosť.
* **[Sumarizácia poznámok](../../../jednotlive_usecases/sumarizacia_uciva/sumarizacia_poznamok/summarizing_notes.md):** Zhustenie pedagogických textov alebo zápisníc zo stretnutí do praktických zhrnutí.
* **[Cvičné úlohy](../../../jednotlive_usecases/aktivity_na_hodinu/cvicne_ulohy/practice_questions.md):** Generovanie cvičení a úloh krok za krokom pre prax študentov.

---

## 🔄 UI Workflow krok za krokom

`[Prístup/Prihlásenie] ➔ [Promptovanie/Vstup] ➔ [Interakcia/Ladenie] ➔ [Finalizácia/Export]`

### Krok 1: Prístup k nástroju
Prejdite na chat.deepseek.com alebo použite mobilnú aplikáciu DeepSeek. Prihlásiť sa môžete pomocou e-mailovej adresy alebo cez účty tretích strán (napríklad Google). Rozhranie je zjednodušené pre priamu interakciu bez zložitej konfigurácie.

### Krok 2: Poskytnutie vstupu
Zadajte svoju požiadavku do chatovacieho rozhrania v dolnej časti obrazovky. DeepSeek umožňuje vkladanie dlhého textu a nahrávanie súborov (cez ikonu prílohy). Pre zložité logické úlohy môžete vybrať konkrétne modely ako "DeepSeek-R1", aby ste využili jeho pokročilý reťazec uvažovania.

### Krok 3: Ladenie výsledku
Skontrolujte výstup a poskytnite doplňujúce pokyny na spresnenie zamerania. DeepSeek je obzvlášť dobrý v sledovaní viacstupňových opráv. Ak je tón príliš technický, požiadajte ho, aby ho "zjednodušil pre mladšie publikum" alebo "urobil tón povzbudivejším."

---

## ✍️ Efektívny prompting pre DeepSeek

DeepSeek prosperuje vďaka logickej štruktúre a jasným cieľom.

### Ako písať prompty pre tento nástroj:
* **Podporujte uvažovanie:** Pri zložitých témach začnite slovami "Premýšľaj krok za krokom" alebo použite model R1, aby ste videli "proces myslenia" za odpoveďou.
* **Štrukturálne obmedzenia:** Používajte špecifické požiadavky na formátovanie, napríklad "Vráť výstup ako tabuľku Markdown" alebo "Uveď kľúčové pojmy v odrážkach, po ktorých nasleduje zhrnutie."
* **Špecifikácia roly:** Jasne definujte vzdelávací kontext (napr. "Ste učiteľ fyziky na strednej škole a vysvetľujete termodynamiku").

### Príklad promptu:
> "Ste expert na tvorbu učebných osnov. Chcem, aby ste vytvorili týždenný plán lekcií pre biológiu v 7. ročníku na tému 'Rastlinné bunky'. Výstup by mal obsahovať ciele učenia, zoznam potrebných materiálov a 10-minútovú úvodnú aktivitu. Štýl: Štruktúrovaný a ľahko sledovateľný."

---

## ⚠️ Kontrolný zoznam pre konkrétny nástroj (Nedostatky)

* **Kontrola halucinácií:** Ako všetky LLM, aj DeepSeek môže občas vygenerovať nesprávne fakty. Overte technické údaje, historické dátumy a konkrétne citácie v dôveryhodných vzdelávacých zdrojoch.
* **Technická zaujatosť:** DeepSeek môže niekedy predvoliť veľmi stručný alebo technický tón. Učitelia ho možno budú musieť požiadať konkrétne o "empatický" alebo "vrelý" jazyk pri písaní rodičom.
* **Regionálne znalosti:** Hoci je celosvetovo vysoko schopný, uistite sa, že v prompte sú výslovne uvedené miestne učebné štandardy, aby ste sa vyhli generickým "globálnym" príkladom.
* **Upozornenie na súkromie:** Do chatovacieho rozhrania nenahrávajte identifikovateľné informácie o študentoch (mená, ID čísla alebo súkromné známky).

---

## ✅ Ako zistiť, že ste tento nástroj ovládli
Na konci tejto príručky by ste mali byť schopní:
* Úspešne vygenerovať logicky nadväzujúci plán lekcie alebo súbor zložitých skúšobných otázok.
* Použiť výstup "uvažovania" (R1) na pochopenie toho, ako AI dospela k riešeniu ťažkého problému.
* Upraviť technické vysvetlenia do jazyka priateľského pre študentov prostredníctvom následných promptov.

---

## 🚀 Voliteľné rozšírenia
* **DeepSeek-R1 pre kódovanie:** Ak učíte informatiku, použite DeepSeek-R1 na ladenie kódu alebo vysvetlenie programovacej logiky; v tejto oblasti je svetovou špičkou.
* **Integrácia API:** Pre pokročilých používateľov ponúka DeepSeek nákladovo efektívne API, ktoré možno integrovať do vlastných školských nástrojov alebo tabuliek.
* **Analýza súborov:** Nahrajte PDF súbory s učebnými osnovami a nechajte AI identifikovať medzery alebo navrhnúť zosúladenie so vzdelávacími štandardmi.