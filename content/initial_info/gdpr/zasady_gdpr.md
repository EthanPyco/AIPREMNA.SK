---
description: Pravidlá GDPR pri používaní AI nástrojov s údajmi žiakov.
---

# AI Compliance a GDPR: Príručka bezpečnosti pre učiteľov

## Cieľ
Chrániť súkromie študentov a zabezpečiť súlad s nariadením GDPR pri používaní umelej inteligencie v triede. Táto príručka vám pomôže premeniť AI na bezpečného asistenta bez rizika zneužitia citlivých údajov.

### 🛠️ Odporúčané postupy pre AI
* **Anonymizácia:** Nahradenie mien a identifikátorov neutrálnymi označeniami.
* **Minimalizácia údajov:** Zdieľanie len absolútne nevyhnutných informácií potrebných na vykonanie úlohy.
* **Overenie nástroja:** Kontrola, či je nástroj schválený vašou školou alebo zriaďovateľom.
* **Správa nastavení:** Vypnutie trénovania modelov na vašich údajoch v nastaveniach nástroja.

---

## 🔄 Pracovný postup dodržiavajúci GDPR

`Identifikácia typu údajov` ➔ `Anonymizácia/Vyčistenie` ➔ `Kontrola nastavení` ➔ `Generovanie a overenie`

### Krok 1: Identifikácia typu údajov
Predtým, než čokoľvek vložíte do AI, položte si otázku: „Obsahuje toto osobné údaje (PII)?“
* **Príklady PII:** Mená, dátumy narodenia, rodné čísla, adresy bydliska, špecifické zdravotné diagnózy alebo fotografie študentov.

### Krok 2: Anonymizácia a čistenie
Ak potrebujete spracovať údaje týkajúce sa študentov (napr. opraviť esej alebo zhrnúť spätnú väzbu), odstráňte všetky PII.
* **Nesprávne:** „Spätná väzba pre Petra Kováča zo 7.A, ktorý má ADHD.“
* **Správne:** „Spätná väzba pre Študenta A zo 7. ročníka.“

### Krok 3: Konfigurácia nastavení súkromia
Väčšina AI nástrojov (ako ChatGPT alebo Claude) predvolene používa vaše údaje na trénovanie svojich modelov.
* **Akcia:** Prejdite do Nastavení (Settings) ➔ Kontrola údajov (Data Controls) a vypnite „Chat History & Training“ alebo použite režimy „Temporary Chat“.

---

## ✍️ Efektívne promptovanie s ohľadom na súkromie

### Šablóna promptu pre bezpečnú interakciu:
> „Poskytnem ti [Anonymizovaný obsah]. Chcem, aby si [Úloha] pre [Cieľová skupina]. Do výstupu nezahŕňaj žiadne citlivé informácie. Štýl: [Požadovaný tón].“

### Príklad promptu (Bezpečné známkovanie):
> „Poskytnem ti anonymizovanú esej študenta 9. ročníka. Vypracuj konštruktívnu spätnú väzbu na gramatiku a štruktúru. Autora označuj výhradne ako 'študent'.“

---

## ⚠️ Checklist pre kontrolu „človekom“
* **Politika nulových PII:** Potvrďte, že do promptu neprenikli žiadne skutočné mená ani identifikátory.
* **Sanitizácia výstupu:** Uistite sa, že AI si nevymyslela (halucinácia) alebo spätne neidentifikovala osoby na základe kontextu.
* **Kontrola úložiska:** Vyhnite sa ukladaniu citlivých výstupov z AI v nezašifrovaných lokálnych súboroch.
* **Varovanie o súkromí:** AI nie je „čierna skrinka“ – čokoľvek napíšete, môžu vidieť ľudskí kontrolóri v spoločnosti vyvíjajúcej AI.

---

## ✅ Ako zistiť, či ste správne pochopili túto príručku
Po prečítaní tejto príručky by ste mali vedieť:
* Identifikovať, ktoré údaje o študentoch sú v prompte pre AI zakázané.
* Správne anonymizovať zoznam študentov pre úlohu známkovania.
* Nájsť a vypnúť nastavenia „trénovania“ aspoň v jednom nástroji AI.

---

## 🚀 Voliteľné rozšírenia
* **Enterprise verzie:** Informujte sa vo vašej škole o „Enterprise“ alebo „Education“ verziách nástrojov (ako Microsoft Copilot s ochranou komerčných údajov), ktoré ponúkajú oveľa vyššie štandardy súkromia.
