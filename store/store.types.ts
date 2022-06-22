import { GetState, SetState } from "zustand";
import example from "./example/example.store";

export interface RootStoreProps extends ReturnType<typeof example> {}

export interface StoreActionProps {
  set: SetState<RootStoreProps>;
  get: GetState<RootStoreProps>;
}

export type StoreSelector = (store: RootStoreProps) => any;
