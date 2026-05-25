# Feature: Main Page with Interactive Tree Graph

## Design
The application's main page is designed with an emphasis on visual clarity and an intuitive user interface, dominated by an **interactive tree graph (mind map / tree graph)** positioned in the center of the screen. The graph uses clean lines, rounded node contours, and distinct color coding to differentiate the main categories.

- **Screen Placement:** The tree graph fills the central viewport of the screen, supporting smooth zooming (zoom) and panning (pan) via mouse click-and-drag or touch gestures.
- **UI Node Elements:** Nodes are represented by rounded rectangles or ovals containing clear text labels in English. Major structural connections are highlighted with thicker red or blue lines.
- **Visual Styling & Colors (Matching the source mind map):**
  - **Central Node ("Use Cases / Prípady použitia"):** A prominent red node in the center of the graph, serving as the core anchor from which the entire architecture branches out.
  - **Core Infrastructure Branch ("Tools" & "Prompt Writing"):** These boxes are bordered in red, signifying their importance as the technical and methodical backbone of the application.
  - **Category Nodes:** First-level directional nodes (*Administration, Lesson Activities, Exams, Summary of Material, Content Creation, Chatbots, Teaching Aids*) feature blue borders and act as navigational junctions.
  - **Action Nodes (Leaf Nodes):** The final, executable endpoints feature purple or pink borders, representing concrete tools, outputs, or templates.
- **Interactions & Visual States:**
  - **Hover State:** Hovering over any node slightly scales its size, adds a subtle drop shadow highlight, and deepens the opacity of the connecting line back to its parent node.
  - **Click Action:** Clicking a final purple action node redirects the user to the corresponding tool interface or setup form. Clicking an expandable parent node collapses or expands its respective sub-tree with a smooth transition animation.
  - **Responsiveness:** On mobile devices, the graph adapts to the viewport. Users can navigate nodes using pinch-to-zoom gestures or toggle an alternative clean hierarchical list view.

## Functionality
The primary objective of this page is to serve as a visual navigation map and router for educators and content creators working with AI. The graph dynamically maps the relationships between prompt engineering methodologies, specific tools, and real-world pedagogical use cases.

### Tree Logical Structure (Data Scheme):
The tree branches out from two interconnected core pillars:

1. **Prompt Writing ↔ Tools ↔ Use Cases**
   - **Prompt Writing:** Splits into engineering specializations:
     - `prompt engineer`
     - `context engineer`
   - **Tools:** Categorized into:
     - `Chatbots`
     - `Teaching Aids` (featuring a specific implementation: `NotebookLM`)

2. **Use Cases (Main Pedagogical Hub):** Branches out into 5 distinct areas of application:
   - **Administration:**
     - `email writing`
   - **Lesson Activities:**
     - `practice exercises`
     - `flashcards`
     - `worksheets`
   - **Exams:**
     - `grading exams`
     - `exam creation`
     - `oral testing`
   - **Summary of Material:**
     - `summary of notes`
     - `summary podcast`
     - `cheatsheet creation`
   - **Content Creation:**
     - `image generation`
     - `material translation`
     - `presentations`

### Technical Logic & Behavior:
- **Inputs:** The user interacts by clicking, dragging, or panning across nodes. Additionally, a global search input field (adhering to the `search.md` standard) sits above the graph to instantly highlight and locate specific nodes.
- **Outputs:** Triggering a final leaf node (e.g., `summary podcast`) dispatches a routing event that navigates the user to that specific feature's sub-page or opens a modal pre-filled with the corresponding prompt template.
- **System States:**
  - **Loading:** On initial page initialization, a progressive node-rendering animation expands from the center outward.
  - **Empty / Error:** If fetching the graph data topology fails, an error fallback message appears on screen with a "Retry / Reload Page" button action.

## Example / Use Case
A history teacher wants to quickly generate revision materials for an upcoming class and looks for inspiration on the application platform:

1. The teacher lands on the **Main Page** and is presented with the interactive tree graph at the center of the display.
2. They visually scan the main **Use Cases** node and follow the blue connection line to the **Summary of Material** branch.
3. Hovering the cursor over **Summary of Material** brings the node to focus and clearly highlights its three child choices: *summary of notes*, *summary podcast*, and *cheatsheet creation*.
4. The teacher decides to build a quick summary reference and clicks the final purple action node: **cheatsheet creation**.
5. The application smoothly routes the teacher to the custom prompt template workspace, where they input their topic ("The Roman Empire") to receive a structured overview sheet generated by the AI.