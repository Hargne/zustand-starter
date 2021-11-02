import { StoreActions } from "../index.d";

export const fetchList = (actions: StoreActions) => async () => {
  try {
    const newList = ["Item"];
    actions.set((store) => {
      store.example.state.list = newList;
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
