## 2024-05-06 - Tailwind `group-hover` Accessibility Pattern
**Learning:** Components relying on `group-hover` to display interactive elements (like delete buttons overlaying images) become inaccessible to keyboard navigation if focus states aren't also handled.
**Action:** Always pair Tailwind's `group-hover:opacity-100` with `focus-within:opacity-100` on the parent container to ensure hidden interactive elements become visible when receiving keyboard focus.
