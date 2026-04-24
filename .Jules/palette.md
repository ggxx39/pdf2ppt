## 2024-04-24 - Interactive overlays accessibility
**Learning:** Overlay elements shown with `group-hover` hide interactive buttons from keyboard users if not handled.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the overlay, and ensure buttons have `aria-label`.
