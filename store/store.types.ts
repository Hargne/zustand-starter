import { GetState } from "zustand";

import { ExampleStoreProps } from "./example/example";

export interface RootStoreProps {
  example: ExampleStoreProps;
}

export interface StoreEntryProps<
  S = { [key: string]: any },
  M = { [key: string]: (...args: any) => any },
  L = { [key: string]: (store: RootStoreProps) => any }
> {
  state: S;
  methods: M;
  selectors: L;
}

export interface StoreActionProps {
  set: (fn: (state: RootStoreProps) => void) => void;
  get: GetState<RootStoreProps>;
}

export type UnprocessedStoreEntryProps = StoreEntryProps;
