## 2024-05-18 - Keyboard Accessibility for Hover Overlays
**Learning:** Hidden interactive elements shown only via group-hover become inaccessible to keyboard users.
**Action:** Always pair group-hover:opacity-100 with group-focus-within:opacity-100, and add focus-within:ring-2 to the parent container.