# Project Design Specification: AIPREMNA.SK

This document provides a comprehensive design and functional blueprint for the **AIPREMNA.SK** platform. It is intended to guide the implementation of a minimalistic, modern, and user-centric educational website for Slovak teachers.

---

## 🎨 Brand & Style

### Color Palette
- **Primary Color:** `#8175fb` (Used for primary actions, main nodes, and highlights)
- **Secondary Color:** `#3d72e5` (Used for secondary buttons and structural elements)
- **Accent Color:** `#7dbcf9` (Used for hover states, subtle accents, and links)
- **Background Color:** `#f8f2f2` (Clean, off-white background to reduce eye strain)
- **Font Color:** `#140c0b` (Deep, high-contrast color for readability)

### Typography
- **Headings:** `Krona One` (Modern, geometric, and professional)
- **Body Text:** `Ubuntu` (Clean, highly legible, and friendly)

### Visual Aesthetic
- **Minimalistic & Modern:** Avoid clutter. Use generous white space (breathable design).
- **Clean Icons:** Use simple, thin-line icons (e.g., Lucide or Phosphor) next to text elements in the navigation.
- **Micro-interactions:** Subtle transitions, hover scales, and smooth animations to make the site feel "alive."

---

## 🏗️ Layout & Components

### 1. Header (Top Bar)
The header remains fixed to provide constant access to core features.

- **Logo:** Located in the **left top corner**.
  - *Asset:* `dizajn_stranky/logo/AIPREMNA_logo.png`
- **Navigation Links (with icons):**
  - **Recently Opened:** Shows a list of lessons viewed for >10 seconds.
  - **Saved (Bookmarks):** Quick access to favorited content.
  - **Prompt Cheat Sheet:** Opens a dedicated section for quick AI prompt templates.
- **Search Bar:** Located in the **right top corner**.
  - Magnifying glass icon.
  - Placeholder: "Search guides..."
  - Results dropdown with highlighted matches.

### 2. Main Page: Interactive Learning Tree
The core of the platform is an interactive, scroll-based roadmap.

- **Placement:** Centered in the main viewport.
- **Behavior:** The site **progresses as you scroll down**. The tree "unfolds" or reveals its branches (lectures) as the user moves down the page.
- **Progress Tracking:** Upon completing a level/lesson, the corresponding node box is **highlighted** or changes visual state (e.g., solid fill) to symbolize success.
- **Structure (3 Tiers):**
  1. **Základy a Príprava**
  2. **Prípady použitia**
  3. **Konkrétne nástroje**

### 3. Learning Cards & Prompts
- **Learning Card:** Displayed when a node is clicked. Contains theory and practice.
- **Prompt Component:** 
  - Displays specific AI prompts with a short explanation.
  - Includes a **Copy Icon** to copy the final prompt to the clipboard.
  - Includes a **Bookmark (Save) Icon** next to every prompt and use case.

---

## ⚙️ Functionality & User Journeys

### 1. Persistence & LocalStorage
- **No User Accounts:** All data stays on the user's device.
- **History:** Tracks lessons viewed for >10 seconds for the "Recently Opened" list.
- **Bookmarks:** Saves specific prompts or lessons when the user clicks the bookmark icon.
- **Progress:** Stores completed status of tree nodes.

### 2. User Journey: Navigation & Search
- **Search Flow:** Typing "email" in the top-right search bar opens a dropdown. Every lesson containing "email" is listed with the keyword highlighted. Clicking a result redirects the user and opens that specific lesson.
- **Tree Flow:** A first-time user scrolls down, follows the main branch, and clicks a node. After reading/interacting, the system marks it as "learned" (visual highlight).

### 3. User Journey: Quick Prompting
- **Cheat Sheet Flow:** A teacher needs to write an email. They click "Prompt Cheat Sheet" in the header, search for "email," find the prompt, fill in specific details (e.g., "Subject: School Trip"), and click the **Copy Icon**. They can then paste this directly into ChatGPT/Claude.

---

## 📐 Responsiveness
- **Desktop:** Full interactive tree with hover effects and fixed header.
- **Mobile:** Adaptive view. The tree may transition to a simplified hierarchical list. Navigation links in the header might collapse into a "hamburger" menu while keeping search prominent.
