import zustand from "zustand";
import { devtools } from "zustand/middleware";
import { RootStore, StoreSelectors } from "./index.d";
import { immerProxy } from "./utils";
import exampleStore from "./example/example.store";
import * as exampleSelectors from "./example/example.selectors";

/**
 * Hook to consume the store
 */
export const useStore = zustand<RootStore>(
  devtools(
    immerProxy<RootStore>(
      (set, get): RootStore => ({
        example: exampleStore({ set, get }),
      })
    )
  )
);

/**
 * Hook that exposes all methods available for a specific store entry
 */
export function useStoreMethods(entry: keyof RootStore) {
  return useStore((state) => state[entry].methods);
}

/**
 * All selectors
 */
const storeSelectors = {
  example: exampleSelectors,
};

/**
 * Hook that returns a memoized selector of a given store
 */
export function useStoreSelector<
  T extends keyof typeof storeSelectors,
  S extends keyof typeof storeSelectors[T]
>(entry: T, selectorName: S) {
  return useStore(storeSelectors[entry][selectorName] as any);
}
