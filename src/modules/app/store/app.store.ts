import axios from "axios";
import { action, thunk } from "easy-peasy";
import { isNil } from "ramda";
import type { GetResponseDTO, SpacesType } from "types";

import { filteredFromActionsModel } from "helpers/functions";

import type { AppModel } from "./app.store.types";

const appModel: AppModel = {
  // manage application theme
  isDarkTheme: true,
  setIsDarkTheme: action((state, payload) => {
    state.isDarkTheme = payload;
  }),

  // loggin info
  timesToLogin: 0,
  setTimesToLogin: action((state) => {
    state.timesToLogin += 1;
  }),
  setTimesToLoginReset: action((state) => {
    state.timesToLogin = 0;
  }),
  isFirstEntry: true,
  setIsFirstEntry: action((state, payload) => {
    state.isFirstEntry = payload;
  }),

  // biometric info
  isBiometricActive: false,
  setIsBiometricActive: action((state, payload) => {
    state.isBiometricActive = payload;
  }),

  currentSpace: null,
  setCurrentSpace: action((state, payload) => {
    state.currentSpace = payload;
  }),
  isOnboarded: false,
  setIsOnboarded: action((state, payload) => {
    state.isOnboarded = payload;
  }),
  mySpaces: null,
  setMySpaces: action((state, payload) => {
    state.mySpaces = payload;
  }),
  getMySpaces: thunk(async (actions, payload, { getState }) => {
    const modelState = getState();
    try {
      const { data } = await axios.get<GetResponseDTO<SpacesType>>(
        "spaces/my-spaces"
      );

      actions.setMySpaces(data["hydra:member"]);
      const mySpacedIds = data["hydra:member"].map((el) => el.id);
      if (
        isNil(modelState.currentSpace) ||
        !mySpacedIds.includes(modelState.currentSpace.id)
      ) {
        actions.setCurrentSpace(data["hydra:member"][0]);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getMySpaces");
    }
  }),
  reset: action((state) => {
    const filteredAppModel = filteredFromActionsModel(appModel);
    Object.assign(state, filteredAppModel);
  }),
};

export default appModel;
