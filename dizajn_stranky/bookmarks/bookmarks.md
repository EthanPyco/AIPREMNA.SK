# Feature: Bookmarks

## Design
The bookmarks feature allows users to save and quickly access their favorite prompts, lessons, and other platform content. It consists of two main visual components: a trigger button on content items and a central management panel.

Key visual elements:
- **Bookmark Toggle Button:** A bookmark icon (ribbon/flag shape) placed in the top-right corner of every bookmarkable item (e.g., prompt cards, lesson headers). 
  - **Idle state:** An empty outline icon.
  - **Active state:** A filled icon using the primary brand color.
- **Navigation Link:** A bookmark icon with a counter (e.g., 🔖 5) located in the main sidebar/navigation menu, providing universal access.
- **Bookmarks Panel:** Clicking the navigation link opens a dedicated page or a sliding side-drawer containing the user's saved items.
- **Organization Tabs:** Inside the bookmarks panel, content is categorized into clear tabs: *"All"*, *"Prompts"*, *"Lessons"*, and *"Other"*.
- **Responsive design:** On mobile devices, the bookmark toggle remains easily tappable, and the central panel adapts into a full-screen view for better readability.

## Functionality
The primary purpose of the bookmarks feature is to let users create a personalized collection of important resources, eliminating the need to search for frequently used prompts or lessons.

Behavior:
- **Input:** Clicking the bookmark icon on any prompt or lesson toggles its saved status.
- **Categorization:** Saved items are automatically categorized based on their source entity type (`Prompt`, `Lesson`, etc.).
- **Output:** A dynamically updated list of bookmarked items inside the bookmarks panel, ordered chronologically by default (most recent first).
- **Instant sync:** Toggling a bookmark updates the UI state immediately on the client side, with asynchronous background syncing to the database.
- **Unbookmarking:** Users can remove an item from their bookmarks either directly from the content card or by clicking the 'Remove' option within the bookmarks panel.

States:
- **Empty (idle):** When a user has no bookmarked items, the panel displays a friendly empty state message (e.g., *"Your bookmark shelf is empty. Save prompts and lessons to see them here!"*) alongside a call-to-action button to browse content.
- **Loading:** A skeleton loader is shown inside the panel while the user's bookmarks are being fetched from the server.
- **Success:** The categorized list of saved items is rendered successfully.
- **Error:** If the bookmark sync fails due to network issues, a brief toast notification appears (e.g., *"Failed to save bookmark. Please try again."*) and the UI rolls back to the previous state.

Dependencies and performance:
- Depends on the User Authentication service (bookmarks are unique per user account).
- Requires a database table or collection mapping `user_id` to `content_id` and `content_type`.
- Optimistic UI updates are used to ensure that clicking the bookmark icon feels instant and lag-free.

## Example / Use Case
A student wants to save a complex prompt template and a specific lesson about AI engineering to review them later:

1. The student navigates to the *"Advanced Prompt Engineering"* lesson.
2. They click the empty bookmark icon in the lesson header. The icon immediately fills with color, and the sidebar counter changes from `0` to `1`.
3. Later, the student finds a useful prompt template within that lesson and clicks the bookmark icon on that specific prompt card. The counter changes to `2`.
4. Next week, the student logs in and wants to study those exact materials. They click the **Bookmarks** link in the main navigation menu.
5. The Bookmarks panel opens, showing both the lesson and the prompt. The student clicks the *"Prompts"* tab to filter out everything else, finds the saved prompt, and clicks it to start working immediately.