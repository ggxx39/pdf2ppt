## 2024-05-19 - Prevent Client-Side Data Leakage
**Vulnerability:** The application was leaking potentially sensitive raw error messages directly into the UI logs.
**Learning:** Try/catch blocks dealing with third-party APIs (like Gemini) must sanitize user-facing errors while maintaining internal `console.error` logs for developers.
**Prevention:** Implement a "fail securely" pattern: sanitize user-facing error outputs and log full stack traces/messages only internally.
