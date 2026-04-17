## 2024-04-17 - React useMemo Optimization
**Learning:** Found a performance bottleneck where `.toLowerCase()` was being called repeatedly inside a `.filter` array iteration inside a React render function without memoization.
**Action:** Always check array manipulation functions (like `.filter`, `.map`, etc.) within React components to see if expensive operations can be moved out of the loop and if the overall result should be memoized with `useMemo`.
