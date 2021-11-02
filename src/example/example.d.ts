import { StoreEntry } from "../index.d";
import * as methods from "./example.methods";

interface ExampleState {
  list: string[];
}

export type ExampleStore = StoreEntry<
  ExampleState,
  { [key in keyof typeof methods]: () => void }
>;
