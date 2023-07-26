import { action } from "easy-peasy";

import { filteredFromActionsModel } from "helpers/functions";

import type { CommonModel } from "./common.store.types";

// NOTE: commonModel does NOT saved to persist storage instead of app and auth models
const commonModel: CommonModel = {
  // loggin info
  isLoged: false,
  setIsLoged: action((state, payload) => {
    state.isLoged = payload;
  }),
  // network info
  isNetworkError: false,
  setIsNetworkError: action((state, payload) => {
    state.isNetworkError = payload;
  }),
  reset: action((state) => {
    const filteredCommonModel = filteredFromActionsModel(commonModel);
    Object.assign(state, filteredCommonModel);
  }),
};

export default commonModel;
