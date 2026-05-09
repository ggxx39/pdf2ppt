## 2024-05-24 - Route-level code splitting
**Learning:** The application currently imports all major components (Dashboard, Workspace, ConfigEditor, LogPanel) synchronously in App.tsx. This causes the initial bundle size to be massive (1.2MB), mainly because `Workspace` pulls in `pptxgenjs` and `Dashboard` pulls in `recharts`.
**Action:** Implement route-level code splitting using `React.lazy` and `React.Suspense` for the tab components in `App.tsx` to dramatically reduce the initial load time and bundle size.
