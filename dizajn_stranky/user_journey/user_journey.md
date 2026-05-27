# Web Application User Journeys (Given-When-Then Format)

---

## 1. USER JOURNEY: Recently Opened

* **Given:** The user has already visited the page in the past and wants to open a prompt they have previously viewed. They are on the page where they can see the "Recently Opened", "Saved", "Prompt Cheat Sheet" sections and the search window in the header.
* **When:** The user clicks on the "Recently Opened" text in the header.
* **Then:** The system displays a list of parts of the website that the user had previously opened for longer than 10 seconds.

---

## 2. USER JOURNEY: Prompt Cheat Sheet

* **Given:** The user has already visited the page and needs to write an email using an external AI tool.
* **When:** The user clicks on the "Prompt Cheat Sheet" section and types what they need to find into the search window.
* **Then:** The system displays a window with the specific prompt, a short explanation, and instructions on what needs to be filled in.
* **When:** The user fills the required information into the prompt (what the email should be about) and then clicks the copy icon.
* **Then:** The user successfully copies the completed prompt to their clipboard and leaves the page to paste it into an AI tool (e.g., ChatGPT).

---

## 3. USER JOURNEY: Learning Tree Navigation

* **Given:** The user is visiting the website for the first time with a clear goal to learn. They can see the website header.
* **When:** The user scrolls down the page and sees a visual tree representing the learning sequence. They then click on the start of the main branch and continue learning in the direction of this branch.
* **Then:** Upon completing the given level, the system automatically highlights the corresponding box, symbolizing a successfully learned chapter.

---

## 4. USER JOURNEY: Bookmarks

* **Given:** The user has already visited the website in the past and wants to save specific content. A bookmark icon is displayed next to every prompt example and every use case.
* **When:** The user clicks on the bookmark icon next to the selected prompt or use case.
* **Then:** The system automatically adds the selected item to the user's bookmarks, where they can find it during any future visit to the website.

---

## 5. USER JOURNEY: Search Window

* **Given:** The user (new or returning) wants to search for a specific topic on the website.
* **When:** The user clicks into the search window and types a keyword, for example, "email".
* **Then:** After a short moment, the system displays a dropdown menu that highlights the word "email" in every lesson where it appears.
* **When:** The user clicks on the topic that is most relevant to them.
* **Then:** The system redirects the user and displays the given topic directly as an open lesson.