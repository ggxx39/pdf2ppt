## 2026-04-21 - Route-level code splitting

**Learning:** When using Vite, large dependencies like `pptxgenjs` and `recharts` can significantly bloat the main entry chunk if components are eagerly imported. Since this application has separate route tabs, the heavy dependencies block the initial load even when not in use.

**Action:** Always implement `React.lazy` and `React.Suspense` for heavy route components. This forces Vite to generate separate chunks, resulting in a significantly faster initial load time (main chunk reduced from ~1.25MB to ~207KB).
