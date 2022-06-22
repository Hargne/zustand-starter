import zustand from "zustand";
import { devtools } from "zustand/middleware";

import exampleStore from "./example/example.store";
import { RootStoreProps, StoreSelector } from "./store.types";

// Main hook to consume the store
export const useStore = zustand<RootStoreProps>(
  devtools((set, get) => ({
    ...exampleStore({ set, get }),
  }))
);

// Hook to consume a single selector from a given store
export const useStoreSelector = <
  E extends keyof RootStoreProps,
  S extends keyof RootStoreProps[E]["selectors"]
>(
  entry: E,
  selector: S
): ReturnType<StoreSelector & RootStoreProps[E]["selectors"][S]> =>
  useStore((store) => {
    const selectors = store[entry].selectors;
    return (selectors[selector as keyof typeof selectors] as StoreSelector)(
      store
    );
  });

// Hook to consume a list of methods from a given store
export const useStoreMethods = <E extends keyof RootStoreProps>(
  entry: E
): RootStoreProps[E]["methods"] => useStore((store) => store[entry].methods);
