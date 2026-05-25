# Feature: Examples (Prompts + Explanation)

## Design
The Examples component is embedded directly within the guide pages, typically placed after a theoretical explanation or instructional steps. It acts as a distinct visual block to separate actionable AI prompts from standard reading content.

Key visual elements:
- **Container Box:** A styled card with a subtle background color (e.g., light gray or soft blue tint) and a left border highlight to make it stand out.
- **Prompt Header:** Displays a title (e.g., "Example Prompt: Parent Newsletter") and a **"Copy Prompt" button** with a clipboard icon in the top-right corner.
- **Prompt Text Block:** The actual prompt is styled in a clean, monospaced font or distinct typography block, making it clear that this text is meant to be copied and pasted. Variable placeholders within the prompt (e.g., `[Topic]`, `[Grade Level]`) are highlighted in a contrasting accent color.
- **Explanation Section:** Positioned directly below or adjacent to the prompt block. It uses structured typography (headings and bullet points) with small colored indicator dots or labels that map directly to sections of the prompt (e.g., a blue label for "Role", green for "Context").
- **Interactions:** Hovering over the "Copy" button changes its opacity/color. Clicking it briefly changes the text to "Copied! ✓". Hovering over an explanation segment subtly highlights the corresponding section in the prompt text.
- **Responsiveness:** On mobile screens, the layout stacks purely vertically, ensuring the prompt remains readable and easily selectable.

## Functionality
The primary purpose of this feature is to provide users with ready-to-use AI prompts alongside an educational breakdown, teaching them *why* the prompt is structured a certain way.

Behavior:
- **Input:** Static or dynamic prompt data and its corresponding explanation blocks loaded from the guide's content repository.
- **Copy to Clipboard:** Clicking the "Copy" button copies the exact text of the prompt to the user's device clipboard. 
- **Placeholder Detection:** The component parses specific markdown/syntax for placeholders (e.g., `[...]`) to style them dynamically, signaling to the user that these values need to be changed before running the prompt.
- **Interactive Highlighting:** (Optional/Advanced) The component binds hover events between the explanation bullet points and the prompt tokens to visually demonstrate prompt engineering techniques (e.g., separating the *Context*, *Task*, and *Constraints*).

States:
- **Default:** Displays the full prompt and its structural breakdown.
- **Copied Success:** Triggered immediately after clicking "Copy", changing the button icon/text for 2 seconds before reverting.
- **Clipboard Error:** If clipboard permissions are denied by the browser, the button changes to a warning state, and the text becomes manually selectable with a fallback message (e.g., "Press Ctrl+C to copy").

Dependencies and performance:
- Bound tightly to the rendering engine of the guide pages. 
- Lightweight execution with minimal JavaScript required for the clipboard API and hover triggers.

## Example / Use Case
A teacher is looking at a guide on how to generate personalized quiz questions using an AI assistant:

1. The teacher scrolls down the guide to the **Examples (Prompts + Explanation)** section.
2. They see a prompt box containing a structured prompt designed to generate multiple-choice biology questions.
3. Before copying, the teacher reads the **Explanation** below it, which explains that specifying the role (`"Act as a high school biology teacher"`) and the format constraints (`"Provide 4 options with an answer key at the bottom"`) ensures better AI output.
4. The teacher notices the highlighted placeholder `[Insert Topic Here]`.
5. The teacher clicks the **"Copy Prompt"** button, sees the "Copied! ✓" confirmation, and successfully pastes the template into Gemini, changing `[Insert Topic Here]` to `Photosynthesis`.