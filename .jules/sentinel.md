## 2024-05-22 - Client-Side Memory Exhaustion and Error Leakage
**Vulnerability:**
1. Unrestricted file sizes allowed client-side `FileReader` to load massive files into browser memory, leading to DoS.
2. Unsanitized `error.message` in the UI log exposed raw API errors which could include sensitive Gemini service details.
**Learning:** Client-only architectural designs mean all processing (like file reading) happens in the browser context, making file size limits crucial to prevent memory exhaustion. Furthermore, error objects propagated from third-party APIs (like Gemini) must be sanitized before being displayed to the user to prevent information disclosure.
**Prevention:** Always implement client-side validation (size, type) before invoking `FileReader` or processing logic. Always catch API errors and render generic, sanitized messages to the UI while logging raw errors internally via `console.error` for debugging.
