## 2025-05-17 - Dynamic Imports for Tab Components
**Learning:** The initial bundle size was over 1.25MB because all tab components (Dashboard, Workspace, ConfigEditor, LogPanel) and their heavy dependencies (`recharts`, `pptxgenjs`, etc.) were imported statically in `App.tsx`.
**Action:** Implementing code splitting using `React.lazy()` and `Suspense` for conditional rendering of these tab components significantly reduced the main bundle size (from ~1.25MB to ~207KB) and deferred loading of heavy libraries until their respective tabs are accessed.
