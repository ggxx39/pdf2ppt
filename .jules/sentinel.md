## 2025-03-09 - Add File Upload DoS Risk Limit
**Vulnerability:** Missing input length limits (DoS risk) on file uploads. Large files could be uploaded and buffered fully into memory via `FileReader`, risking client browser crashes or payload size violations on external APIs.
**Learning:** Even client-side implementations using fully managed services (like Gemini via API) can be susceptible to DoS risks if local resource allocation (like `FileReader` buffering Base64) is left unbound.
**Prevention:** Always enforce a file size limit check immediately after file selection (e.g., `selected.size > MAX_FILE_SIZE`) before reading or processing the content.
