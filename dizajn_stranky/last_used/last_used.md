# Feature: Last Used

## Design
**Last Used** is a dedicated section that lists the **Learning Cards**
(guides from `/jednotlive_usecases/` and `/jednotlive_tools/`) the user
has recently opened. It gives users a quick way to return to guides
they were working with, without having to search or navigate the
roadmap again.

### Placement & layout
- Displayed as a clearly labeled section (e.g., heading **"Last
  used"** with a clock / history icon) on the **home / dashboard
  page** and reachable from the main navigation.
- Items are shown as a **horizontal scrollable row** of compact card
  previews on wider screens, and as a **vertical list** on narrower
  screens (responsive).
- Each entry is a small **Learning Card preview** containing:
  - the **guide title**,
  - a short **excerpt or goal summary**,
  - a small **icon / tag** indicating the category (use case vs.
    tool),
  - a **timestamp / relative time** (e.g., *"2 hours ago"*,
    *"Yesterday"*),
  - the user's **progress indicator** (e.g., `3 / 6` checked items)
    pulled from the Learning Card's checklist,
  - a **bookmark toggle** that reflects (and can change) the card's
    bookmark state without opening it.
- A **"Remove" (✕) button** appears on hover (or as a small icon on
  touch devices) on each entry, letting the user delete that item
  from the Last used list.
- An optional **"Clear all"** action is available at the section
  header to wipe the entire list.
- **Empty state:** When the user has not opened any guide for long
  enough yet, the section shows a friendly empty-state illustration
  and a short message (e.g., *"Guides you open will appear here."*).

### Visual styling
- Consistent with the Learning Card design system: rounded corners,
  soft shadows on hover, subtle hover lift.
- Most recent item is shown **first** (left on horizontal layout, top
  on vertical layout).
- Items are visually compact — they are previews, not full cards.

## Functionality
The primary purpose of **Last Used** is to surface recently opened
Learning Cards so users can resume their work quickly.

### Core behaviors
- **Adding entries:** A guide is added to **Last Used** automatically
  when its **Learning Card has been open for more than 10 seconds**
  (the same rule defined in the Learning Card spec). Closing the card
  sooner does **not** add it.
- **Opening an entry:** Clicking a Last Used item opens the
  corresponding **Learning Card popup** exactly as it would open from
  search or the roadmap, with the user's saved state (bookmarks,
  checklist progress) preserved.
- **Ordering:** Items are ordered by **most recent open time first**.
- **De-duplication:** Re-opening a guide that is already in the list
  does **not** create a duplicate entry; instead, its timestamp is
  **updated** and the entry moves to the top of the list.
- **Capacity:** The list keeps up to a fixed number of entries (e.g.,
  the **last 20** opened guides). When the limit is exceeded, the
  oldest entry is dropped.
- **Removal:** Users can remove a single entry via its ✕ button or
  clear the whole list via *"Clear all"*. Removal is local to the
  Last Used list and does **not** affect bookmarks, checklist
  progress, or the underlying guide.
- **Persistence:** The list is persisted per user across sessions.

### Inputs
- Open events emitted by the **Learning Card** feature, including the
  guide identifier and the open duration.
- The user's stored Last Used list.
- The user's stored bookmark and progress state (for previews).

### Outputs / side effects
- Renders the list of recently opened guides as compact previews.
- Updates the stored Last Used list when entries are added, reordered,
  removed, or cleared.
- Opens the **Learning Card popup** when an entry is activated.

### States
- **Empty:** No guide has been opened long enough yet — empty-state
  message is shown.
- **Populated:** One or more entries are listed in recency order.
- **Loading:** Skeleton previews while the list is being fetched.
- **Error:** If the list cannot be loaded, an inline error message
  with a retry action is shown.

### Edge cases
- A guide opened for **less than 10 seconds** must **not** appear in
  Last Used.
- If a guide is deleted from the content source, its preview shows a
  disabled state (e.g., *"Guide no longer available"*) and clicking it
  offers to remove the entry.
- Bookmark toggles in previews must stay in sync with the card-level
  bookmark state used elsewhere (Learning Card, Bookmarks page).
- Removing the last entry transitions the section to the empty state.

### Dependencies
- **Learning Card** — emits the "opened > 10 s" event that drives
  this list and is the target when an entry is activated.
- **Bookmarks** — shares bookmark state shown on previews.
- Guides content from `/jednotlive_usecases/` and `/jednotlive_tools/`.

## Example / Use Case
A teacher returns to the platform the next day to continue where they
left off:

1. The teacher opens the application and scrolls to the **"Last
   used"** section on the dashboard.
2. The most recent entry is *"Writing emails with AI"*, opened
   *"Yesterday"*, with a progress indicator showing `3 / 6` checked
   items.
3. The teacher clicks the preview; the corresponding **Learning Card
   popup** opens with all previously saved progress, bookmarks, and
   prompt selections intact.
4. After working with it for more than 10 seconds and then closing
   the card, the entry's timestamp updates to *"Just now"* and it
   moves to the top of the list (no duplicate is created).
5. The teacher decides they no longer need a different older entry,
   hovers it, and clicks the **✕** button — that single entry is
   removed from **Last Used**, while its bookmark and checklist
   progress remain untouched.