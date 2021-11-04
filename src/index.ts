import zustand from "zustand";
import { devtools } from "zustand/middleware";
import { RootStore } from "./index.d";
import { immerProxy, prepareStoreEntry } from "./utils";

import * as exampleStore from "./example/example";
import { ExampleStore } from "./example/example.d";

// Hook to consume the store
export const useStore = zustand<RootStore>(
  devtools(
    immerProxy<RootStore>(
      (set, get): RootStore => ({
        example: prepareStoreEntry<ExampleStore>({
          state: exampleStore.initialState,
          methods: exampleStore.methods,
        })({ set, get }),
      })
    )
  )
);

// High order function which exposes all methods available for a specific store entry
export function getStoreMethods(entry: keyof RootStore) {
  return useStore((state) => state[entry].methods);
}

// All available selectors
export const storeSelectors = {
  example: exampleStore.selectors,
};
