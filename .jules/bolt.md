## 2026-04-28 - [Code Splitting for Heavy Modules]
**Learning:** The application was bundling heavy dependencies like `recharts` and `pptxgenjs` into the main chunk, resulting in a large initial bundle size (1.25MB). Code splitting via React.lazy and Suspense at the route/tab level successfully separated these dependencies into smaller chunks.
**Action:** Always use code splitting for route-level components that import large, non-critical libraries to improve initial load performance.
