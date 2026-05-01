## 2025-05-01 - Route-Level Code Splitting
**Learning:** Recharts and pptxgenjs are very large dependencies in this codebase. They were being loaded synchronously in the initial bundle, which was severely impacting the main chunk size (1.2MB+).
**Action:** Used `React.lazy` and `React.Suspense` to dynamically import route components (`Dashboard`, `Workspace`, `ConfigEditor`, `LogPanel`), reducing the initial bundle size and improving load times.
