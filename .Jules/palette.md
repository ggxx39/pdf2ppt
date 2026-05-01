## 2026-05-01 - Focus Management for Hidden Actions
**Learning:** Using Tailwind's `group-hover` to show hidden interactive elements (like the file remove button) makes them invisible to keyboard users and screen readers unless explicitly handled.
**Action:** Always pair `group-hover` with `focus-within` on the parent container, and add `focus-visible` styles + `aria-label` to the interactive elements themselves to ensure full accessibility.
