import { StateCreator } from "zustand";
import produce from "immer";
import {
  StoreEntry,
  UnprocessedStoreEntry,
  StoreActions,
  RootStore,
} from "./index.d";

// Creates a proxy to avoid having to import and call "produce" in each individual store
export const immerProxy =
  <T extends RootStore>(
    config: StateCreator<T, (fn: (state: T) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce(fn)), get, api);

// Returns a store entry with methods wrapped in store actions
export const prepareStoreEntry =
  <S extends StoreEntry>(store: UnprocessedStoreEntry) =>
  (actions: StoreActions): S => {
    const wrappedMethods: { [key: string]: () => any } = {};
    Object.keys(store.methods).forEach((methodName) => {
      wrappedMethods[methodName] = store.methods[methodName](actions);
    });

    return {
      state: store.state,
      methods: wrappedMethods,
    } as S;
  };
