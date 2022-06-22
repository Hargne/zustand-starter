import { RootStoreProps, StoreActionProps } from "../store.types";
import exampleMethods, { sortExampleItems } from "./example.methods";
import { ExampleItem } from "./example.types";

const STORE_KEY = "example";

const state: {
  list: ExampleItem[];
} = {
  list: [],
};

const selectors = {
  sortedList: (store: RootStoreProps): ExampleItem[] =>
    sortExampleItems(store[STORE_KEY].state.list),
};

const exampleStore = (actions: StoreActionProps) => ({
  [STORE_KEY]: {
    state,
    selectors,
    methods: exampleMethods(actions),
  },
});

export default exampleStore;
