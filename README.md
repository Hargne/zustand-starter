# Zustand Starter

Based on [https://github.com/pmndrs/zustand/wiki/Splitting-the-store-into-separate-slices]()

### Minimalist Usage

```tsx
import React from "react";
import { useStoreSelector, useStoreMethods } from "./store/store";

function Component() {
  const exampleMethods = useStoreMethods("example");
  const list = useStoreSelector("example", "sortedList");

  return (
    <React.Fragment>
      <button onClick={exampleMethods.fetchList}>Fetch List</button>
      <div>{list}</div>
    </React.Fragment>
  );
}
```
