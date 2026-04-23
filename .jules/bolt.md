## 2024-05-18 - Route-Level Code Splitting for Heavy Dependencies
**Learning:** This application imports heavy third-party libraries like `pptxgenjs` (Workspace) and `recharts` (Dashboard). If statically imported in `App.tsx`, these libraries bloat the main chunk, slowing down initial load time for all users, even if they only view the configuration or logs.
**Action:** Use `React.lazy` and `Suspense` for route-level code splitting in `App.tsx` or similar routing files. This ensures heavy dependencies are only loaded when their specific views are accessed.
