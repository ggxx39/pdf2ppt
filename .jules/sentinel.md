## 2024-05-17 - Client-side DoS via FileReader Memory Exhaustion
**Vulnerability:** The application processes uploaded files entirely on the client side using `FileReader` and base64 encoding without any file size limits.
**Learning:** This can lead to browser memory exhaustion (DoS) if a user uploads an excessively large file.
**Prevention:** Implement strict file size validation (e.g., 10MB limit) before processing files on the client side.
