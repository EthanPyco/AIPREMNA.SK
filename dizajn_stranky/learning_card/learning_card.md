# Feature: Learning Card

## Design
A **Learning Card** is the visual representation of a single guide stored
in `/jednotlive_usecases/` or `/jednotlive_tools/`. It is displayed as a
**modal popup** that opens on top of the current page with a dimmed
background overlay, focusing the user's attention on the content.

### Layout & placement
- Opens as a **centered popup window** over a semi-transparent backdrop.
- **Closes** when the user:
  - clicks **outside** the popup (on the backdrop), or
  - clicks the **✕ close button** in the **top-right corner** of the card.
- A **bookmark button** (e.g., a ribbon/star icon) is placed in the
  **top-right corner of the card**, next to the close button. Toggling
  it saves or removes the card from the user's bookmarks; the icon
  reflects the current state (filled = bookmarked, outlined = not
  bookmarked).
- The card has a scrollable body so long guides remain readable on
  smaller screens; the header (title + action buttons) stays sticky on
  top.

### Content structure (top → bottom)
1. **Title** — a **large, prominent heading** at the top of the card
   (the guide's name).
2. **Goal** — a short paragraph directly below the title summarizing the
   purpose of the guide ("Cieľ").
3. **Recommended AI tools** — a list of tools, each item containing:
   - the **tool name** (bold),
   - a **short description**,
   - and a **link** that navigates the user to that tool's dedicated
     page in `/jednotlive_tools/`.
4. **Step-by-step procedure** — a numbered/ordered list of steps. Any
   inline mini-flow expressed in brackets (e.g.
   `[Define goal] ➔ [Pick tone] ➔ [Draft with AI] ➔ [Review]`) is
   rendered as a **row of small boxes/chips**, visually separating each
   stage with arrows between them.
5. **Prompt examples** — each prompt is shown in a distinct quote-like
   block and has its **own bookmark button** in its corner, so users
   can save individual prompts independently of the whole card.
   Each prompt block also has a **copy-to-clipboard button** next to
   the bookmark icon, allowing users to copy the prompt text with a
   single click. After a successful copy, the button shows a brief
   confirmation state (e.g., a checkmark or *"Copied!"* tooltip).
   The same controls apply to **prompt templates** (e.g., the
   *"Prompt Template"* block), which are also bookmarkable and
   copyable.
6. **Checklist ("Human in the loop")** — visually **highlighted block**
   (e.g., colored background, warning icon) to draw attention to the
   critical review points.
7. **"How do you know you understood the guide" list** — rendered as
   **checkable items (checkboxes)**. The user's checked/unchecked state
   is persisted, so the card tracks **progress** per guide.
8. **Optional extension** — placed at the **bottom** of the card,
   visually **de-emphasized** (e.g., lighter background, smaller
   heading, slightly muted text) to indicate that it is supplementary
   content.

### Visual styling
- Rounded corners, soft shadow around the popup to lift it from the
  backdrop.
- Section dividers (thin horizontal rules) between the main blocks.
- Color accents follow the existing design system (icons for tools,
  steps, prompts, warnings, success).
- Smooth open/close animation (fade + slight scale).

## Functionality
The Learning Card renders the content of a single guide (a `.md` file
from `/jednotlive_usecases/` or `/jednotlive_tools/`) inside an
interactive popup with persistent user state.

### Core behaviors
- **Opening:** Triggered when the user activates a guide entry (e.g.,
  from the roadmap, search results, or "Last used").
- **Closing:** Triggered by clicking the backdrop or the ✕ button.
- **Tool links:** Each item in the recommended tools list links to the
  corresponding tool page in `/jednotlive_tools/`.
- **Bookmarking the whole card:** The top-right bookmark button toggles
  the card in the user's bookmarks collection. State is persisted
  across sessions.
- **Bookmarking individual prompts:** Each prompt example exposes its
  own bookmark control. Bookmarked prompts are stored separately so
  users can build a personal prompt library.
- **Copying prompts:** Every prompt example **and prompt template**
  exposes a **copy button** that places the prompt text into the
  user's clipboard. The button provides immediate visual feedback on
  success (checkmark / *"Copied!"* tooltip) and a fallback error
  state if the clipboard API is unavailable.
- **Progress tracking:** Each checkbox in the "How do you know you
  understood the guide" section is persisted per user and per guide.
  The overall progress (e.g., `4 / 6`) can be shown on the card and
  reused elsewhere in the app (roadmap progress, dashboard).
- **"Last used" tracking:** If the card remains open for **more than
  10 seconds**, the guide is automatically added to the user's
  **Last used** list. Closing the card sooner does **not** record it,
  which prevents accidental opens from polluting the history.

### Inputs
- The Markdown content of the underlying guide file (Slovak version preferred).
- The user's stored state in **LocalStorage**: bookmark flags (card-level and prompt-level) and checklist progress.

### Outputs / side effects
- Renders the styled, interactive popup.
- Updates bookmark state in the user's **LocalStorage**.
- Updates checklist progress in the user's **LocalStorage**.
- Appends the guide to **Last used** in **LocalStorage** when the 10-second threshold is reached.


### States
- **Loading:** Skeleton placeholders for title, sections and lists
  while the guide content is being fetched.
- **Loaded:** Fully rendered card with interactive elements enabled.
- **Error:** If the guide cannot be loaded, an inline error message is
  shown inside the popup with a retry action.
- **Bookmarked / not bookmarked:** Reflected by the icon state of the
  bookmark buttons (both card-level and prompt-level).
- **Progress:** Each checklist item is either checked or unchecked;
  the card may display an aggregated progress indicator.

### Edge cases
- Closing the card before the 10-second threshold must **not** add it
  to Last used.
- If the user re-opens an already bookmarked card, the bookmark icon
  must reflect the existing state immediately (no flicker).
- Optional extension section is hidden if the underlying guide does
  not provide it.
- Keyboard accessibility: `Esc` closes the popup, `Tab` cycles through
  interactive elements, focus is trapped inside the popup while it is
  open.

### Dependencies
- Guides content from `/jednotlive_usecases/` and `/jednotlive_tools/`.
- User state storage (bookmarks, prompt bookmarks, checklist progress,
  last used).
- Related features: **Search** (opens cards from results), **Last
  used**, **Bookmarks**.

## Example / Use Case
A teacher wants to learn how to write emails with AI and starts from
the search field:

1. The teacher types `email` into the search field and clicks the
   matching result *"Writing emails with AI"*.
2. A **Learning Card popup** opens centered on the screen with a
   dimmed background. The card shows a large title *"Writing emails
   with AI: A guide for teachers"* and, below it, the goal of the
   guide.
3. The teacher scans the **Recommended AI tools** section and clicks
   *"Gemini"*; the link navigates to the Gemini tool page in
   `/jednotlive_tools/`.
4. Returning to the card, the teacher reads the **step-by-step
   procedure**. The mini-flow
   `[Define goal] ➔ [Pick tone] ➔ [Draft with AI] ➔ [Review]` is
   rendered as four connected boxes.
5. In the **Prompt examples** section, the teacher finds a useful
   prompt and clicks its **bookmark icon** to save just that prompt
   for later. Next to the bookmark icon, the teacher clicks the
   **copy button**; the prompt text is copied to the clipboard and a
   *"Copied!"* tooltip briefly confirms the action. The teacher pastes
   the prompt directly into their preferred AI tool.
6. The teacher reviews the highlighted **"Human in the loop"**
   checklist (clearly emphasized so it is hard to miss).
7. At the bottom of the card, the teacher ticks off items in
   **"How do you know you understood the guide"**; the progress
   (`3 / 6`) is saved automatically.
8. The teacher also clicks the **bookmark button in the top-right
   corner** of the card to keep the whole guide for later reference.
9. Since the card was open for more than 10 seconds, the guide is
   automatically added to the **Last used** list.
10. The teacher closes the card by clicking outside of it (or the ✕
    button in the top-right corner) and returns to the roadmap.