## 2024-04-17 - Hidden Actions Need Keyboard Triggers
**Learning:** In the Workspace component, the "Remove Document" button container was previously only shown on mouse hover (`group-hover:opacity-100`). This made the delete action completely inaccessible to keyboard users because they couldn't see the button when tabbing.
**Action:** When using hover states to reveal actions (like edit/delete icons on a card), always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the container so the actions become visible when a keyboard user tabs into them.
