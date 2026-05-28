---
description: Ako poskytnúť AI správny kontext pre presnejšie a relevantnejšie odpovede.
---

# Príručka Context Engineeringu (Inžinierstva kontextu)

## Cieľ
Context engineering (inžinierstvo kontextu) je zámerná prax riadenia, štruktúrovania a poskytovania informácií o pozadí, obmedzeniach a údajoch o prostredí generatívnemu modelu AI *predtým*, ako mu zadáte konkrétny príkaz. Zatiaľ čo prompt engineering sa zameriava na direktívu (akciu), context engineering sa zameriava na hranice (ihrisko). Zabezpečuje, aby AI komplexne porozumela scenáru, dátovým limitom a presnej persone, ktorú má prijať, s cieľom poskytnúť vysoko relevantné a podložené odpovede.

### 🛠️ Odporúčané nástroje AI
* **Gemini 1.5 Pro / Claude 3.5 Sonnet:** Vynikajúca voľba pre context engineering vďaka ich masívnemu „kontextovému oknu“, ktoré im umožňuje spracovávať stovky strán referenčného materiálu súčasne bez toho, aby stratili prehľad o detailoch.

---

## 🔄 Pracovný postup krok za krokom

`[Izolovať hlavné dáta] ➔ [Stanoviť hranice] ➔ [Vložiť personu] ➔ [Naštruktúrovať rozvrhnutie] ➔ [Vykonať prompt]`

### Krok 1: Izolujte hlavné dáta
Zhromaždite presný text, dokumentáciu, databázové schémy alebo prepisy, ktoré AI musí použiť. Toto slúži ako jediný zdroj pravdy.

### Krok 2: Stanovte hranice (Systémové prompty)
Jasne povedzte AI, na čo sa nesmie pozerať alebo čo nesmie predpokladať. Inštruujte ju napríklad, aby odpovedala „Neviem“, ak sa odpoveď nenachádza v poskytnutom texte, čím účinne zabránite halucináciám AI.

### Krok 3: Vložte personu a cieľ
Definujte operačné prostredie. Je AI prísnym audítorom dodržiavania predpisov, kreatívnym partnerom na brainstorming alebo špecifickým asistentom pre učebné osnovy?

---

## 💡 Kľúčové prvky Context Engineeringu
Keď navrhujete kontext, v podstate pre AI vytvárate dočasnú vedomostnú základňu. Tá sa opiera o tri hlavné piliere:

* **Kontextové okno (Context Window):** Toto je „pracovná pamäť“ AI. Predstavte si to ako priestor na stole. Context engineering je umenie usporiadať najdôležitejšie súbory na tomto stole tak, aby AI nemusela hádať alebo prehľadávať svoju všeobecnú pamäť.
* **Ukotvenie (Grounding):** Toto núti AI ukotviť svoje odpovede striktne v rámci vami poskytnutých údajov, čím sa jej zabráni v preberaní nerelevantných alebo nesprávnych informácií z otvoreného internetu.
* **Few-Shot príklady (In-Context Learning):** Poskytnutie 2 alebo 3 príkladov dokonalého výstupu priamo v sekcii kontextu. AI analyzuje tieto vzorce, aby napodobnila presný štruktúrny štýl, ktorý očakávate.

---

## ✍️ Sekcia Context Engineeringu

### Šablóna promptu:
> **### SYSTEM OPERATING ENVIRONMENT ###**
> * **[Persona]:** Pôsobíte striktne ako [Špecifická rola].
> * **[Knowledge Boundary]:** Vaše znalosti pre toto sedenie sú obmedzené *výhradne* na text uvedený nižšie. Ak používateľ položí otázku, ktorú nie je možné odpovedať iba pomocou poskytnutého textu, odpovedzte: „Tieto informácie sú mimo rozsahu poskytnutého kontextu.“
> 
> **### REFERENCE MATERIAL ###**
> `[Sem vložte články, dáta, usmernenia alebo kód]`
> 
> **### OUTPUT FORMAT ###**
> Všetky odpovede musia zodpovedať tejto štruktúre: `[Definujte šablónu, napr. odrážkové zhrnutie nasledované tabuľkou].`
> 
> ---
> **[Prompt/Direktíva]:** „Teraz analyzujte referenčný materiál a...“

### Príklad promptu:
> **### SYSTEM OPERATING ENVIRONMENT ###**
> Pôsobíte ako prísny bot pre právny súlad pre Spoločnosť X. Poznáte iba naše interné pravidlá pre prácu na diaľku. Nepoužívajte externé zákonníky práce ani všeobecné znalosti.
> 
> **### REFERENCE MATERIAL ###**
> `[Vložený 4-stranový PDF dokument o Pravidlách práce na diaľku Spoločnosti X pre rok 2026]`
> 
> **### OUTPUT FORMAT ###**
> Jasne uveďte rozhodnutie podľa pravidiel, po ktorom bude nasledovať presné číslo odkazovanej sekcie.
> 
> ---
> **Otázka používateľa:** „Môžem pracovať dva týždne na diaľku zo Španielska?“

---

## ⚠️ Kontrolný zoznam pre revíziu „Človek v slučke“
* **Prehltenie kontextom (Context Stuffing):** Dávajte pozor, aby ste AI neprehltili nerelevantnými údajmi. To, že model dokáže prijať masívny dokument, neznamená, že potrebuje aj nepodstatný úvodný text. Najprv svoje dáta vyčistite.
* **Kontrola vyhľadávania informácií:** Overte, či AI skutočne číta aj stredné časti vášho kontextu. Niektoré modely trpia syndrómom „stratenia sa v strede“ (lost in the middle), kedy uprednostňujú úplný začiatok a koniec dlhých textov.
* **Ochrana osobných údajov:** Nikdy nenavrhujte kontext pomocou proprietárneho firemného kódu, obchodného tajomstva alebo chránených osobných údajov študentov/klientov, pokiaľ nepoužívate zabezpečené podnikové privátne prostredie AI.

---

## ✅ Ako zistíte, že ste pochopili túto príručku
Na konci tejto príručky by ste mali byť schopní:
* Úspešne napísať „ukotvovaciu doložku“ (grounding clause), ktorá zabráni AI hádať odpovede.
* Naštruktúrovať viacstranový dokument do čistých Markdown nadpisov, aby sa AI mohla v kontexte efektívne orientovať.
* Rozlíšiť medzi Promptom (napr. „Zhrň toto“) a Kontextom (napr. priložená 50-stranová správa).