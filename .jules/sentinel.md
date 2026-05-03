## 2024-05-03 - [File Upload DoS and Sensitive Info Leak in Errors]
**Vulnerability:** Found lack of file size limits on file upload allowing for DoS via browser memory exhaustion, and sensitive info (stack traces/raw errors) leaked to the UI in the processing error handler.
**Learning:** The application does client-side file reading and API calls where raw error messages from the backend or the `FileReader` can contain sensitive configuration or token info if exposed directly. Unbounded `FileReader` buffers can crash the browser tab.
**Prevention:** Always validate file size before reading into memory (e.g., 10MB limit), and use a generic, sanitized error message for user-facing UI while logging raw errors to the console internally.
