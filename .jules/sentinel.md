## 2026-05-06 - [Information Leakage in UI Error Logs]
**Vulnerability:** External API (Gemini) error messages were directly mapped to user-facing UI action logs (`error.message`).
**Learning:** Reusing exceptions directly in UI components (like the `addLog` state dispatcher) can expose sensitive internal API details, paths, or execution context. The application architecture logs `console.error` for the developer but needs a strict sanitization layer for the UI representations.
**Prevention:** Always implement a secure fail state for user-facing logs. Catch blocks interacting with external APIs must use static, generic error strings in the UI while retaining raw errors in internal logs only.
