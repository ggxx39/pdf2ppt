## 2024-05-21 - Unrestricted File Upload and Info Exposure
**Vulnerability:** The application was vulnerable to client-side DoS due to lack of file size limits before processing images in memory. Additionally, raw error messages from external API calls were exposed to the UI, risking sensitive information leakage.
**Learning:** Client-heavy architectures using FileReader can easily exhaust browser memory. Error handling must distinguish between internal developer logging and user-facing messages.
**Prevention:** Always implement a strict file size check before reading files into memory. Ensure catch blocks sanitize error messages sent to the UI while logging raw details internally.
