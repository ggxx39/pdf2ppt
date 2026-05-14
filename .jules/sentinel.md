## 2024-05-14 - Fix client-side DoS risk in file upload
**Vulnerability:** The application reads uploaded files into memory via `FileReader.readAsDataURL()` without restricting file size, leading to browser memory exhaustion.
**Learning:** For client-side processing, uncontrolled file uploads can easily crash the browser tab or freeze the UI, which is a DoS vulnerability.
**Prevention:** Always implement file size validation before reading large inputs into memory or sending them over network, especially on client-side React apps.
