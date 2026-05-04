## 2025-02-28 - [Client-Side DoS via Unbounded File Upload]
**Vulnerability:** The application reads files directly into memory on the client side using `FileReader` and base64 encodes them without checking the file size.
**Learning:** This architectural pattern (client-side processing) creates a significant DoS risk. Very large files can cause the browser to crash due to memory exhaustion before any server-side limits apply. The risk is compounded by base64 encoding, which increases the memory footprint by approximately 33%.
**Prevention:** Always implement strict, application-appropriate client-side file size limits before invoking `FileReader.readAsDataURL()`, especially in architectures lacking server-side intermediate processing.
