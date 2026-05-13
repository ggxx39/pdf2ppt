## 2024-05-13 - Code Splitting Heavy Tab Dependencies
**Learning:** The application renders tab components (`Dashboard` with `recharts`, `Workspace` with `pptxgenjs`) unconditionally based on state, which forces all their heavy dependencies to be bundled and loaded initially, significantly bloating the initial JS bundle size and slowing down Time to Interactive (TTI).
**Action:** Always wrap dynamically rendered tab-like components with `React.lazy()` and `<Suspense>` to defer loading their associated heavy libraries until the user actually navigates to that tab.
