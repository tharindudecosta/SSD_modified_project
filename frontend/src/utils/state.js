import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  supplierId: "",
  user: null,
  siteManagerId: "",
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };
