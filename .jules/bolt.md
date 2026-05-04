## 2024-05-04 - Code Splitting for Heavy Chart and Parsing Libraries

**Learning:** This single-page application heavily utilizes `recharts` (for dashboard analytics) and `pptxgenjs` (for parsing presentations). These libraries are quite large and severely affect the initial page load if statically imported in the main root `App.tsx` file, since standard Vite chunking logic will include them in the initial main vendor chunk.

**Action:** When working on SPAs with heavy feature-specific dependencies (like charts or PDF/PPT processing), I should proactively implement route-level code splitting using `React.lazy` and `Suspense`. This ensures users only download massive dependencies like `pptxgenjs` or `recharts` when navigating to the specific tab that requires them.
