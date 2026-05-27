# AI-Powered Exam Grading: A Guide for Teachers

## Goal
Leverage multimodal AI to accelerate the grading of handwritten exams, short-answer tests, and essays. This workflow helps teachers provide faster, more detailed feedback while maintaining high grading consistency and reclaiming hours of administrative time.

### 🛠️ Recommended AI Tools
* **[ChatGPT (GPT-4o)](../../../jednotlive_tools/chatboti/chatgpt/chatgpt.md) / Claude 3.5 Sonnet:** Best-in-class for OCR (reading handwriting) and complex reasoning.
* **Microsoft Copilot:** A strong alternative with built-in data protection in many institutional environments.
* **Adobe Scan / Microsoft Lens:** Essential for high-quality mobile scanning to PDF.

---

## 🔄 The Step-by-Step Workflow

`[Prepare Rubric] ➔ [Digitize Exams] ➔ [Configure AI] ➔ [Batch Grade] ➔ [Review & Verify]`

### Step 1: Prepare a "Bulletproof" Rubric
AI requires clear boundaries. Instead of "Good explanation," use specific criteria like "Max 2 points for naming inputs/outputs (H2O, CO2)."

### Step 2: High-Efficiency Digitization
Use a scanning app to convert papers to PDF. Combine pages for each student into a single file (e.g., `Student_01.pdf`) to keep the process organized.

### Step 3: The "Mega-Prompt" Setup
Open a new chat and "lock in" your grading rules and rubric before uploading any papers. This ensures the AI applies the same standards to every student.

### Step 4: Batch Processing
Upload student PDFs one by one. Use a consistent command like "Grade Student 01" to trigger the pre-configured response format.

---

## ✍️ Prompt Engineering Section

### Prompt Template:
> "You are an expert teacher grading a [Subject] exam. I will upload student papers one by one.
> 
> **Rules:**
> 1. Follow this Rubric: [Paste Rubric]
> 2. Handwriting: If illegible, mark as [ILLEGIBLE].
> 3. Format: Return results as:
>    - **Student ID:** [ID]
>    - **Score:** [X]/[Total]
>    - **Deductions:** [Reason in Slovak/English]
>    - **Feedback:** [2 sentences for the student]
> 
> Reply with 'Ready' to begin."

### Example Prompt:
> "You are an expert high school biology teacher. Use the following rubric to grade the Photosynthesis test. If a student mentions 'chlorophyll' but misses the 'light-dependent' phase, deduct 1 point. [Rubric Content...] Reply with 'Ready' to begin."

---

## ⚠️ The "Human-in-the-Loop" Review Checklist
* **OCR Accuracy:** Double-check the AI's interpretation of messy handwriting or ambiguous symbols.
* **Consistency Check:** If the AI seems too lenient or harsh on the first few papers, provide a "course correction" prompt immediately.
* **Privacy Warning:** **MANDATORY:** Never upload student names or sensitive identifiers. Anonymize all papers (e.g., use "Student 01") and disable "Chat History & Training" in your AI settings to protect student data.

---

## ✅ How to Know You Have Understood This Guide
By the end of this guide, you should be able to:
* Create a detailed, point-based rubric that an AI can interpret consistently.
* Digitization: Scan and organize student work into clean, multi-page PDFs.
* Execute a "Mega-Prompt" strategy to maintain grading standards across a full class.
* Verify and adjust AI-generated feedback for tone and factual accuracy.
* Anonymize student data to comply with privacy regulations.

---

## 🚀 Optional Extensions
* **Spreadsheet Export:** Ask the AI to "Format the scores for Student 01-10 as a CSV table" to quickly copy-paste grades into your digital gradebook.
* **Common Mistakes Analysis:** After grading the whole class, ask the AI: "Based on all graded papers, what were the 3 most common misconceptions students had?"
