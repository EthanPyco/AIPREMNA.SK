# Naming Conventions and Project Structure

This document outlines the naming conventions and structure used in the **AIPREMNA.SK** project.

## 📁 Folder Naming
- All folder names must use **`snake_case`**.
- Folders should be named in **Slovak** to maintain consistency with the primary target audience.
- Example: `jednotlive_usecases`, `aktivity_na_hodinu`.

## 📄 File Naming
- All file names must use **`snake_case`**.
- Special characters (like accents) should generally be avoided in filenames for better compatibility, although some existing files may contain them. Prefer `generovanie_obrazkov.md` over `generovanie_obrázkov.md`.
- Example: `practice_questions.md`, `tvorba_pisomky.md`.

## 🇸🇰 Language and Translations
- **Mandatory Slovak Translation:** Every file intended for human users (not for internal AI processing or configuration) **must** have a Slovak translation.
- **Bilingual Content:** Most resources should exist in both Slovak and English.
- **Translation Naming:**
    - For general resources: Use the translated term in `snake_case`. No suffixes like `_en` or `_sk` are used. (Example: `pisanie_emailu.md` and `writing_email.md`).
    - For tool guides in `jednotlive_tools/`: Slovak translations must use the `_sk` suffix (Example: `chatgpt.md` and `chatgpt_sk.md`).
- **Single File Bilingualism:** In some cases (like `README.md`), both languages can be included in a single file, with English usually appearing first followed by the Slovak version.

## 🛠️ Tool-Specific Files
- Files intended strictly for AI use or internal configuration do not require a Slovak translation.
