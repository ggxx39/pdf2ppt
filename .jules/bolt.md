## 2024-05-06 - Avoid Empty String Filtering Overhead
**Learning:** In React components like `LogPanel`, a `.filter()` operation that uses `.toLowerCase()` inside its closure without an early return for an empty filter string causes unnecessary string allocations for every single item on every render, even when the filter isn't active.
**Action:** Always wrap filter computations in `useMemo`, add an early return for empty filter strings (`if (!filter) return items;`), and cache invariants like `filter.toLowerCase()` outside the loop.
