## 2024-05-20 - [Fix Sensitive Data Exposure]
**Vulnerability:** Raw API error messages exposing sensitive internals to the UI in Workspace.tsx. Missing file size limits causing potential DoS risks.
**Learning:** Catch blocks interacting with external APIs (like Gemini) must sanitize error messages before displaying them in the user-facing UI to prevent leakage of sensitive data. However, raw errors must still be logged internally. Strict file size validation is required before processing to prevent browser memory exhaustion.
**Prevention:** Implement file size checks before reading files. Always sanitize error messages in user-facing logs while keeping internal logs detailed.
