## 2024-05-24 - Pair group-hover with focus-within for hidden controls
**Learning:** Interactive elements hidden behind a `group-hover` class become completely inaccessible to keyboard users because they cannot be tabbed to when hidden.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container, and add `focus-visible:ring-2` to the interactive element to ensure proper keyboard navigation and visual focus indication. Add ARIA labels to all icon-only buttons.
