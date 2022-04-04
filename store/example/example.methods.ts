import { StoreActionProps } from "../store.types";

export const fetchList = (actions: StoreActionProps) => async () => {
  try {
    const newList = ["Item"];
    actions.set((store) => {
      store.example.state.list = newList;
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addToList =
  (actions: StoreActionProps) => async (item: string) => {
    actions.set((store) => {
      store.example.state.list = [...store.example.state.list, item];
    });
  };
