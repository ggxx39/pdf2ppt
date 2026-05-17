## 2026-05-17 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Icon-only interactive elements like the Trash/Delete button in the Workspace component lack accessibility context, making them invisible to screen readers.
**Action:** Always add descriptive `aria-label` attributes to `<button>` elements that only contain icons (e.g., `<Trash2>`) to ensure keyboard and screen reader accessibility.
