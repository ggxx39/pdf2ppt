## 2023-10-27 - Code Splitting Routes

**Learning:** Route-level code splitting using `React.lazy` and `Suspense` effectively splits out large dependencies (like `pptxgenjs` and `recharts`) from the main bundle, preventing the main `index.js` file from growing excessively. Previously, Vite's build bundled all of them into a single 1.25MB file. After code splitting, the main bundle shrunk to ~200KB, allowing the UI to load faster and loading heavy chunks only when the user navigates to those specific routes.
**Action:** Use route-based dynamic imports to code-split big dependencies like `recharts` and `pptxgenjs`.
