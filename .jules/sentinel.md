## 2024-05-24 - [Information Disclosure in Error Logs]
**Vulnerability:** The application was exposing raw error messages and stack traces from the Gemini backend directly into the UI logs and catching exceptions natively exposing internals.
**Learning:** This exposes underlying architecture and details about the environment which can be leveraged.
**Prevention:** Catch external API errors securely, handle and translate them to generic safe messages for the end user, explicitly appending `// Don't leak details`.
