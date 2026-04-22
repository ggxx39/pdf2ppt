## 2025-04-22 - Missing Route-Level Code Splitting for Heavy Dependencies
**Learning:** The project relies on heavy libraries like `pptxgenjs` and `recharts` for specific views (Workspace and Dashboard, respectively). Without route-level code splitting, these libraries are bundled into the initial main chunk, increasing the initial load time significantly and triggering a Vite 500kB limit warning.
**Action:** Always verify if heavy libraries are isolated to specific routes/tabs. If so, use `React.lazy` and `Suspense` to defer their loading, thus optimizing the initial load time.
