// Centralised list of cheatsheet prompts. Imported by pages/cheatsheet.vue
// (for rendering + local filter) and composables/useSearch.ts (so the
// global header search surfaces them too, routed to /cheatsheet?focus=<id>).
//
// Each prompt is derived from the prompt blockquotes in the matching SK
// guide under content/jednotlive_usecases/. `sourcePath` lets the UI
// link back to the full guide via the LearningCard modal.

export interface CheatsheetPrompt {
  id: string
  category: string
  title: string
  description: string
  prompt: string
  sourcePath: string
}

export const cheatsheetPrompts: CheatsheetPrompt[] = [
  // Administratíva
  {
    id: 'email-rodicovi',
    category: 'Administratíva',
    title: 'E-mail rodičovi',
    description: 'Profesionálny, empatický e-mail pre rodiča žiaka.',
    prompt: 'Vypracuj empatický e-mail pre rodiča žiaka [Meno] o [Téma, napr. zhoršenom prospechu, absenciách]. Zahrň: konkrétne pozorovania z hodín, návrh ďalších krokov a otvorenú výzvu na stretnutie. Tón: profesionálny, povzbudzujúci, bez obviňovania. Rozsah: 150–200 slov.',
    sourcePath: '/jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu'
  },
  {
    id: 'email-kolegovi',
    category: 'Administratíva',
    title: 'E-mail kolegovi o spolupráci',
    description: 'Žiadosť kolegovi o spoločný projekt alebo zastupovanie.',
    prompt: 'Napíš stručný e-mail kolegovi [Predmet] s návrhom [spoločného projektu / zastupovania / konzultácie]. Vysvetli cieľ, časový rámec a čo presne od neho potrebujem. Tón: kolegiálny, priamy. Rozsah: do 120 slov.',
    sourcePath: '/jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu'
  },
  {
    id: 'email-riaditelovi',
    category: 'Administratíva',
    title: 'E-mail riaditeľovi',
    description: 'Formálna žiadosť alebo návrh adresovaný vedeniu školy.',
    prompt: 'Vypracuj formálny e-mail pre riaditeľa školy so žiadosťou o [stretnutie / schválenie aktivity / financovanie pomôcok]. Spomeň, že mám pripravený [predbežný návrh / rozpočet / harmonogram]. Tón: profesionálny, vecný. Rozsah: 120–180 slov.',
    sourcePath: '/jednotlive_usecases/administrativa/pisanie_emailu/pisanie_emailu'
  },
  {
    id: 'komunikacia-s-rodicmi',
    category: 'Administratíva',
    title: 'Citlivá správa rodičovi',
    description: 'Empatické sprostredkovanie náročnej informácie rodičovi.',
    prompt: 'Pôsob ako skúsený pedagóg. Sformuluj správu pre rodiča žiaka [Meno], v ktorej citlivo vysvetlím [problém: napr. konflikt s rovesníkmi, podozrenie na poruchu učenia]. Štruktúra: 1) konkrétne pozorovanie, 2) prečo to riešim, 3) návrh spoločných krokov. Vyhni sa obviňujúcemu tónu.',
    sourcePath: '/jednotlive_usecases/administrativa/komunikacia_s_rodicmi/komunikacia_s_rodicmi'
  },
  {
    id: 'podpora-ivp',
    category: 'Administratíva',
    title: 'Návrh úprav v IVP',
    description: 'Konkrétne pedagogické odporúčania pre individuálny vzdelávací plán.',
    prompt: 'Pôsob ako špeciálny pedagóg. Pre žiaka s [diagnóza, napr. dyslexia, ADHD] v [ročník] ročníku navrhni 5 konkrétnych úprav v IVP pre predmet [Predmet]. Pre každú úpravu uveď: cieľ, konkrétne kroky učiteľa, spôsob hodnotenia. Drž sa platnej legislatívy SR.',
    sourcePath: '/jednotlive_usecases/administrativa/podpora_ivp/podpora_ivp'
  },

  // Písomky a hodnotenie
  {
    id: 'tvorba-pisomky',
    category: 'Písomky a hodnotenie',
    title: 'Písomka s variantmi A/B',
    description: 'Test s 10 otázkami a dvomi rovnocennými variantmi.',
    prompt: 'Vytvor písomku z predmetu [Predmet] pre [ročník] ročník na tému [Téma]. Štruktúra: 5 otázok s výberom zo 4 možností, 3 otvorené otázky (3–5 viet), 2 úlohy na aplikáciu. Vytvor dva rovnocenné varianty A a B (rovnaká náročnosť, iné zadania). Na konci uveď kľúč správnych odpovedí.',
    sourcePath: '/jednotlive_usecases/pisomky/tvorba_pisomky/tvorba_pisomky'
  },
  {
    id: 'opravovanie-pisomiek',
    category: 'Písomky a hodnotenie',
    title: 'Hodnotiaca rubrika',
    description: 'Pomoc s vytvorením kritérií na opravovanie písomky.',
    prompt: 'Pôsob ako skúsený metodik. K nasledujúcej úlohe vytvor hodnotiacu rubriku so 4 úrovňami (výborný, dobrý, dostatočný, nedostatočný). Pre každú úroveň uveď konkrétne kritériá v jazyku zrozumiteľnom žiakom. Úloha: [vlož znenie úlohy].',
    sourcePath: '/jednotlive_usecases/pisomky/opravovanie_pisomiek/opravovanie_pisomiek'
  },
  {
    id: 'spatna-vazba',
    category: 'Písomky a hodnotenie',
    title: 'Slovná spätná väzba',
    description: 'Konštruktívne hodnotenie s dôrazom na rastové nastavenie.',
    prompt: 'Navrhni konštruktívnu slovnú spätnú väzbu pre žiaka, ktorý [Úspech alebo problém — napr. zlepšil sa v slohu, zhoršil sa v matematike]. Štruktúra: 1) konkrétne pozitívum, 2) jedna oblasť na rast, 3) konkrétny ďalší krok. Tón: povzbudzujúci, growth-mindset. Rozsah: 4–6 viet.',
    sourcePath: '/jednotlive_usecases/pisomky/spatna_vazba/spatna_vazba'
  },
  {
    id: 'ustna-skuska',
    category: 'Písomky a hodnotenie',
    title: 'Ústna skúška — otázky',
    description: 'Sada otázok rôznej náročnosti pre ústne skúšanie.',
    prompt: 'Vytvor 10 otázok pre ústnu skúšku z témy [Téma] pre [ročník] ročník. Rozdeľ ich: 4 otázky na reprodukciu faktov (1), 4 na pochopenie a vysvetlenie (2), 2 na aplikáciu a syntézu (3). Pri každej otázke uveď ideálnu odpoveď v 2–3 vetách.',
    sourcePath: '/jednotlive_usecases/pisomky/ustna_skuska/ustna_skuska'
  },

  // Aktivity na hodinu
  {
    id: 'cvicne-ulohy',
    category: 'Aktivity na hodinu',
    title: 'Cvičné úlohy',
    description: 'Sada cvičení rastúcej náročnosti na precvičenie učiva.',
    prompt: 'Vytvor 10 cvičných úloh z témy [Téma] pre [ročník] ročník. Rozdeľ ich do 3 úrovní: 4 ľahké (reprodukcia), 4 stredné (pochopenie), 2 ťažké (aplikácia). Pri každej úlohe uveď zadanie a riešenie.',
    sourcePath: '/jednotlive_usecases/aktivity_na_hodinu/cvicne_ulohy/cvicne_ulohy'
  },
  {
    id: 'flashcardy',
    category: 'Aktivity na hodinu',
    title: 'Flashcards z učiva',
    description: 'Kartičky pojem–definícia pre rýchle opakovanie.',
    prompt: 'Z nasledujúceho textu vytvor 15 flashcards vo formáte „Pojem — Definícia v jednej vete“. Definície majú byť zrozumiteľné pre [ročník] ročník. Pridaj kategóriu k pojmu, aby som vedel kartičky filtrovať. Text: [vlož text].',
    sourcePath: '/jednotlive_usecases/aktivity_na_hodinu/flashcardy/flashcardy'
  },
  {
    id: 'gamifikacia',
    category: 'Aktivity na hodinu',
    title: 'Gamifikácia hodiny',
    description: 'Hrový dizajn pre 45-minútovú vyučovaciu hodinu.',
    prompt: 'Navrhni gamifikovaný priebeh 45-minútovej hodiny [Predmet] na tému [Téma] pre [ročník] ročník. Použi prvky: bodovanie, tímy, achievementy, mini-bossfight. Vysvetli pravidlá, časový rozvrh a ako merať úspech. Drž sa pedagogického cieľa, nie len zábavy.',
    sourcePath: '/jednotlive_usecases/aktivity_na_hodinu/gamifikacia/gamifikacia'
  },
  {
    id: 'laboratorne-prace',
    category: 'Aktivity na hodinu',
    title: 'Laboratórna úloha',
    description: 'Bezpečný pokus s krok-po-kroku inštrukciami a otázkami.',
    prompt: 'Navrhni laboratórnu úlohu z [Predmet] na tému [Téma] pre [ročník] ročník. Štruktúra: 1) cieľ pokusu, 2) potrebné pomôcky (dostupné v škole), 3) bezpečnostné pravidlá, 4) postup v 6 krokoch, 5) tabuľka na záznam pozorovaní, 6) 3 otázky na vyhodnotenie. Tón: jasný, žiakovi-priateľský.',
    sourcePath: '/jednotlive_usecases/aktivity_na_hodinu/laboratorne_prace/laboratorne_prace'
  },
  {
    id: 'pracovne-listy',
    category: 'Aktivity na hodinu',
    title: 'Diferencovaný pracovný list',
    description: 'Pracovný list v troch úrovniach náročnosti.',
    prompt: 'Vytvor pracovný list na tému [Téma] pre [ročník] ročník v troch verziách: A) základná (zameraná na reprodukciu), B) štandardná (s aplikáciou), C) rozširujúca (s analýzou). Každá verzia obsahuje 6 úloh. Na konci uveď kľúč pre všetky verzie.',
    sourcePath: '/jednotlive_usecases/aktivity_na_hodinu/pracovne_listy/pracovne_listy'
  },
  {
    id: 'projektove-vyucovanie',
    category: 'Aktivity na hodinu',
    title: 'Projektové vyučovanie',
    description: 'Plán 4-týždňového projektu so žiakmi.',
    prompt: 'Navrhni 4-týždňový projektový plán z [Predmet] na tému [Téma] pre [ročník] ročník. Štruktúra: 1) cieľová otázka, 2) výstup (artefakt), 3) týždenný harmonogram, 4) deľba úloh v tíme, 5) priebežné míľniky, 6) hodnotiaca rubrika. Drž sa princípu „student voice & choice“.',
    sourcePath: '/jednotlive_usecases/aktivity_na_hodinu/projektove_vyucovanie/projektove_vyucovanie'
  },

  // Sumarizácia učiva
  {
    id: 'sumarizacia-poznamok',
    category: 'Sumarizácia učiva',
    title: 'Zhrnutie kapitoly',
    description: 'Dlhý text do 5–7 prehľadných bodov.',
    prompt: 'Zhrň nasledujúci text do 5–7 odrážok tak, aby mu rozumel žiak [ročník] ročník. Každá odrážka jedna veta, žiadne odborné pojmy bez vysvetlenia. Na konci uveď 3 kľúčové pojmy, ktoré si žiak musí zapamätať. Text: [vlož text].',
    sourcePath: '/jednotlive_usecases/sumarizacia_uciva/sumarizacia_poznamok/sumarizacia_poznamok'
  },
  {
    id: 'sumarizacny-podcast',
    category: 'Sumarizácia učiva',
    title: 'Skript pre sumarizačný podcast',
    description: 'Dialóg dvoch moderátorov, ktorý zhrnie kapitolu.',
    prompt: 'Pôsob ako scenárista vzdelávacieho podcastu. Vytvor 5-minútový dialóg medzi moderátormi „Ema“ a „Tomáš“, ktorý zhrnie tému [Téma] pre [ročník] ročník. Striedanie replík, prirodzený rozhovor, na záver kvízová otázka. Začni intro znelkou a uveď, ktoré poznámky/kapitolu zhŕňate.',
    sourcePath: '/jednotlive_usecases/sumarizacia_uciva/sumarizacny_podcast/sumarizacny_podcast'
  },
  {
    id: 'vytvorenie-cheatsheetu',
    category: 'Sumarizácia učiva',
    title: 'Ťahák pre žiakov',
    description: 'Stručný prehľad na jednu A4.',
    prompt: 'Z nasledujúcich poznámok vytvor ťahák pre [ročník] ročník na jednu stranu A4. Štruktúra: a) hlavné pojmy v boxoch, b) najdôležitejšie vzorce/pravidlá, c) typický príklad s riešením, d) 3 časté chyby. Tón: priateľský, povzbudzujúci. Poznámky: [vlož text].',
    sourcePath: '/jednotlive_usecases/sumarizacia_uciva/vytvorenie_cheatsheetu/vytvorenie_cheatsheetu'
  },

  // Tvorba materiálov
  {
    id: 'generovanie-obrazkov',
    category: 'Tvorba materiálov',
    title: 'Obrázok pre hodinu',
    description: 'Detailný prompt na AI generátor obrázkov.',
    prompt: 'Vytvor prompt na AI generátor obrázkov: predmet = [Téma napr. Fotosyntéza, Pyramída v Gíze], štýl = [3D ilustrácia / akvarel / pixel art], kompozícia = [pohľad zhora / izometrický], svetlo = [jemné štúdiové], detaily = [popísané štítky v slovenčine, žiadny text v cudzom jazyku]. Pridaj negatívny prompt: žiadne ľudské tváre, žiadne logá.',
    sourcePath: '/jednotlive_usecases/tvorba_materialov/generovanie_obrazkov/generovanie_obrazkov'
  },
  {
    id: 'preklad-uciva',
    category: 'Tvorba materiálov',
    title: 'Preklad učiva',
    description: 'Lokalizovaný preklad zachovávajúci pedagogický kontext.',
    prompt: 'Prelož nasledujúci učebný text z [Jazyk] do slovenčiny pre [ročník] ročník. Pravidlá: 1) zachovaj odborné pojmy v slovenskom úze, 2) prispôsob príklady slovenskej realite (mená, mesta, meny), 3) jazyk primeraný veku. Na konci uveď zoznam pojmov, ktoré som mal zámerne ponechať v origináli (napr. „prompt“, „LLM“). Text: [vlož].',
    sourcePath: '/jednotlive_usecases/tvorba_materialov/preklad_uciva/preklad_uciva'
  },
  {
    id: 'tvorba-prezentacii',
    category: 'Tvorba materiálov',
    title: 'Štruktúra prezentácie',
    description: 'Osnova prezentácie snímka-po-snímke s textom pre učiteľa.',
    prompt: 'Pôsob ako profesionálny dizajnér prezentácií. Z nasledujúcich overených faktov vytvor osnovu 10-snímkovej prezentácie. Formát pre každú snímku: **Snímka N:** Názov | Max. 3 odrážky (text na obrazovke) | Poznámky pre učiteľa (3 vety, čo má povedať). Nepridávaj fakty navyše. Fakty: [vlož text].',
    sourcePath: '/jednotlive_usecases/tvorba_materialov/prezentacie/tvorba_prezentacii'
  }
]
