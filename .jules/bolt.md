## 2024-05-24 - React Lazy Loading for Tabbed Interfaces
**Learning:** The application uses heavy dependencies like `pptxgenjs` and `recharts` which were statically imported in the root `App.tsx`, causing the initial bundle size to exceed 1.2MB. This architectural pattern of rendering tabs conditionally without a router requires explicit code-splitting.
**Action:** Used `React.lazy()` and `Suspense` for tab components (`Dashboard`, `Workspace`, etc.) so that their heavy dependencies are only loaded when the user actually navigates to those tabs, reducing the initial load time significantly.
