import { GetState } from "zustand";
import { ExampleStore } from "./example/example.d";

export interface RootStore {
  example: ExampleStore;
}

export type StoreSelectors = {
  [key in keyof RootStore]: { [key: string]: (store: RootStore) => any };
};

export interface StoreActions {
  set: (fn: (state: RootStore) => void) => void;
  get: GetState<RootStore>;
}

export interface StoreEntry<
  S = { [key: string]: any },
  M = { [key: string]: () => any }
> {
  state: S;
  methods: M;
}

export type UnprocessedStoreEntry = StoreEntry<
  { [key: string]: any },
  { [key: string]: (a: StoreActions) => () => any }
>;
