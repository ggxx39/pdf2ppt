## 2024-05-14 - Lazy Load Heavy Components
**Learning:** Synchronous imports of heavy dependencies (`pptxgenjs` in Workspace, `recharts` in Dashboard) within `App.tsx` significantly bloat the initial bundle size, impacting load performance.
**Action:** Use `React.lazy()` for code splitting on tab components so they are only loaded when needed, improving the initial load time.
