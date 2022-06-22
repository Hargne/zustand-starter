import produce from "immer";

import { StoreActionProps } from "../store.types";
import { ExampleItem } from "./example.types";

const generateId = () => "_" + new Date().getTime();
export const sortExampleItems = (list: ExampleItem[]) =>
  list.slice().sort((a, b) => (a.content < b.content ? -1 : 1));

const exampleMethods = (actions: StoreActionProps) => ({
  fetchList: async () => {
    actions.set((rootStore) => {
      rootStore.example.state.list = sortExampleItems([
        { id: "1", content: "Item 1" },
        { id: "2", content: "Item 2" },
      ]);
    });
  },
  addToList: async (content: ExampleItem["content"]) => {
    actions.set((rootStore) => {
      const updatedList = produce(rootStore.example.state.list, (draft) => {
        draft.push({
          id: generateId(),
          content,
        });
      });
      rootStore.example.state.list = sortExampleItems(updatedList);
    });
  },
});
export default exampleMethods;
