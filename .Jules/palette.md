## 2024-05-15 - Interactive Overlay Keyboard Accessibility
**Learning:** When using Tailwind's `group-hover` to reveal interactive elements (like the file remove button in Workspace.tsx), keyboard users are locked out because they cannot trigger the hover state. The parent container must include `focus-within` to reveal the overlay when an element inside it receives focus.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on overlay containers, and ensure child interactive elements have `focus-visible` styles and `aria-label`s.
