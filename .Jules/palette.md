## 2024-05-14 - Keyboard Accessible Overlays
**Learning:** When using Tailwind's `group-hover:opacity-100` to reveal interactive elements (like a remove button) on hover, keyboard users cannot access them unless the parent also has `focus-within:opacity-100`.
**Action:** Always pair `group-hover` with `focus-within` on parent containers of interactive elements, and ensure inner buttons have `aria-label` and `focus-visible:ring-2` styles.
