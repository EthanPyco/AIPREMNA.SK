# AI Compliance & GDPR: A Safety Guide for Teachers

## Goal
Protect student privacy and ensure legal compliance with GDPR when using Artificial Intelligence in the classroom. This guide helps you transform AI into a safe assistant without risking sensitive data.

### 🛠️ Recommended AI Practices
* **Anonymization:** Replacing names and identifiers with neutral labels.
* **Data Minimization:** Only sharing the absolute minimum information necessary for the task.
* **Tool Verification:** Checking if the tool is approved by your school or institution.
* **Settings Management:** Disabling data training in AI tool settings.

---

## 🔄 GDPR compliant workflow

`Identify Data Type` ➔ `Anonymize/Clean` ➔ `Check Tool Settings` ➔ `Generate & Verify`

### Step 1: Identify the Data Type
Before pasting anything into an AI, ask: "Does this contain Personal Identifiable Information (PII)?"
* **Examples of PII:** Names, birth dates, IDs, home addresses, specific medical conditions, or photos of students.

### Step 2: Anonymize and Clean
If you need to process student-related data (e.g., grading an essay or summarizing feedback), remove all PII.
* **Bad:** "Feedback for Peter Kovac, 7th grade, who has ADHD."
* **Good:** "Feedback for Student A, 7th grade."

### Step 3: Configure Privacy Settings
Most AI tools (like ChatGPT or Claude) use your data to train their models by default.
* **Action:** Go to Settings ➔ Data Controls and turn off "Chat History & Training" or use "Temporary Chat" modes.

---

## ✍️ Effective Prompting for Privacy

### Prompt Template for Safe Interaction:
> "I will provide you with [Anonymized Content]. I want you to [Task] for [Target Audience]. Do not include any sensitive information in the output. Style: [Desired Tone]."

### Example Prompt (Safe Grading):
> "I will provide an anonymized essay from a 9th-grade student. Provide constructive feedback on grammar and structure. Refer to the author only as 'the student'."

---

## ⚠️ The "Human-in-the-Loop" Review Checklist
* **Zero PII Policy:** Confirm that no real names or identifiers were leaked into the prompt.
* **Output Sanitization:** Ensure the AI didn't hallucinate or re-identify individuals based on context.
* **Storage Check:** Avoid saving sensitive AI outputs in non-encrypted local files.
* **Privacy Warning:** AI is not a "black box"—anything you type might be seen by human reviewers at the AI company.

---

## ✅ How to Know You Have Understood This Guide
By the end of this guide, you should be able to:
* Identify which student data is prohibited from AI prompts.
* Correctly anonymize a list of students for a grading task.
* Locate and disable "training" settings in at least one AI tool.

---

## 🚀 Optional Extensions
* **Enterprise Versions:** Ask your school about "Enterprise" or "Education" versions of AI tools (like Microsoft Copilot with Commercial Data Protection), which offer much higher privacy standards.
