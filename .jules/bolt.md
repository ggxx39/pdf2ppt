## 2024-05-18 - Route-level code splitting
**Learning:** This codebase does not use `react-router` and renders tab contents dynamically inside `App.tsx`. Therefore, route-level code splitting with `React.lazy` and `Suspense` needs to be applied to the tab components (`Dashboard`, `Workspace`, `ConfigEditor`, `LogPanel`) inside `App.tsx`.
**Action:** Replace static imports with `React.lazy` and wrap the conditional rendering in `App.tsx` with `<React.Suspense>`.
