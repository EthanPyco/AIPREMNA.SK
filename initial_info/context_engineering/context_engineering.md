# Context Engineering Guide

## Goal
Context engineering is the deliberate practice of managing, structuring, and feeding background information, constraints, and environmental data to a Generative AI model before you give it a specific command. While prompt engineering focuses on the directive (the action), context engineering focuses on the boundary (the playground). It ensures the AI has a comprehensive understanding of the scenario, the data limits, and the exact persona it needs to adopt to deliver highly relevant and grounded responses.

### 🛠️ Recommended AI Tools
* **Gemini 1.5 Pro / Claude 3.5 Sonnet:** Excellent choices for context engineering because of their massive "context windows," which allow them to process hundreds of pages of reference material simultaneously without losing track of details.

---

## 🔄 The Step-by-Step Workflow

`[Isolate Core Data] ➔ [Establish Boundaries] ➔ [Inject Persona] ➔ [Structure Layout] ➔ [Execute Prompt]`

### Step 1: Isolate Core Data
Gather the exact text, documentation, database schemas, or transcripts the AI must use. This serves as the single source of truth.

### Step 2: Establish Boundaries (System Prompts)
Explicitly tell the AI what it is not allowed to look at or assume. For example, instruct it to say "I don't know" if the answer isn't in the provided text, effectively preventing AI hallucinations.

### Step 3: Inject the Persona and Objective
Define the operational environment. Is the AI a strict compliance auditor, a creative brainstorming partner, or a specific curriculum assistant?

---

## 💡 Key Elements of Context Engineering
When you engineer context, you are essentially building a temporary knowledge base for the AI. It relies on three major pillars:

* **The Context Window:** This is the AI's "working memory." Think of it as a desk space. Context engineering is the art of organizing the most important files on that desk so the AI doesn't have to guess or search its general memory.
* **Grounding:** This forces the AI to anchor its responses strictly within your provided data, preventing it from pulling irrelevant or incorrect information from the open internet.
* **Few-Shot Examples (In-Context Learning):** Providing 2 or 3 examples of a perfect output within the context section. The AI analyzes these patterns to mimic the exact structural style you expect.

---

## ✍️ Context Engineering Section

### Prompt Template:
> **### SYSTEM OPERATING ENVIRONMENT ###**
> * **[Persona]:** You are operating strictly as a [Specific Role].
> * **[Knowledge Boundary]:** Your knowledge for this session is restricted entirely to the text provided below. If a user asks a question that cannot be answered using only the provided text, reply with: "This information is outside the scope of the provided context."
> 
> **### REFERENCE MATERIAL ###**
> `[Paste Articles, Data, Guidelines, or Code here]`
> 
> **### OUTPUT FORMAT ###**
> All responses must match this structure: `[Define template, e.g., Bulleted summary followed by a table].`
> 
> ---
> **[Prompt/Directive]:** "Now, analyze the reference material and..."

### Example Prompt:
> **### SYSTEM OPERATING ENVIRONMENT ###**
> You are a strict legal compliance bot for Company X. You only know our internal remote-work policy. Do not use external labor laws or general knowledge.
> 
> **### REFERENCE MATERIAL ###**
> `[Pasted 4-page PDF of Company X's 2026 Remote Work Policy]`
> 
> **### OUTPUT FORMAT ###**
> State the policy ruling clearly, followed by the exact section number referenced.
> 
> ---
> **User Query:** "Can I work remotely from Spain for two weeks?"

---

## ⚠️ The "Human-in-the-Loop" Review Checklist
* **Context Stuffing:** Be careful not to overload the AI with irrelevant data. Just because a model can accept a massive document doesn't mean it needs the boilerplate introductory text. Clean your data first.
* **Information Retrieval Check:** Verify that the AI is actually reading the middle sections of your context. Some models suffer from "lost in the middle" syndrome, prioritizing the very beginning and end of long texts.
* **Data Privacy:** Never engineer context using proprietary company code, trade secrets, or protected personal student/client data unless you are using a secure, enterprise-grade private AI environment.

---

## ✅ How to Know You Have Understood This Guide
By the end of this guide, you should be able to:
* Successfully write a "grounding clause" that stops an AI from guessing answers.
* Structure a multi-page document into clean Markdown headers so the AI can navigate the context efficiently.
* Distinguish between a Prompt (e.g., "Summarize this") and Context (e.g., the 50-page report attached).