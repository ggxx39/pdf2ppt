## 2024-05-12 - Prevented API Error Data Leakage in UI
**Vulnerability:** Raw API error messages from the Gemini service were being passed directly to the user-facing UI activity log via `error.message`.
**Learning:** In a client-only architecture, API errors (like quota issues, malformed requests, or internal service errors) can expose sensitive internal state or configuration details if blindly rendered to the user.
**Prevention:** Always sanitize error messages in catch blocks that interact with external APIs before updating user-facing state. Log raw errors to `console.error` for debugging but display generic, safe messages to the user.
