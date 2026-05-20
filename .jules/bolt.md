## 2024-05-20 - React.lazy and Suspense for components
**Learning:** Found an opportunity to code-split the application using `React.lazy()` and `Suspense` in `App.tsx` to dynamically load tab components (`Dashboard`, `Workspace`, `ConfigEditor`, `LogPanel`) and their heavy dependencies (`pptxgenjs` and `recharts`). This prevents bloating the initial bundle size.
**Action:** Always use `React.lazy()` and `Suspense` for conditionally rendered components that have heavy dependencies to reduce the main chunk size.
