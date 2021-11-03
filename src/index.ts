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
 * High order function which exposes all methods available for a specific store entry
 */
export function getStoreMethods(entry: keyof RootStore) {
  return useStore((state) => state[entry].methods);
}

/**
 * All available selectors
 */
export const storeSelectors: StoreSelectors = {
  example: exampleSelectors,
};
