import zustand from "zustand";
import { devtools } from "zustand/middleware";

import exampleStore from "./example/example.store";
import { RootStoreProps } from "./store.types";

// Main hook to consume the store
const useStore = zustand<RootStoreProps>(
  devtools((set, get) => ({
    example: exampleStore({ set, get }),
  }))
);

// Hook to consume a single selector from a given store
export const useStoreSelector = <
  E extends keyof RootStoreProps,
  S extends keyof RootStoreProps[E]["selectors"]
>(
  entry: E,
  selector: S
) =>
  useStore((store) => {
    const selectors = store[entry].selectors;
    return selectors[selector as keyof typeof selectors](store);
  });

// Hook to consume a list of methods from a given store
export const useStoreMethods = (entry: keyof RootStoreProps) =>
  useStore((store) => store[entry].methods);
