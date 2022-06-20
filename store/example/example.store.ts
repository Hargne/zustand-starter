import { RootStoreProps, StoreActionProps } from "../store.types";
import exampleMethods from "./example.methods";

interface ExampleStateProps {
  list: string[];
}
const state: ExampleStateProps = {
  list: [],
};

const selectors = {
  sortedList: (store: RootStoreProps): string[] =>
    store.example.state.list.slice().sort(),
};

const exampleStore = (actions: StoreActionProps) => ({
  state,
  selectors,
  methods: exampleMethods(actions),
});

export default exampleStore;
