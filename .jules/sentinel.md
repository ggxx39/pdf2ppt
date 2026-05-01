## 2024-05-18 - Client-Side DoS and Info Exposure

**Vulnerability:** Client-side file processing (using FileReader) lacked file size limits, enabling potential browser memory exhaustion (DoS). The catch block exposed raw API errors to the user UI, risking information leakage.
**Learning:** In client-only architectures processing files in memory, limits are critical to prevent crashes. Furthermore, errors must be sanitized for the user-facing UI to prevent exposing backend API details or sensitive internal state.
**Prevention:** Always implement strict file size validation (e.g., 10MB limit) before `FileReader` operations. Implement a generic "fail securely" pattern for UI logs while retaining detailed internal logging for debugging.
