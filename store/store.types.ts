import { GetState, SetState } from "zustand";
import example from "./example/example.store";

export interface RootStoreProps {
  example: ReturnType<typeof example>;
}

export interface StoreActionProps {
  set: SetState<RootStoreProps>;
  get: GetState<RootStoreProps>;
}
