## 2025-03-05 - Keyboard Accessibility with Hover Overlay Interactions
**Learning:** When using Tailwind's `group-hover` to show hidden interactive elements (like an overlay containing a delete button), keyboard users are unable to access the elements if they cannot be visually revealed via tabbing.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container to ensure the overlay and its interactive contents are exposed to users relying on keyboard navigation.
