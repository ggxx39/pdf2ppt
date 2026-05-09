## 2024-10-24 - Client-Side DoS and Info Leakage in File Uploads
**Vulnerability:** The application allowed processing files of any size via `FileReader` and leaked raw error stack traces directly to the user UI log via `error.message`.
**Learning:** Client-side processing (especially base64 encoding and OCR operations) of large files can quickly exhaust browser memory causing Denial of Service. Additionally, raw error messages from external APIs or parsing libraries often contain sensitive internal state or identifiers.
**Prevention:** Always enforce strict file size limits (e.g., 10MB) immediately upon file selection. Always sanitize error messages displayed to the user (`UI`), while retaining detailed raw errors in internal logs (`console.error`) to not blind developers.
