## 2024-05-24 - Accessibility for Group-Hover Elements
**Learning:** When using Tailwind's `group-hover` to show hidden interactive elements (like delete buttons over uploaded images), the elements remain completely inaccessible to keyboard users unless the parent also triggers on focus. The element needs both screen reader context (`aria-label`) and visual keyboard focus indicators.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container, and add focus outline classes (`focus:outline-none focus:ring-2`) to the interactive element itself.
