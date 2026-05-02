## 2024-05-01 - Code Splitting Routes
**Learning:** The application was loading all components and their heavy dependencies (like `pptxgenjs` in Workspace and `recharts` in Dashboard) upfront in App.tsx, leading to a single large bundle.
**Action:** Apply `React.lazy()` and `Suspense` for route-level code splitting to defer loading these heavy dependencies until the respective tab is accessed, significantly reducing the initial load time.
