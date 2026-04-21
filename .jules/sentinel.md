## 2024-05-20 - [Missing File Validation on Client Uploads]
**Vulnerability:** The client-side application lacks file type validation and size limits, potentially allowing processing of unsupported files leading to errors or excessively large files leading to memory exhaustion DoS.
**Learning:** Security validation must occur at the entry point of the data handling lifecycle. In this repository, client-side validation acts as a first line of defense to prevent unnecessary processing load and local crashes, especially given the client-only architecture.
**Prevention:** Always implement explicit input validation for file uploads (type checking and size limits) using strict allowlists, and enforce them before reading file contents into memory.
