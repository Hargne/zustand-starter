import { RootStore } from "../index.d";

export const list = (store: RootStore): string[] => store.example.state.list;
