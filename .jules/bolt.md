## 2025-04-30 - Lazy Load Tab Components
**Learning:** For tabbed layouts (like Dashboard/Workspace) that do not use an explicit router but load heavy dependencies like `pptxgenjs` and `recharts`, those heavy dependencies get bundled into the main entry chunk if imported synchronously, drastically increasing initial load time.
**Action:** Use `React.lazy()` with `React.Suspense` to dynamically import route-level/tab-level components, allowing bundlers like Vite to split the heavy dependencies into separate chunks loaded only when the user navigates to the respective tab.
