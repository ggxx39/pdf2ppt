## 2024-05-24 - Initial Creation
**Learning:** Initial Palette journal creation.
**Action:** Ready to log meaningful UX and a11y improvements.

## 2024-05-24 - Interactive Overlay Keyboard Accessibility
**Learning:** In Tailwind, components hidden with `opacity-0` and shown via `group-hover:opacity-100` remain invisible to keyboard users who tab through interactive elements. The interaction is inaccessible if focus styles are not properly tied to parent container visibility.
**Action:** Always pair `group-hover` (or hover state visibility triggers) with `focus-within` on the parent overlay so that the overlay becomes visible when its interactive child elements receive keyboard focus. Additionally, provide clear `focus-visible` ring styles to the active button.
