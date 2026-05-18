## 2024-05-18 - Dynamic Tab Loading
**Learning:** The application renders heavy tabs (Workspace with `pptxgenjs`, Dashboard with `recharts`) eagerly, which bloats the initial index bundle size (>1.2MB).
**Action:** Always use React.lazy() and Suspense in App.tsx to dynamically load tab components so that their dependencies are code-split, dramatically reducing the initial load time.
