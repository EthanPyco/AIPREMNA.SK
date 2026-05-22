# Prompt Engineering Guide

## Goal
Prompt engineering is the practice of structuring, refining, and designing inputs (prompts) to get the most accurate, relevant, and high-quality outputs from Generative AI models. Think of it as learning how to communicate effectively with an AI—knowing exactly how to phrase a request, what details to include, and what constraints to set so the AI delivers exactly what you need on the first try.

### 🛠️ Recommended AI Tools
* **Gemini / ChatGPT / Claude:** The primary text-based conversational models used to practice and apply prompt engineering techniques.

---

## 🔄 The Step-by-Step Workflow

`[Define Goal] ➔ [Assign Role] ➔ [Provide Context] ➔ [Set Constraints] ➔ [Refine & Iterate]`

### Step 1: Define the Goal
Clearly identify what you want the AI to create, analyze, or modify (e.g., write an email, debug code, summarize a report).

### Step 2: Assign a Role (Persona)
Give the AI a specific identity or perspective to ground its tone and expertise (e.g., "Act as a senior copywriter" or "You are a patient math tutor").

### Step 3: Provide Context & Data
Supply the necessary background information, reference texts, or data points the AI needs to work with to ensure accuracy.

### Step 4: Set Constraints & Formatting
Specify rules for the output, such as length, tone, structure, or what *not* to include (e.g., "Keep it under 200 words," "Format as a bulleted list," "Avoid corporate jargon").

---

## 💡 Core Techniques in Prompt Engineering

* **Zero-Shot Prompting:** Asking the AI to perform a task without giving it any examples. 
  * *Example:* "Translate this paragraph into French."
* **Few-Shot Prompting:** Providing the AI with one or more examples of the desired output style before asking it to complete the task. This is highly effective for complex formatting or specific tones.
* **Chain-of-Thought (CoT):** Instruction-based prompting that tells the AI to break down its reasoning step-by-step before giving the final answer. This drastically improves performance in logic, math, and problem-solving.

---

## ✍️ Prompt Engineering Section

### Prompt Template:
> "Act as an expert **[Role]**. I need you to **[Core Task]** based on the following information: **[Context/Data]**. 
> 
> Please follow these strict guidelines:
> * **Tone:** [e.g., Professional, empathetic, humorous]
> * **Format:** [e.g., Table, Markdown list, 3 short paragraphs]
> * **Constraints:** Do not include [e.g., fluff, technical jargon, specific words]."

### Example Prompt:
> "Act as a senior career coach. Review the draft job description below and generate a 3-bullet-point summary highlighting the core responsibilities. 
> 
> Draft: [Paste job description here]
> 
> Style: Action-oriented and professional. Ensure each bullet point starts with a strong action verb."

---

## ⚠️ The "Human-in-the-Loop" Review Checklist
* **Fact-Checking:** AI models can sometimes confidently state incorrect facts (hallucinations). Always verify data, dates, and critical information.
* **Biases and Tone:** Ensure the output aligns with your intended voice and does not introduce unintended assumptions or biases.
* **Prompt Optimization:** If the output isn't right, don't start over from scratch. Use follow-up prompts to guide the AI (e.g., "Make the tone warmer," or "Expand slightly on point number two").

---

## ✅ How to Know You Have Understood This Guide
By the end of this guide, you should be able to:
* Turn a vague, one-sentence prompt into a structured, multi-layered prompt that yields a superior first-time result.
* Use a "Few-Shot" technique to teach an AI a specific writing style or data format.
* Apply constraints to completely eliminate unwanted elements or formatting from an AI's response.