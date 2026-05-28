---
description: Základy efektívneho písania promptov pre AI asistentov.
---

# Príručka Prompt Engineeringu (Inžinierstva príkazov)

## Cieľ
Prompt engineering (inžinierstvo príkazov) je prax štruktúrovania, vyhodnocovania a navrhovania vstupov (promptov) s cieľom získať čo najpresnejšie, najrelevantnejšie a najkvalitnejšie výstupy z modelov generatívnej AI. Predstavte si to ako učenie sa, ako efektívne komunikovať s AI – presne vedieť, ako formulovať požiadavku, aké podrobnosti zahrnúť a aké obmedzenia nastaviť, aby vám AI dodala presne to, čo potrebujete, hneď na prvý pokus.

### 🛠️ Odporúčané nástroje AI
* **Gemini / ChatGPT / Claude:** Primárne textové konverzačné modely používané na precvičovanie a aplikáciu techník prompt engineeringu.

---

## 🔄 Pracovný postup krok za krokom

`[Definovať cieľ] ➔ [Priradiť rolu] ➔ [Poskytnúť kontext] ➔ [Nastaviť obmedzenia] ➔ [Upraviť a opakovať]`

### Krok 1: Definujte cieľ
Jasne identifikujte, čo chcete, aby AI vytvorila, analyzovala alebo upravila (napr. napísať e-mail, odladiť kód, zhrnúť správu).

### Krok 2: Priraďte rolu (Persona)
Dajte AI konkrétnu identitu alebo perspektívu, aby ste ukotvili jej tón a odbornosť (napr. „Konaj ako senior copywriter“ alebo „Si trpezlivý učiteľ matematiky“).

### Krok 3: Poskytnite kontext a dáta
Dodajte potrebné informácie o pozadí, referenčné texty alebo dátové body, s ktorými musí AI pracovať, aby sa zabezpečila presnosť.

### Krok 4: Nastavte obmedzenia a formátovanie
Uveďte pravidlá pre výstup, ako je dĺžka, tón, štruktúra alebo to, čo *neobsahovať* (napr. „Udržuj to pod 200 slovami“, „Formátuj ako zoznam s odrážkami“, „Vyhni sa korporátnemu žargónu“).

---

## 💡 Základné techniky v Prompt Engineeringu

* **Zero-Shot Prompting (Príkaz bez príkladov):** Žiadosť, aby AI vykonala úlohu bez toho, aby ste jej poskytli akékoľvek príklady.
  * *Príklad:* „Prelož tento odsek do francúzštiny.“
* **Few-Shot Prompting (Príkaz s niekoľkými príkladmi):** Poskytnutie jedného alebo viacerých príkladov požadovaného štýlu výstupu pred tým, než AI požiadate o dokončenie úlohy. Toto je vysoko efektívne pre komplexné formátovanie alebo špecifické tóny.
* **Chain-of-Thought (CoT - Reťazec myšlienok):** Inštruktážne zadávanie príkazov, ktoré AI povie, aby pred poskytnutím konečnej odpovede krok za krokom rozobrala svoje uvažovanie. Toto výrazne zlepšuje výkon v logike, matematike a riešení problémov.

---

## ✍️ Sekcia šablón a príkladov

### Šablóna promptu:
> „Konaj ako odborník na **[Rola]**. Potrebujem, aby si **[Hlavná úloha]** na základe nasledujúcich informácií: **[Kontext/Dáta]**.
> 
> Prosím, dodržuj tieto prísne pravidlá:
> * **Tón:** [napr. profesionálny, empatický, humorný]
> * **Formát:** [napr. tabuľka, zoznam Markdown, 3 krátke odseky]
> * **Obmedzenia:** Nezahŕňaj [napr. omáčku, technický žargón, špecifické slová].“

### Príklad promptu:
> „Konaj ako senior kariérny kouč. Skontroluj nižšie uvedený návrh opisu práce a vytvor zhrnutie v 3 bodoch, ktoré zdôrazní hlavné povinnosti.
> 
> Návrh: [Sem vložte opis práce]
> 
> Štýl: Akčne orientovaný a profesionálny. Uisti sa, že každý bod začína silným akčným slovesom.“

---

## ⚠️ Kontrolný zoznam pre revíziu „Človek v slučke“
* **Overovanie faktov:** Modely AI môžu niekedy sebavedomo uvádzať nesprávne fakty (halucinácie). Vždy overujte údaje, dátumy a kritické informácie.
* **Predpoatosť a tón:** Uistite sa, že výstup je v súlade s vaším zamýšľaným hlasom a neprináša neúmyselné predpoklady alebo predsudky.
* **Optimalizácia promptu:** Ak výstup nie je správny, nezačínajte od nuly. Použite doplňujúce príkazy na nasmerovanie AI (napr. „Urob tón teplejším“ alebo „Mierne rozšír druhý bod“).

---

## ✅ Ako zistíte, že ste pochopili túto príručku
Na konci tejto príručky by ste mali byť schopní:
* Premeniť vágnu, jedno-vetnú požiadavku na štruktúrovaný, viacvrstvový prompt, ktorý prinesie vynikajúci výsledok na prvýkrát.
* Použiť techniku „Few-Shot“ na naučenie AI špecifickému štýlu písania alebo formátu dát.
* Aplikovať obmedzenia na úplné odstránenie nežiaducich prvkov alebo formátovania z odpovede AI.