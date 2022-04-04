import produce from "immer";
import zustand, { StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import example, { ExampleStoreProps } from "./example/example";
import {
  RootStoreProps,
  StoreActionProps,
  StoreEntryProps,
  UnprocessedStoreEntryProps,
} from "./store.types";

// Creates a proxy to avoid having to import and call "produce" in each individual store
const immerProxy =
  <T extends RootStoreProps>(
    config: StateCreator<T, (fn: (state: T) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce(fn)), get, api);

// Returns a store entry with methods wrapped in store actions
const prepareStoreEntry =
  <S extends StoreEntryProps>(store: UnprocessedStoreEntryProps) =>
  (actions: StoreActionProps): S => {
    const wrappedMethods: StoreEntryProps["methods"] = {};
    Object.keys(store.methods).forEach((methodName) => {
      wrappedMethods[methodName] = store.methods[methodName](actions);
    });

    return {
      state: store.state,
      methods: wrappedMethods,
      selectors: store.selectors,
    } as S;
  };

// Hook to consume the store
export const useStore = zustand<RootStoreProps>(
  devtools(
    immerProxy<RootStoreProps>((set, get) => ({
      example: prepareStoreEntry<ExampleStoreProps>(example)({ set, get }),
    }))
  )
);

// High order hooks that expose available methods and selectors for a specific store entry
export const useStoreMethods = (entry: keyof RootStoreProps) =>
  useStore((store) => store[entry].methods);
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
