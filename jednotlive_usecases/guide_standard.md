# Standardized Guide for Creating AI Implementation Guidelines for Teachers

This document serves as a master template and structural guide for generating new use-case Markdown files. These files are designed to help educators integrate AI into their specific workflows (e.g., lesson planning, administrative tasks, student engagement).

---

## 1. Document Structure & Essential Components

Every new guideline should follow this specific order to maintain consistency across the project. Use the following headers and sections:

### A. Title & Goal
*   **Title:** Clear and action-oriented (e.g., "AI-Powered [Task]: A Guide for Teachers").
*   **Goal:** A 2-3 sentence summary of the value proposition. Focus on time saved and pedagogical impact.

### B. 🛠️ Recommended AI Tools
List 2-4 specific tools. Categorize them if possible (e.g., General LLMs vs. Specialized Tools).
*   *Example:* ChatGPT/Claude for text, Canva Magic Media for images, DeepL for translation.

### C. 🔄 The Step-by-Step Workflow
Provide a high-level visual flow followed by detailed explanations.
*   **Visual Flow:** Use the arrow format: `[Task A] ➔ [Task B] ➔ [Task C]`.
*   **Detailed Steps:** Break the process down into 3-4 logical phases (e.g., Preparation, Prompting, Refining).

### D. ✍️ Prompt Engineering Section
This is the "engine" of the guide.
*   **The Prompt Template:** Provide a structural "fill-in-the-blanks" skeleton.
*   **Example Prompt:** A concrete, copy-pasteable example related to a specific subject (e.g., Biology, History).
*   **Calibration Tips:** How to adjust the output (e.g., "Make it simpler for 5th graders").

### E. ⚠️ The "Human-in-the-Loop" Review Checklist
A mandatory section focusing on safety, accuracy, and ethics.
*   Check for hallucinations (incorrect facts).
*   Check for tone/voice alignment.
*   **Privacy Warning:** Remind teachers never to input sensitive student data.

### F. ✅ Learning Verification (Topic Check)
A section titled "How to know you have understood the guide correctly." Provide a bulleted list of actions the teacher should be able to perform.

### G. 🚀 Optional Extensions
Advanced or "pro" tips for teachers who have mastered the basics (e.g., batch processing, creating bilingual versions).

---

## 2. Style & Tone Guidelines

*   **Audience:** Busy teachers. Use direct, encouraging, and professional language.
*   **Format:** Use Markdown features effectively (bolding for emphasis, blockquotes for prompts, icons for headers).
*   **Pedagogical Alignment:** Always frame the AI as an "Assistant" or "Co-pilot," never a replacement for the teacher's judgment.

---

## 3. Template Example (Copy-Paste Ready)

```markdown
# AI-Powered [Task Name]: A Guide for Teachers

## Goal
[Briefly explain how this helps teachers save time or improve student outcomes.]

### 🛠️ Recommended AI Tools
* **[Tool Name]:** [Short description of why it's used here.]
* **[Tool Name]:** [Short description.]

---

## 🔄 The Step-by-Step Workflow

`[Phase 1] ➔ [Phase 2] ➔ [Phase 3] ➔ [Final Review]`

### Step 1: [Name of Step]
[Description]

### Step 2: [Name of Step]
[Description]

---

## ✍️ Effective Prompting

### Prompt Template:
> "[Role/Context], I want you to [Task] for [Target Audience]. The output should include [Specific Requirements]. Style: [Desired Tone]."

### Example Prompt:
> "[Actual example content...]"

---

## ⚠️ The "Human-in-the-Loop" Review Checklist
* **Accuracy:** [Specific check]
* **Tone:** [Specific check]
* **Privacy:** Do not share sensitive student data.

---

## ✅ How to Know You Have Understood This Guide
By the end of this guide, you should be able to:
* [Actionable outcome 1]
* [Actionable outcome 2]

---

## 🚀 Optional Extension
[Describe an advanced use-case or related task.]
```

---

## 4. Summary of Existing Use-Cases

| File | Core Focus | Key Workflow Pattern |
| :--- | :--- | :--- |
| `writing_email.md` | Admin/Communication | Goal Setting ➔ Tone Selection ➔ AI Draft ➔ Review |
| `exam_grading.md` | Assessment/Feedback | Rubric Prep ➔ Digitization ➔ Mega-Prompt ➔ Batch Process |
| `creating_worksheets.md` | Content Creation | Source-First ➔ Question Gen ➔ Parallel Key Gen |
| `translating_curriculum.md` | Localization | Contextualize ➔ Translate ➔ Refine/Localize |
| `generating_images.md` | Visuals/Diagrams | Subject + Style ➔ Composition ➔ Review Accuracy |
| `podcast_summaries.md` | Audio/Media | Audio-to-Text ➔ Summarize ➔ Activity Gen |
| `creating_cheatsheet.md` | Study Aids | Extract ➔ Format ➔ Simplify |
| `exams.md` | Testing | Text-to-Quiz ➔ Variations (Group A/B) ➔ Mix Types |
