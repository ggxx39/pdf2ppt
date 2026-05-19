## 2024-05-15 - [Keyboard Accessibility for Hover Interactions]
**Learning:** [When hiding interactive elements behind group-hover (like delete file buttons), keyboard users cannot access them. You must pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container to ensure the button becomes visible when focused via keyboard tabbing.]
**Action:** [Always audit `group-hover` usage and ensure a corresponding `focus-within` class is added for keyboard accessibility, along with proper `aria-label`s on icon-only buttons.]
