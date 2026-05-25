# Feature Specification Standard

This document defines the standard structure for describing features in this project. Every feature specification file (e.g., `search.md`, `login.md`, `notifications.md`) **MUST** follow this template to ensure consistency across the codebase and to provide clear context for developers, designers, and AI assistants.

---

## 📋 Required Sections

Each feature `.md` file **MUST** contain the following three sections, in this order:

1. **Design** — Visual and UI/UX description
2. **Functionality** — Behavior and technical logic
3. **Example / Use Case** — A concrete scenario demonstrating the feature in action

---

## 1. Design

Describe **how the feature looks** and **where it is placed** in the user interface.

This section should answer:
- Where is the feature located on the screen? (e.g., top center, sidebar, modal)
- What UI elements does it consist of? (e.g., input field, button, dropdown)
- What is its visual styling? (e.g., colors, size, icons, highlights)
- How does it behave visually on interaction? (e.g., hover states, animations, focus)
- Is it responsive? How does it adapt to different screen sizes?

> **Tip:** Include references to design assets (Figma links, mockups) if available.

---

## 2. Functionality

Describe **what the feature does** and **how it works** under the hood.

This section should answer:
- What is the primary purpose of the feature?
- What inputs does it accept?
- What outputs or results does it produce?
- Which data sources or APIs does it interact with?
- What are the edge cases and error states?
- Are there any dependencies on other features?
- What are the performance considerations (e.g., debouncing, caching)?

> **Tip:** List all states the feature can be in (loading, empty, error, success).

---

## 3. Example / Use Case

Provide **at least one concrete scenario** that illustrates how the feature is used in practice.

This section should answer:
- What is the user trying to achieve?
- What steps do they take?
- What is the expected result?

> **Tip:** Use step-by-step lists or short narratives. Multiple use cases are encouraged when the feature serves different scenarios.

---

## 📄 Template

Copy and adapt the following template when creating a new feature specification:

```markdown
# Feature: <Feature Name>

## Design
<Describe placement, layout, UI elements, styling, and interactions.>

## Functionality
<Describe behavior, inputs, outputs, data flow, dependencies, and edge cases.>

## Example / Use Case
<Provide a step-by-step example demonstrating the feature in use.>
```


---

## ✅ Reference Example: `search.md`

Below is a complete example showing how the **Search** feature should be documented. Use it as a reference when writing your own feature specs.

```markdown
# Feature: Search

## Design
The search feature is presented as a search input field located in the
**top-center area of the screen**. The field is clearly visible across all
pages and includes a magnifying-glass icon on the left side and a clear (✕)
button on the right when text is entered. On focus, the field expands
slightly and shows a subtle shadow to indicate active state.

## Functionality
Any text typed into the search field is queried against the content of
**all guides** available in the application. Matching results are returned
in a dropdown below the input, and the matched text within each result is
**highlighted** (e.g., bold or with a yellow background). The search runs
on every keystroke with debouncing (~250 ms) to reduce unnecessary requests.
If no results are found, an empty-state message is shown. If a request
fails, an error message is displayed.

## Example / Use Case
A user wants to find a guide about writing emails:

1. The user clicks the search field in the top-center of the screen.
2. The user types `email`.
3. The dropdown displays all guides that mention "email", with the word
   `email` highlighted in each result.
4. The user clicks a result and is navigated to the corresponding guide.
```


---

## 📐 Conventions

- **Language:** All feature specifications must be written in **English**.
- **File naming:** Use lowercase, kebab-case names (e.g., `user-profile.md`, `password-reset.md`).
- **Location:** Place feature spec files in the `/dizajn_stranky/` directory (or the project's designated docs folder).
- **Headings:** Use the exact section names **Design**, **Functionality**, and **Example / Use Case** (level-2 headings `##`).
- **Optional sections:** You may add extra sections (e.g., *Accessibility*, *Analytics*, *Out of Scope*) **after** the three required ones, but never replace or skip the required sections.

---

*This standard ensures every feature in the project is described consistently and can be understood by any team member or AI assistant without additional context.*