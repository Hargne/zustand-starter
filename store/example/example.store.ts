import { RootStoreProps, StoreActionProps } from "../store.types";
import exampleMethods from "./example.methods";
import { ExampleItem } from "./example.types";

const STORE_KEY = "example";

const state: {
  list: ExampleItem[];
} = {
  list: [],
};

const sortItems = (list: ExampleItem[]) =>
  list.slice().sort((a, b) => (a.content < b.content ? -1 : 1));

const selectors = {
  sortedList: (store: RootStoreProps): ExampleItem[] =>
    sortItems(store[STORE_KEY].state.list),
};

const exampleStore = (actions: StoreActionProps) => ({
  [STORE_KEY]: {
    state,
    selectors,
    methods: exampleMethods(actions),
  },
});

export default exampleStore;
