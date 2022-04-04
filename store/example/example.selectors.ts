import { RootStoreProps } from "../store.types";

export const list = (store: RootStoreProps): string[] =>
  store.example.state.list;
