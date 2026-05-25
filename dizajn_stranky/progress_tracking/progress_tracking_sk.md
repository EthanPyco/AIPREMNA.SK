# Feature: Learning Progress Tracking (Sledovanie pokroku v učení)

## Design
Funkcia sledovania pokroku v učení je navrhnutá ako vizuálny widget s pokrokom a zoznamom úloh (checklistom), ktorý sa nachádza v **pravom bočnom paneli** na každej stránke návodu. Na menších obrazovkách mobilných zariadení sa tento panel zbalí do fixnej spodnej lišty (akordeónu), ktorú môže používateľ kliknutím rozbaliť.

Hlavné vizuálne prvky:
- **Kruhový ukazovateľ pokroku** v hornej časti widgetu, ktorý zobrazuje celkové percento dokončenia pre aktuálnu cestu učenia (napr. *"45% Dokončené"*). Kruh sa dynamicky vypĺňa sýtozelenou farbou s pribúdajúcimi splnenými úlohami.
- **Vertikálny zoznam úloh** pod kruhovým ukazovateľom, ktorý obsahuje všetky míľniky alebo podúlohy potrebné na zvládnutie daného návodu.
- Každá položka v zozname obsahuje **vlastné zaškrtávacie políčko (checkbox)** na ľavej strane. Nezaškrtnuté položky majú jemný sivý okraj; zaškrtnuté položky sa zmenia na plnú zelenú farbu s bielou ikonou fajočky, text sa mierne stmaví (zníži sa opacita) a prečiarkne sa.
- **Tlačidlo „Označiť ako dokončené“** sa nachádza na samom spodku widgetu a slúži ako hlavná výzva k akcii (CTA) pre kompletné ukončenie celého návodu.
- Pri prejdení myšou (hover state) nad položkami zoznamu sa pozadie jemne zvýrazní sivou farbou, čo indikuje interaktivitu.

## Functionality
Hlavným účelom tejto funkcie je poskytnúť používateľom jasný prehľad o ich napredovaní, pomôcť im pokračovať v učení presne tam, kde naposledy skončili, a sledovať úroveň zvládnutia jednotlivých tém.

Správanie a logika:
- **Vstupy:** Interakcie používateľa – konkrétne zaškrtávanie/odškrtávanie políčok míľnikov alebo kliknutie na tlačidlo „Označiť ako dokončené“.
- **Ukladanie dát:** Stav pokroku sa automaticky synchronizuje s účtom používateľa v reálnom čase. Pri neprihlásených používateľoch (hosťoch) sa pokrok ukladá lokálne do prehliadača pomocou `localStorage`.
- **Výstupy:** Aktualizované percentá úspešnosti, dynamicky prepočítaný kruhový ukazovateľ a zmenený vizuálny stav položiek v zozname.
- **Váha míľnikov:** Každé zaškrtnuté políčko rovnomerne zvyšuje celkové percento danej kapitoly. Zaškrtnutie finálneho tlačidla „Označiť ako dokončené“ označí celý návod za hotový a odomkne ďalší odporúčaný návod v poradí na mape (roadmap).
- **Konfetová oslava:** Keď používateľ dokončí dôležitý míľnik alebo dosiahne 100 % v návode, na obrazovke sa spustí krátka animácia padajúcich konfiet (cez HTML5 canvas) ako odmena za úsilie.

Stavy:
- **Nezačaté (Prázdny stav):** Ukazovateľ pokroku je na 0 % a všetky políčka sú prázdne.
- **Rozpracované:** Časť políčok je zaškrtnutá, kruh zobrazuje vypočítané percento.
- **Dokončené:** Návod je kompletne splnený, ukazuje 100 % dokončenie a hlavné tlačidlo je nahradené permanentným odznakom „Dokončené“.
- **Synchronizácia / Načítavanie:** Vedľa textu s percentami sa počas ukladania na server zobrazuje malá animácia troch bodiek.
- **Offline režim:** Ak vypadne internetové pripojenie, pokrok sa bezpečne uloží lokálne a aplikácia sa ho pokúsi odoslať hneď po obnovení na internet. Používateľ je na to upozornený malou ikonou varovania.

Závislosti a výkon:
- Funkcia je úzko prepojená so systémom mapy (Roadmap) a Používateľským profilom.
- Sieťové požiadavky na API sú debouncované (oneskorené o ~500 ms) pre prípad, že používateľ rýchlo za sebou nakliká viacero políčok, čím sa predchádza preťaženiu databázy.

## Example / Use Case
Učiteľ chce sledovať svoj pokrok v komplexnom module o programovaní v Pythone:

1. Učiteľ si otvorí návod s názvom *„Úvod do premenných v Pythone“*.
2. Na pravej strane obrazovky vidí widget sledovania pokroku, ktorý zobrazuje **0% Dokončené** a tri položky v zozname úloh.
3. Po prečítaní prvej sekcie a vyskúšaní kódu učiteľ klikne na políčko prvého míľnika: *„Vytvorenie prvej premennej“*.
4. Políčko zovrie na zeleno, text sa prečiarkne a kruhový ukazovateľ sa plynule animáciou posunie na **33% Dokončené**. Na okamih preblikne ikona synchronizácie a znova zmizne.
5. Učiteľ zavrie prehliadač. Keď sa na druhý deň vráti, widget okamžite načíta jeho uložený pokrok **33%**, takže môže sebavedomo pokračovať presne tam, kde skončil.