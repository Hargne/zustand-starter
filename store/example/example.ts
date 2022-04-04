import * as methods from "./example.methods";
import * as selectors from "./example.selectors";
import { RootStoreProps, StoreEntryProps } from "../store.types";

export type ExampleStoreProps = StoreEntryProps<
  typeof state,
  { [key in keyof typeof methods]: () => void },
  { [key in keyof typeof selectors]: (state: RootStoreProps) => any }
>;

interface ExampleStateProps {
  list: string[];
}

const state: ExampleStateProps = {
  list: [],
};

export default {
  state,
  methods,
  selectors,
};
