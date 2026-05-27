# AIPREMNA.SK Implementation Prompt

Act as a Senior Full-Stack Developer specializing in Vue.js, Nuxt, and modern frontend architecture. Your task is to implement the **AIPREMNA.SK** platform—a comprehensive educational roadmap for Slovak teachers integrating AI into their workflows.

## 1. Project Overview & Mission
**AIPREMNA.SK** is an interactive 3-tier roadmap. It guides educators from basic AI fundamentals to specific use cases and tools. 
- **Core Value:** Reclaiming teacher time through AI as a "Co-pilot."
- **Language:** The UI and all content must be in **Slovak**.
- **Data Privacy:** "No-account" experience using `localStorage` for all persistence.

## 2. Technical Stack
- **Framework:** Nuxt (SSG mode) or VitePress for high-performance static generation.
- **Styling:** TailwindCSS for a clean, modern, and professional look.
- **Tree Navigation:** `Vue Flow` to render the interactive roadmap.
- **Search:** `FlexSearch` for fast, client-side full-text search across all Markdown content.
- **Hosting:** Vercel.

## 3. Data Hierarchy & Structure
The site structure is derived from the project's folder hierarchy:
1.  **Root (Foundation):** `initial_info/`
    - Contains must-know knowledge (Ethics, GDPR, Prompting).
2.  **Tier 2 (Categories & Use Cases):** `jednotlive_usecases/`
    - Folders are **Categories** (labels only).
    - `.md` files are **Leaf Nodes** (clickable).
3.  **Tier 3 (Specialized Tools):** `jednotlive_tools/`
    - Folders are **Categories** (labels only).
    - `.md` files are **Leaf Nodes** (clickable).

## 4. Feature: The Interactive Tree Roadmap
- Implement a visual graph using `Vue Flow`.
- **Nodes:**
    - **Category Nodes:** Styled as labels/groupings. Non-clickable.
    - **Leaf Nodes:** Styled as interactive "Learning Cards." Clickable.
- **Edges:** Draw connections based on the hierarchy (Foundation -> Use Case Categories -> Leaf Nodes).
- **Navigation:** Clicking a Leaf Node opens its content in a "Learning Card" popup.

## 5. Feature: Learning Card System
- **Pop-up Design:** When a node is clicked, the Learning Card appears on top of the homepage as a modal/overlay.
- **URL Synchronization:** Open cards must reflect in the URL via query parameters (e.g., `?card=pisanie-emailu`) for linkability and "Back" button support.
- **Content Conversion:** Automatically convert Markdown files into rich static components.
- **UI Elements inside Card:**
    - **Prompt Windows:** Styled like GitHub code snippets with a "Copy to Clipboard" button. These are for AI prompts.
    - **Asset Handling:** Images must be scoped to their respective cards and handled responsively.

## 6. Feature: Progress Tracking
- **Individual Tracking:** Progress is tracked per Leaf Node.
- **Two Levels of Engagement:**
    1. **Seen:** Marked "In Progress" as soon as a card is opened.
    2. **Mastery:** Calculated by checkboxes in the "Learning Verification" section of the Markdown.
- **Sidebar/Widget:**
    - **Circular Progress Ring:** Shows % completion of the current card.
    - **Vertical Checklist:** Renders all items from the "Learning Verification" section.
    - **Persistence:** Save state to `localStorage`.
- **Visual Feedback:** Completed nodes in the Tree Graph should change color or display a checkmark.

## 7. Feature: Global Search
- Implement a search bar using `FlexSearch`.
- **Scope:** Full-text search across the raw Markdown content of all guides.
- **Behavior:**
    - Debounced search.
    - Highlight matches in results.
    - Clicking a search result opens the corresponding Learning Card.

## 8. Implementation Details
- **Markdown Processing:** Ensure the build process extracts checklist items from the "Learning Verification" section to populate the progress tracker.
- **Slovak Localization:** All labels (e.g., "Hľadať", "Dokončené", "Kopírovať") must be in Slovak.
- **Performance:** Optimize for fast initial load and smooth graph interactions.

## 9. Visual Aesthetic
- Professional, clean, and educational.
- Interactive feedback (hovers, transitions) should feel "alive" and polished.
