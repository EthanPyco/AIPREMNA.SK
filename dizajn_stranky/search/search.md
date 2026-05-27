# Feature: Search

## Design
The search feature is presented as a single search input field placed in the
**top-center area of the screen**. The field is consistently visible across
all pages of the application so users can reach it from anywhere without
navigation.

Key visual elements:
- A **magnifying-glass icon** on the left side of the input, indicating its
  purpose.
- A **placeholder text** (e.g., *"Search guides..."*) shown when the field
  is empty.
- A **clear (✕) button** that appears on the right side of the field once
  the user has typed at least one character; clicking it empties the input
  and closes the results dropdown.
- On focus, the field **expands slightly** and gains a subtle **shadow /
  outline** to indicate the active state.
- A **results dropdown** opens directly below the input as soon as the user
  starts typing. Each result row shows the guide's title and a short
  snippet of matching content, with the matched substring **highlighted**
  (bold text on a soft yellow background).
- The component is **responsive**: on smaller screens the field shrinks to
  fit the available width while remaining horizontally centered.

## Functionality
The primary purpose of the search is to let users quickly locate any guide
that mentions a given term, without having to browse the roadmap manually.

Behavior:
- **Input:** Any free-text string typed by the user into the search field.
- **Query scope:** The entered text is matched against the content of
  **all guides** available in the application. This includes:
  - Guide titles and body text.
  - **Prompt templates** (static text blocks designed for copy-pasting).
  - **Learning Verification checklists**.
- **Output:** A dropdown list of matching guides, each with:
  - the guide title,
  - a short excerpt containing the matched term,
  - the matched substring **highlighted** within the excerpt.
- **Live search:** The query runs on every keystroke with **debouncing
  (~250 ms)** to avoid unnecessary work and to keep the UI responsive.
- **Case-insensitive matching:** The search ignores letter casing
  (`Email`, `email`, and `EMAIL` all return the same results).
- **Navigation:** Clicking a result navigates the user to the corresponding
  guide page; pressing `Enter` selects the first result.

States:
- **Empty (idle):** No input — dropdown is hidden.
- **Loading:** A subtle spinner is shown inside the input while results
  are being fetched.
- **Results:** The dropdown lists matching guides with highlighted terms.
- **No results:** An empty-state message (e.g., *"No guides match your
  query."*) is displayed inside the dropdown.
- **Error:** If the search request fails, an inline error message
  (e.g., *"Search is temporarily unavailable."*) is shown.

Dependencies and performance:
- Depends on the guides content source (the same data that powers the
  roadmap and guide pages).
- Uses debouncing to limit requests and may cache recent queries on the
  client to make repeated searches instant.

## Example / Use Case
A teacher wants to find a guide about writing emails with the help of AI:

1. The teacher opens the application — the search field is already
   visible at the **top center** of the screen.
2. The teacher clicks the search field; it expands and gains a subtle
   shadow indicating focus.
3. The teacher types `email`.
4. After ~250 ms, a dropdown appears below the input listing all guides
   that mention "email", with the word **`email`** highlighted in each
   result snippet (e.g., a guide titled *"Writing emails with Gemini"*
   and another titled *"Email correspondence with parents"*).
5. The teacher clicks the most relevant result and is navigated directly
   to that guide, ready to follow its steps.