# Feature: Header

## Design
The **Header** is a persistent global navigation bar fixed to the top of the viewport. It serves as the primary gateway to the application's core utilities and search functionality.

### Layout & Elements (Left to Right)
1.  **Logo:** Located on the far left. It features the "AiPremna" visual (a combination brain and book icon) with the text "AI PREMNA / AI PRE NÁS". This element functions as a link to the homepage.
2.  **Ťahák promptov (Prompt Cheatsheet):** A text link accompanied by a clipboard or "bag" icon. Maps to the `cheatsheet` module.
3.  **Naposledy otvorené (Recently Opened):** A text link accompanied by a clock icon. Maps to the `last_used` module.
4.  **Uložené (Saved/Bookmarks):** A text link accompanied by a bookmark icon. Maps to the `bookmarks` module.
5.  **Vyhľadávať (Search):** Located on the far right. A functional search bar containing a magnifying glass icon and placeholder text. Maps to the `search` module.

### Visual Styling
- **Positioning:** `sticky` or `fixed` at the top of the screen (`z-index` ensures it stays above page content but below modals like the Learning Card).
- **Background:** Solid white or neutral light background with a subtle bottom border or shadow to separate it from the main content area.
- **Typography:** Clean, professional sans-serif font. Active links or hovered items should show a visual indicator (e.g., color change or underline).
- **Responsiveness:** On smaller screens, the text links may collapse into a hamburger menu or icons-only view, while the logo and search bar remain prioritized.

## Functionality
The Header acts as the central hub for user navigation and tool access.

### Core Behaviors
- **Navigation:** Clicking any of the text links (Cheatsheet, Recently Opened, Bookmarks) redirects the user to the respective section or opens the corresponding overlay/drawer.
- **Search Integration:** The search bar allows users to query the entire guide database. As described in `search.md`, it should support debounced input and show results in a dropdown.
- **Home Trigger:** Clicking the Logo resets the application state to the primary dashboard or roadmap.
- **State Persistence:** The header reflects global states, such as the number of items in "Uložené" (Bookmarks) if a counter is implemented.

### Inputs
- User clicks on navigation links or the logo.
- Text input within the Search field.

### Outputs
- Navigation to different application routes.
- Triggering of the Search results dropdown.

### Dependencies
- **Logo:** References assets in the `/logo/` folder.
- **Cheatsheet:** Links to functionality defined in `cheatsheet.md`.
- **Last Used:** Links to functionality defined in `last_used.md`.
- **Bookmarks:** Links to functionality defined in `bookmarks.md`.
- **Search:** Integrates the UI and logic defined in `search.md`.

## Example / Use Case
A teacher is currently reading a guide about "AI-Powered Email Writing" and wants to check their previously saved prompts:

1. **Navigating to Bookmarks:** The teacher looks at the header and clicks on the **"Uložené"** link (identified by the bookmark icon).
2. **System Response:** The application navigates the user to their personal bookmarks collection.
3. **Quick Search:** While in the bookmarks section, the teacher realizes they need a different tool. They move their cursor to the far right of the header.
4. **Using Search:** They type "Canva" into the **"Vyhľadávať"** field. The search dropdown appears immediately below the header.
5. **Returning Home:** After finding the information, the teacher clicks the **"AiPremna" logo** on the far left to return to the main roadmap view.

## Edge Cases
- **Search Overlap:** If the search dropdown is active, it must not be obscured by other page elements.
- **Long Link Names:** In the Slovak version, if navigation titles are too long for the available width, the layout must handle wrapping or truncation gracefully without breaking the logo or search bar placement.

---

## Reference Mappings
- **Logo** → `dizajn_stranky/logo/`
- **Ťahák promptov** → `dizajn_stranky/cheatsheet/cheatsheet.md`
- **Naposledy otvorené** → `dizajn_stranky/last_used/last_used.md`
- **Uložené** → `dizajn_stranky/bookmarks/bookmarks.md`
- **Vyhľadávať** → `dizajn_stranky/search/search.md`