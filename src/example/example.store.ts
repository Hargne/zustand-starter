import * as methods from "./example.methods";
import { ExampleStore } from "./example";
import { prepareStoreEntry } from "../utils";

export default prepareStoreEntry<ExampleStore>({
  state: {
    list: [],
  },
  methods,
});
