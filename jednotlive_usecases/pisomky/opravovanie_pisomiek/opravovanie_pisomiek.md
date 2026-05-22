# Hodnotenie písomiek pomocou AI: Príručka pre učiteľov

## Cieľ
Využite multimodálnu AI na urýchlenie opravovania ručne písaných písomiek, testov s krátkymi odpoveďami a esejí. Tento postup pomáha učiteľom poskytovať rýchlejšiu a podrobnejšiu spätnú väzbu pri zachovaní vysokej konzistencie hodnotenia a úspore hodín administratívnej práce.

### 🛠️ Odporúčané nástroje AI
* **ChatGPT (GPT-4o) / Claude 3.5 Sonnet:** Špička v oblasti OCR (čítanie rukopisu) a komplexného uvažovania.
* **Microsoft Copilot:** Silná alternatíva so zabudovanou ochranou údajov v mnohých inštitucionálnych prostrediach.
* **Adobe Scan / Microsoft Lens:** Nevyhnutné pre kvalitné mobilné skenovanie do PDF.

---

## 🔄 Postup krok za krokom

`[Príprava rubricu] ➔ [Digitalizácia] ➔ [Konfigurácia AI] ➔ [Dávkové hodnotenie] ➔ [Kontrola a overenie]`

### Krok 1: Pripravte „nepriestrelný“ hodnotiaci rubric
AI potrebuje jasné hranice. Namiesto „Dobré vysvetlenie“ použite konkrétne kritériá ako „Max. 2 body za pomenovanie vstupov/výstupov (H2O, CO2).“

### Krok 2: Vysokoefektívna digitalizácia
Použite skenovaciu aplikáciu na konverziu papierov do PDF. Skombinujte strany každého študenta do jedného súboru (napr. `Student_01.pdf`), aby ste udržali proces organizovaný.

### Krok 3: Nastavenie „Mega-Promptu“
Otvorte nový chat a „uzamknite“ svoje pravidlá hodnotenia a rubric ešte pred nahraním akýchkoľvek prác. To zabezpečí, že AI bude uplatňovať rovnaké štandardy na každého študenta.

### Krok 4: Dávkové spracovanie
Nahrávajte PDF študentov po jednom. Použite konzistentný príkaz ako „Ohodnoť Študenta 01“ na spustenie predkonfigurovaného formátu odpovede.

---

## ✍️ Sekcia promptového inžinierstva

### Šablóna promptu:
> „Pôsob ako expert na [Predmet], ktorý hodnotí skúšku. Budem nahrávať práce študentov jednu po druhej.
> 
> **Pravidlá:**
> 1. Dodržuj tento Rubric: [Vložte Rubric]
> 2. Rukopis: Ak je nečitateľný, označ ho ako [NEČITATEĽNÉ].
> 3. Formát: Výsledky vráť ako:
>    - **ID študenta:** [ID]
>    - **Skóre:** [X]/[Celkom]
>    - **Zrážky bodov:** [Dôvod v slovenčine]
>    - **Spätná väzba:** [2 vety pre študenta]
> 
> Ak rozumieš, odpovedz 'Pripravený'."

### Príklad promptu:
> „Pôsob ako skúsený učiteľ biológie na strednej škole. Použi nasledujúci rubric na ohodnotenie testu z fotosyntézy. Ak študent spomenie 'chlorofyl', ale vynechá 'svetelnú fázu', odpočítaj 1 bod. [Obsah rubricu...] Odpovedz 'Pripravený' pre začiatok.“

---

## ⚠️ Kontrolný zoznam „Človek v slučke“
* **Presnosť OCR:** Dvakrát skontrolujte interpretáciu AI pri nečitateľnom rukopise alebo nejednoznačných symboloch.
* **Kontrola konzistencie:** Ak sa AI zdá byť pri prvých prácach príliš benevolentná alebo prísna, okamžite zadajte „korekčný“ prompt.
* **Súkromie:** **POVINNÉ VAROVANIE:** Nikdy nenahrávajte mená študentov ani iné citlivé identifikátory. Všetky práce anonymizujte (napr. použite „Študent 01“) a v nastaveniach AI vypnite „Históriu chatu a tréning“, aby ste chránili údaje študentov.

---

## ✅ Ako zistíte, že ste návod správne pochopili
Na konci tejto príručky by ste mali byť schopní:
* Vytvoriť podrobný bodový rubric, ktorý dokáže AI konzistentne interpretovať.
* Digitalizácia: Skenovať a organizovať prácu študentov do čistých, viacstranových PDF súborov.
* Vykonávať stratégiu „Mega-Promptu“ na udržanie štandardov hodnotenia v celej triede.
* Overovať a upravovať AI generovanú spätnú väzbu z hľadiska tónu a faktickej presnosti.
* Anonymizovať údaje študentov v súlade s predpismi o ochrane súkromia.

---

## 🚀 Voliteľné rozšírenia
* **Export do tabuľky:** Požiadajte AI: „Sformátuj výsledky pre Študentov 01-10 ako CSV tabuľku,“ aby ste mohli známky rýchlo skopírovať do svojho digitálneho zošita.
* **Analýza častých chýb:** Po ohodnotení celej triedy sa opýtajte AI: „Na základe všetkých ohodnotených prác, aké boli 3 najčastejšie mylné predstavy, ktoré študenti mali?“
