# Feature: Learning Progress Tracking

## Design
The learning progress tracking feature is designed as a visual progress widget and checklist located in the **right-hand sidebar** of every guide page. On smaller mobile viewports, this panel collapses into a sticky bottom-bar accordion that the user can tap to expand.

Key visual elements:
- A **circular progress ring** at the top of the widget, displaying the overall completion percentage for the current learning path (e.g., *"45% Complete"*). The ring dynamically fills with a vibrant green color as tasks are completed.
- A **vertical checklist** below the progress ring, listing all milestones or sub-tasks required to master the specific guide.
- Each item in the list features a **custom checkbox** on the left side. Unchecked items have a subtle gray border; checked items turn solid green with a white checkmark icon, the text opacity is slightly reduced, and a strikethrough effect is applied.
- A **"Mark as Complete" button** sits at the very bottom of the widget, serving as the primary call-to-action (CTA) to fully finish the entire guide.
- On hover, checklist items display a soft gray background highlight to indicate interactivity.

## Functionality
The primary purpose of this feature is to give users a clear overview of their advancement, helping them resume their learning journey exactly where they left off, and track their mastery of individual topics.

Behavior and logic:
- **Inputs:** User interactions – specifically opening a guide, checking/unchecking boxes in the "Learning Verification" section, or clicking the "Mark as Complete" button.
- **Data Persistence:** All progress is saved locally using browser `localStorage`. No server-side storage or user accounts are used.
- **Outputs:** Updated completion percentages, a dynamically recalculated progress ring, and updated visual states for the checklist items.
- **State Logic:**
    - **In Progress:** Triggered automatically when a guide is first opened.
    - **Mastery:** Each checked box in the "Learning Verification" checklist increases the overall percentage.
    - **Completed:** Marked when all checklist items are ticked or the "Mark as Complete" button is pressed.
- **Prompts:** All prompt templates displayed within guides are **static text** designed for easy selection and manual copying.

States:
- **Not Started (Empty state):** The guide has never been opened.
- **Opened (Just Started):** The guide has been viewed but no items are checked. The progress ring shows a "Seen" status or 0%.
- **In Progress:** A portion of the checkboxes are ticked; the ring displays the calculated percentage.
- **Completed:** The guide is fully finished, showing 100% completion.
- **Offline Mode:** Since all data is stored in `localStorage`, the feature works fully offline by default.

Dependencies and performance:
- The feature is tightly integrated with the Roadmap system.
- Since storage is local, updates are instantaneous with no network debouncing required.

## Example / Use Case
A teacher wants to track their progress through a complex module about Python programming:

1. The teacher opens the guide titled *"Introduction to Variables in Python"*.
2. On the right side of the screen, they see the learning progress widget showing **0% Complete** and three items in the checklist.
3. After reading the first section and trying out the code, the teacher clicks the checkbox for the first milestone: *"Create your first variable"*.
4. The checkbox turns green, the text gets struck through, and the circular progress ring smoothly animates up to **33% Complete**. A sync icon flashes briefly and disappears.
5. The teacher closes the browser. When they return the next day, the widget instantly loads their saved **33%** progress, allowing them to confidently pick up right where they left off.