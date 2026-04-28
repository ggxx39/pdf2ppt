## 2024-04-28 - Keyboard Accessibility for Overlay Buttons
**Learning:** Elements hidden with Tailwind's `group-hover:opacity-100` are completely inaccessible to keyboard users unless they can receive focus.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container, and ensure interactive children have proper `focus:ring` states.
