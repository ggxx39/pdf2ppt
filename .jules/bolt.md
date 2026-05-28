## 2026-05-22 - Dynamic Import and Code Splitting
**Learning:** The application initially loads all components including heavy dependencies like `pptxgenjs` and `recharts` upfront, leading to a large main bundle (~1.25MB).
**Action:** Used React.lazy() and Suspense to dynamically import tab components based on the active tab state, resulting in a significant main bundle size reduction (from 1.25MB to 207KB) and deferred loading of large dependencies.
