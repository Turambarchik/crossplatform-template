import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import type { Actions } from "easy-peasy";
import { action, thunk } from "easy-peasy";
import { Platform } from "react-native";

import { filteredFromActionsModel } from "helpers/functions";
import type { GetUserTokenResponseDTO, StoreModel } from "store/store.types";

import {
  setBiometricFormData,
  setInitialVerificationFormData,
  setTokenCreatePinCode,
  setTokenInitialVerification,
} from "../auth.functions";
import type { AuthModel } from "./auth.store.types";

export const TIMES_CAN_TO_LOGIN = 3;

const authModel: AuthModel = {
  isAuth: false,
  setIsAuth: action((state, payload) => {
    state.isAuth = payload;
  }),
  token: null,
  setToken: action((state, payload) => {
    state.token = payload;
  }),
  pinCode: null,
  setPinCode: action((state, payload) => {
    state.pinCode = payload;
  }),
  timeToSendCode: null,
  setTimeToSendCode: action((state, payload) => {
    state.timeToSendCode = payload;
  }),
  refreshToken: null,
  setRefreshToken: action((state, payload) => {
    state.refreshToken = payload;
  }),

  isTriggeredFullLogout: false,
  setIsTriggeredFullLogout: action((state, payload) => {
    state.isTriggeredFullLogout = payload;
  }),
  reset: action((state) => {
    const filteredAuthModel = filteredFromActionsModel(authModel);
    Object.assign(state, filteredAuthModel);
  }),
  logout: thunk(async (actions, payload, helpers) => {
    const storeActions = helpers.getStoreActions() as Actions<StoreModel>;
    try {
      const deviceId = await messaging().getToken();
      axios.delete(`gadgets/${deviceId}`);
      axios.delete(`gadget-tokens/${deviceId}`, {
        headers: { "content-type": "application/ld+json" },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting logout");
    } finally {
      actions.reset();
      storeActions.news.reset();
      storeActions.app.reset();
      storeActions.app.setIsOnboarded(true);
      storeActions.common.reset();
      storeActions.notification.reset();
      storeActions.profile.reset();
      storeActions.requests.reset();
    }
  }),
  signInWithBiometricThunk: thunk(async (actions, payload, helpers) => {
    try {
      const storeActions = helpers.getStoreActions() as Actions<StoreModel>;

      const { data } = await axios.post<GetUserTokenResponseDTO>(
        "token",
        setBiometricFormData({
          id: payload.id,
          signature: payload.signature,
        }),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { access_token, refresh_token } = data;

      actions.setRefreshToken(refresh_token);
      actions.setToken(access_token);
      storeActions.common.setIsLoged(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting signInWithBiometricThunk");
    }
  }),

  initialVerification: thunk(async (actions, payload, helpers) => {
    try {
      const { data: tokenData } = await axios.post<GetUserTokenResponseDTO>(
        "token",
        setTokenInitialVerification({ phone: payload.phone }),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { access_token } = tokenData;

      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      // NOTE: this is initial verification but we must used on mobile phone-verfification
      await axios.post(
        "users/phone-verification",
        setInitialVerificationFormData({
          phone: payload.phone,
          agreement: payload.agreement,
        }),
        config
      );
      actions.setRefreshToken(access_token);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        payload.setErrorMessage(e?.response?.data["hydra:description"]);
        actions.setTimeToSendCode(
          e.response?.data.violations[0].payload.availableIn
        );
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting");
    }
  }),
  validateCode: thunk(async (actions, payload, helpers) => {
    const modelState = helpers.getState();
    try {
      const config = {
        headers: { Authorization: `Bearer ${modelState.refreshToken}` },
      };

      await axios.post(
        "users/code-check",
        {
          phone: payload.phone,
          code: payload.smsCode,
        },
        config
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        payload.setErrorMessage(e?.response?.data["hydra:description"]);
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting");
    }
  }),
  createPinCode: thunk(async (actions, payload, helpers) => {
    const storeActions = helpers.getStoreActions() as Actions<StoreModel>;
    try {
      const { data } = await axios.post<GetUserTokenResponseDTO>(
        "token",
        setTokenCreatePinCode({
          phone: payload.phone,
          smsCode: payload.smsCode,
        }),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { access_token, refresh_token } = data;

      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "content-type": "application/ld+json",
        },
      };
      await messaging().requestPermission();
      const deviceId = await messaging().getToken();

      await axios.post("gadgets", { id: deviceId, os: Platform.OS }, config);

      storeActions.common.setIsLoged(true);
      storeActions.app.setTimesToLoginReset();
      actions.setToken(access_token);
      actions.setRefreshToken(refresh_token);
      actions.setPinCode(payload.pinCode);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error", e);
      }
      throw new Error("Aborting createPinCode");
    }
  }),
};

export default authModel;
