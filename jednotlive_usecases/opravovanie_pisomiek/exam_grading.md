# Optimized AI-Assisted Exam Grading Workflow

## 1. Purpose & Core Philosophy

This workflow leverages AI (specifically multimodal LLMs like ChatGPT, Claude, or Copilot) to accelerate the grading of handwritten exams, short-answer tests, and essays (including Slovak-language assignments).

**The Golden Rule:** AI proposes; the teacher disposes. The AI is your teaching assistant—it drafts the scores and feedback, but you retain final pedagogical and legal responsibility.

---

## 2. Privacy & GDPR Compliance (Non-Negotiable)

Before any image is uploaded to a commercial AI model:

* **Anonymize:** Fold back, cover, or digitally crop out student names, birthdates, and school IDs.
* **Identifier:** Use a simple numbering system on the page (e.g., *Student 01*, *Student 02*) to match the paper back to your gradebook.
* **Data Opt-Out:** In your AI account settings, turn off "Chat history & training" so your students' work isn't used to train future public models.

---

## 3. The Streamlined 5-Step Workflow

### Step 1: Prepare a "Bulletproof" Rubric

AI cannot read your mind. If your rubric is vague, the AI’s grading will be inconsistent.

* **Bad Rubric:** *Question 1 (5 points): Good explanation of photosynthesis.*
* **Good Rubric:** *Question 1 (5 points): Max 2 points for naming light/dark reactions; max 2 points for correctly identifying inputs/outputs ($H_2O$, $CO_2$, $O_2$); 1 point for correct Slovak scientific terminology (e.g., "fotosyntéza"). Deduct 0.5 points for minor factual errors.*

### Step 2: High-Efficiency Digitization

Don't just take casual phone pictures. Use a free scanning app (like **Adobe Scan**, **Microsoft Lens**, or the native iOS/Android Notes app scan feature).

* Scan to **PDF format** rather than individual JPEGs.
* Combine the pages of a single student into one PDF file named `Student_01.pdf`. This keeps the files organized and easier to drag-and-drop.

### Step 3: Establish the "Mega-Prompt" (The Anchor Chat)

Do **not** paste your rubric and rules over and over again for every student. Instead, open a brand-new chat session and "lock in" the rules first.

**Paste this exact prompt into the AI first:**

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

### Step 4: Batch Processing (The Assembly Line)

Once the AI replies that it is ready:

1. Drag and drop `Student_01.pdf` into the chat.
2. Type a simple command: `"Grade Student 01."`
3. Review the AI's output on your screen. Compare it directly to the physical paper or PDF.
4. Copy the scores into your Excel/Gradebook spreadsheet.
5. Drag and drop `Student_02.pdf`, type `"Grade Student 02."`, and repeat.

> 💡 **Pro-Tip:** If you notice the AI is being too lenient or too harsh on Student 01, immediately correct it (e.g., *"You were too soft on Question 2. If they miss the exact year, they must lose 1 full point. Re-grade Student 01 with this in mind."*). Once it adjusts, proceed to Student 02.

### Step 5: Verification and Final Polish

Before locking the grades into your official school portal (e.g., EduPage):

* Double-check any questions where the AI flagged "unclear handwriting."
* Scan the generated Slovak feedback to ensure the tone is encouraging and grammatically natural.
