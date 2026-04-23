## 2024-05-24 - Fix Error Handling Information Leakage
**Vulnerability:** Error messages and stack traces were logged directly to the console and displayed in the UI when Gemini OCR or translation failed.
**Learning:** Returning raw exception details (`error` or `error.message`) in API catch blocks or component logging can leak internal paths, API configurations, or runtime states to users or attackers observing the console or log UI.
**Prevention:** Always catch and handle errors securely by logging a generic user-friendly message or omitting internal exception details when propagating them back to the caller or the UI.
