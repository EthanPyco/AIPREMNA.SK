# Feature: Teachers' Cheatsheet

## Design
The Teachers' Cheatsheet is a dedicated, high-density reference page designed to give educators instant access to essential AI prompt formulas, quick tips, and critical "Do's and Don'ts" without needing to open full-length guides.

### Layout & placement
- **Location:** Accessible via a prominent "Cheatsheet" link in the main navigation bar or sidebar.
- **Header Area:** Features the page title, a short subtitle explaining its purpose, and a floating **"Print / Download PDF" button** with an icon in the top-right corner.
- **Grid Layout:** Content is organized into a responsive multi-column grid of compact **"Quick Cards"**, categorized by common teaching tasks (e.g., Lesson Planning, Grading & Feedback, Parent Communication, Administrative Tasks).
- **Search & Filter Bar:** Placed directly below the header, allowing teachers to quickly filter the cards by category tags or keywords.

### Quick Card UI Elements
- **Card Header:** Contains a category icon, a bold title, and a color-coded tag indicating the recommended AI tool or complexity level.
- **Content Body:** Uses high-contrast, compact typography. Contains short, bulleted tips and distinct **"Micro-Prompts"** enclosed in light grey code-like blocks.
- **Actions:** Every micro-prompt block features a small **"Copy" icon button** in its right corner. Hovering over a card subtly lifts it with a shadow effect to indicate interactivity.
- **Responsiveness:** On desktop, it displays as a 3-column grid. On tablets, it scales to 2 columns, and on mobile devices, it reflows into a single-column list with collapsible accordion sections for each category.

## Functionality
The primary purpose of the Cheatsheet is to serve as a fast, actionable "cheat sheet" for teachers during their busy workdays, enabling rapid prompt copying and quick safety verification.

### Core behaviors
- **Filtering & Search:** Typing in the cheatsheet search bar instantly hides non-matching cards using client-side fuzzy matching. Clicking a category tag isolates only the cards belonging to that category.
- **One-Click Copying:** Clicking the copy button next to any micro-prompt copies the raw text directly to the clipboard and triggers a brief "Copied!" tooltip feedback.
- **Print Optimization:** The page includes a custom CSS print stylesheet. When the user clicks "Print / Download PDF" (or presses `Ctrl+P`), the layout automatically strips out the navigation bars, sidebar, and search controls, formatting the grid into a clean, multi-page document optimized for physical printing or PDF saving.

### Inputs
- Static Markdown or JSON data defining the cheatsheet categories, tips, and prompt snippets.
- User search queries and active category filter selections.

### Outputs / side effects
- A filtered visual grid of quick-reference cards.
- Copied text strings in the system clipboard.
- A clean, print-ready document layout sent to the browser's native print dialog.

### States
- **Default/Idle:** Displays all categories and cards sorted by relevance or frequency of use.
- **Filtered:** Displays only the cards matching the selected tag or search string, with an option to "Clear Filters".
- **Copy Success:** Temporary visual state (1.5 seconds) showing a checkmark icon and updated text upon successful clipboard write.
- **Empty Search:** Shown when a search query returns no results, displaying a friendly message (e.g., "No quick tips found for that keyword. Try browsing categories below.") and a reset button.

### Edge cases
- **Clipboard Failures:** If browser security blocks the clipboard API, the text block automatically becomes fully selected, and a tooltip prompts the user to "Press Ctrl+C to copy".
- **Overflowing Text:** Long prompt formulas inside the compact cards are truncated with an ellipsis (`...`) or wrap cleanly without breaking the grid alignment.

### Dependencies
- Shared CSS utility classes for clipboard actions and tooltips.
- Global navigation links to ensure accessibility from any page within the application.

## Example / Use Case
A teacher needs to draft a quick email announcement to parents about an upcoming school trip during a 5-minute class recess:

1. The teacher clicks on **"Cheatsheet"** in the top navigation menu.
2. The grid of quick-reference cards loads instantly. Recognizing they need an email template, the teacher clicks the **"Communication"** category tag at the top of the page.
3. The grid dynamically filters down, showing only communication-related cards. The teacher finds the card titled *"Parent Update Generator"*.
4. Inside the card, they see a highly effective micro-prompt formula: `[Act as a supportive high school teacher. Draft a short, professional email to parents about [Event] on [Date]. Include details: [Details]. Tone: Welcoming.]`
5. The teacher clicks the **"Copy" button** inside the prompt block. The button changes to a green checkmark saying *"Copied!"*.
6. The teacher opens their email client or preferred AI tool, pastes the template, quickly replaces the bracketed placeholders with their specific trip details, and runs it.
7. Satisfied with how fast it worked, the teacher clicks the **"Print / Download PDF"** button at the top of the page to print out a physical copy of the cheatsheet to pin next to their desk.