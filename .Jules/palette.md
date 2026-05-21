## 2025-03-09 - Accessible Hidden Interactive Elements
**Learning:** Found an accessibility issue pattern where interactive elements hidden behind a container's group-hover state are invisible to keyboard-only users who tab to them.
**Action:** When using Tailwind's group-hover to reveal hidden interactive controls, always pair the parent container with focus-within to ensure keyboard focus makes the controls visible.
