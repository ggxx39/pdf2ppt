## 2025-04-25 - Prevented Error Message Information Leakage
**Vulnerability:** The catch block in `components/Workspace.tsx` (`processFile`) leaked `error.message` to the UI logs via `addLog()`, potentially exposing internal stack traces, API keys, or system architecture paths to untrusted users in production.
**Learning:** Returning exception properties directly without sanitization creates an attack surface.
**Prevention:** Catch blocks that reflect state changes to user interfaces should hardcode general-purpose strings instead of dynamically resolving properties on the `Error` object.
