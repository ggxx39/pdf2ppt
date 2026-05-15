## 2024-05-15 - Code Splitting Tab Components
**Learning:** In a single-page React application that doesn't use a router but dynamically renders heavy tab components (like Workspace using pptxgenjs or Dashboard using recharts), statically importing all tab components causes all dependencies to be bundled into the initial load.
**Action:** Always use `React.lazy()` and `Suspense` for heavy, conditionally rendered components, even when not using a routing library, to improve initial load performance and reduce the main bundle size.
