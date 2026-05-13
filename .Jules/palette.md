## 2026-05-13 - [Make file removal button accessible]
**Learning:** Tailwind's `group-hover` reveals visually hidden interactive elements on mouse hover but fails for keyboard navigation because focus occurs on the button inside the hidden container, not triggering the hover state.
**Action:** Pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container. This ensures that when a user tabs into the hidden button, the container becomes visible, making the interface fully keyboard accessible.
