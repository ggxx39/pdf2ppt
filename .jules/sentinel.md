## 2024-05-18 - Prevent Client-Side DoS and Info Leakage
**Vulnerability:** Application processes uploaded files entirely on the client side without size validation, leading to potential browser memory exhaustion (DoS). Error handler exposes raw error messages to the UI.
**Learning:** Client-only architecture must enforce strict resource limits since they don't have server-side limits. Catch blocks interacting with external APIs must sanitize error messages before displaying them in the user-facing UI.
**Prevention:** Implement strict file size validation (e.g., 10MB) before processing client-side. Always sanitize error messages in catch blocks that interact with external APIs while retaining internal logging.
