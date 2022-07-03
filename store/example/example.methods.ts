import produce from "immer";

import { StoreActionProps } from "../store.types";
import { generateRandomId } from "../store.utils";
import { ExampleItem } from "./example.types";

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
          id: generateRandomId(),
          content,
        });
      });
      rootStore.example.state.list = sortExampleItems(updatedList);
    });
  },
});
export default exampleMethods;
