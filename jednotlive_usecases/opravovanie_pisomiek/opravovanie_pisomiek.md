# Optimalizovaný pracovný postup hodnotenia skúšok s pomocou AI

## 1. Účel a základná filozofia

Tento pracovný postup využíva AI (konkrétne multimodálne LLM modely ako ChatGPT, Claude alebo Copilot) na urýchlenie hodnotenia ručne písaných skúšok, testov s krátkymi odpoveďami a esejí (vrátane zadaní v slovenskom jazyku).

**Zlaté pravidlo:** AI navrhuje; učiteľ rozhoduje. AI je váš pedagogický asistent — pripravuje návrhy bodovania a spätnej väzby, no konečná pedagogická a právna zodpovednosť zostáva na vás.

---

## 2. Ochrana súkromia a súlad s GDPR (nevyhnutné)

Pred nahraním akéhokoľvek obrázka do komerčného AI modelu:

* **Anonymizujte:** Prehnite, zakryte alebo digitálne orežte mená študentov, dátumy narodenia a školské identifikačné čísla.
* **Identifikátor:** Použite jednoduchý systém číslovania na stránke (napr. *Študent 01*, *Študent 02*) na prepojenie testu s klasifikačnou tabuľkou.
* **Zakázanie použitia dát:** V nastaveniach AI účtu vypnite možnosť „História chatu a tréning“, aby práce študentov neboli použité na trénovanie budúcich verejných modelov.

---

## 3. Zjednodušený 5-krokový pracovný postup

### Krok 1: Pripravte „nepriestrelný“ hodnotiaci rubric

AI nevie čítať vaše myšlienky. Ak je rubric nejasný, hodnotenie AI bude nekonzistentné.

* **Zlý rubric:** *Otázka 1 (5 bodov): Dobré vysvetlenie fotosyntézy.*
* **Dobrý rubric:** *Otázka 1 (5 bodov): Max. 2 body za pomenovanie svetelnej/tmavej fázy; max. 2 body za správnu identifikáciu vstupov/výstupov ($H_2O$, $CO_2$, $O_2$); 1 bod za správnu slovenskú vedeckú terminológiu (napr. „fotosyntéza“). Odpočítajte 0,5 bodu za menšie faktické chyby.*

### Krok 2: Vysokoefektívna digitalizácia

Nerobte len bežné fotografie mobilom. Použite bezplatnú skenovaciu aplikáciu (napr. **Adobe Scan**, **Microsoft Lens** alebo funkciu skenovania v natívnej aplikácii Poznámky na iOS/Android).

* Skenujte do **PDF formátu**, nie ako jednotlivé JPEG obrázky.
* Skombinujte stránky jedného študenta do jedného PDF súboru s názvom `Student_01.pdf`. Súbory tak zostanú organizované a jednoduchšie na presúvanie myšou.

### Krok 3: Vytvorte „Mega-Prompt“ (ukotvený chat)

**Nevkladajte** rubric a pravidlá opakovane pre každého študenta. Namiesto toho otvorte úplne novú chatovaciu reláciu a najprv „uzamknite“ pravidlá.

**Najprv vložte do AI tento presný prompt:**

```text
You are an expert high school teacher grading a Slovak-language exam. I am going to upload student exam papers one by one. Do not start grading yet. First, acknowledge that you understand these strict rules:

1. GRADING CRITERIA: You must strictly follow the rubric provided below. Be fair, but do not award points for missing information.
2. HANDWRITING & ACCENTS: The text is handwritten in Slovak. Pay close attention to Slovak diacritics (dĺžne, mäkčene). If a word is genuinely illegible, flag it as [ILLEGIBLE] and award 0 points for that specific part, leaving it for my manual review.
3. NO HALLUCINATION: Grade only what is explicitly visible on the page. Do not invent missing answers.
4. OUTPUT FORMAT: For every student paper I upload, you must reply strictly using the following markdown template:

### Student ID: [Insert ID]
- **Question 1:** [X]/[Total] pts — *Reason for deduction:* [Brief reason in Slovak or "Full marks"]
- **Question 2:** [X]/[Total] pts — *Reason for deduction:* [Brief reason]
- **TOTAL SCORE:** [X]/[Total] pts
- **Draft Feedback for Student (in Slovak):** [2-3 constructive sentences praising what they did well and noting where they lost points.]

Here is the Rubric you must use:
[PASTE YOUR DETAILED RUBRIC HERE]

If you understand, reply with: "Ready for Student 01."

```

### Krok 4: Dávkové spracovanie (výrobná linka)

Keď AI odpovie, že je pripravená:

1. Pretiahnite súbor `Student_01.pdf` do chatu.
2. Napíšte jednoduchý príkaz: `"Grade Student 01."`
3. Skontrolujte výstup AI na obrazovke. Porovnajte ho priamo s papierovou verziou alebo PDF.
4. Prepíšte body do Excelu alebo klasifikačnej tabuľky.
5. Pretiahnite `Student_02.pdf`, napíšte `"Grade Student 02."` a postup zopakujte.

> 💡 **Tip pre profesionálov:** Ak si všimnete, že AI je pri Študentovi 01 príliš benevolentná alebo príliš prísna, okamžite ju opravte (napr. *„Pri otázke 2 si bol príliš mierny. Ak chýba presný rok, musia stratiť celý 1 bod. Prehodnoť Študenta 01 s týmto pravidlom.“*). Po úprave pokračujte so Študentom 02.

### Krok 5: Overenie a finálne doladenie

Pred uzamknutím známok do oficiálneho školského systému (napr. EduPage):

* Dvakrát skontrolujte všetky otázky, pri ktorých AI označila „nečitateľné písmo“.
* Skontrolujte vygenerovanú slovenskú spätnú väzbu, aby bol tón povzbudzujúci a gramaticky prirodzený.

