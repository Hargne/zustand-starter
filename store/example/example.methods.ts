import produce from "immer";

import { StoreActionProps } from "../store.types";

const exampleMethods = (actions: StoreActionProps) => ({
  fetchList: async () => {
    try {
      const newList = ["Item"];
      actions.set((rootStore) => {
        rootStore.example.state.list = newList;
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  addToList: async (item: string) => {
    actions.set((rootStore) => {
      rootStore.example.state.list = produce(
        rootStore.example.state.list,
        (draft) => {
          draft.push(item);
        }
      );
    });
  },
});
export default exampleMethods;
