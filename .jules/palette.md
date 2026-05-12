## 2024-05-12 - Fix inaccessible group-hover pattern for hidden interactive elements
**Learning:** Hidden interactive elements (like delete buttons) that use Tailwind's `group-hover:opacity-100` are completely inaccessible to keyboard users because they cannot see the element when tabbing to it.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container, and ensure the interactive element itself has `focus-visible` styles so keyboard users can navigate to and interact with it effectively.
