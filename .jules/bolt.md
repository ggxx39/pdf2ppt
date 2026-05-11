## 2024-05-11 - Lazy Loading Route Components
**Learning:** Recharts and PPTXGenJS are extremely heavy libraries in this application. Loading them statically on the initial page load for the Dashboard causes the main App bundle to bloat unnecessarily, hurting initial load time performance for users who may not navigate to all tabs.
**Action:** Always implement code-splitting using `React.lazy` and `Suspense` for heavy, distinct route components to improve initial rendering speed and bundle chunking.
