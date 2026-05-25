# Feature: Learning Progress Tracking

## Design
The learning progress tracking feature is designed as a visual progress widget and checklist located in the **right-hand sidebar** of every guide page[cite: 1]. On smaller mobile viewports, this panel collapses into a sticky bottom-bar accordion that the user can tap to expand[cite: 1].

Key visual elements[cite: 1]:
- A **circular progress ring** at the top of the widget, displaying the overall completion percentage for the current learning path (e.g., *"45% Complete"*). The ring dynamically fills with a vibrant green color as tasks are completed[cite: 1].
- A **vertical checklist** below the progress ring, listing all milestones or sub-tasks required to master the specific guide[cite: 1].
- Each item in the list features a **custom checkbox** on the left side. Unchecked items have a subtle gray border; checked items turn solid green with a white checkmark icon, the text opacity is slightly reduced, and a strikethrough effect is applied[cite: 1].
- A **"Mark as Complete" button** sits at the very bottom of the widget, serving as the primary call-to-action (CTA) to fully finish the entire guide[cite: 1].
- On hover, checklist items display a soft gray background highlight to indicate interactivity[cite: 1].

## Functionality
The primary purpose of this feature is to give users a clear overview of their advancement, helping them resume their learning journey exactly where they left off, and track their mastery of individual topics[cite: 1].

Behavior and logic[cite: 1]:
- **Inputs:** User interactions – specifically checking/unchecking milestone boxes or clicking the "Mark as Complete" button[cite: 1].
- **Data Persistence:** Progress state is automatically synced with the user's account in real-time. For guest (unauthenticated) users, progress is saved locally using browser `localStorage`[cite: 1].
- **Outputs:** Updated completion percentages, a dynamically recalculated progress ring, and updated visual states for the checklist items[cite: 1].
- **Milestone Weighting:** Each checked box uniformly increases the overall percentage of the current chapter. Clicking the final "Mark as Complete" button marks the entire guide as finished and unlocks the next recommended guide in the roadmap sequence[cite: 1].
- **Confetti Celebration:** When a user completes a major milestone or reaches 100% completion in a guide, a brief canvas-based confetti animation triggers across the screen as a reward for their effort[cite: 1].

States[cite: 1]:
- **Not Started (Empty state):** The progress ring sits at 0% and all checkboxes are empty[cite: 1].
- **In Progress:** A portion of the checkboxes are ticked; the ring displays the calculated percentage[cite: 1].
- **Completed:** The guide is fully finished, showing 100% completion, and the primary button is replaced by a permanent "Completed" badge[cite: 1].
- **Syncing / Loading:** A small three-dots loading animation appears next to the percentage text while progress is being saved to the server[cite: 1].
- **Offline Mode:** If the network connection drops, progress is safely cached locally, and the application attempts to resend it automatically once the connection is restored. The user is notified by a subtle warning icon[cite: 1].

Dependencies and performance[cite: 1]:
- The feature is tightly integrated with the Roadmap system and the User Profile[cite: 1].
- API network requests are debounced (~500 ms) in case a user rapidly clicks multiple checkboxes in succession, preventing database overload[cite: 1].

## Example / Use Case
A teacher wants to track their progress through a complex module about Python programming[cite: 1]:

1. The teacher opens the guide titled *"Introduction to Variables in Python"*[cite: 1].
2. On the right side of the screen, they see the learning progress widget showing **0% Complete** and three items in the checklist[cite: 1].
3. After reading the first section and trying out the code, the teacher clicks the checkbox for the first milestone: *"Create your first variable"*[cite: 1].
4. The checkbox turns green, the text gets struck through, and the circular progress ring smoothly animates up to **33% Complete**. A sync icon flashes briefly and disappears[cite: 1].
5. The teacher closes the browser. When they return the next day, the widget instantly loads their saved **33%** progress, allowing them to confidently pick up right where they left off[cite: 1].