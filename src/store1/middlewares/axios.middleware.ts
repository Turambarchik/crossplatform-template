import axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as R from "ramda";
import base64 from "react-native-base64";
import Config from "react-native-config";
import { showMessage } from "react-native-flash-message";
import { Store } from "redux";
import axiosMiddlewareFactory from "redux-axios-middleware";

import { loadingAction } from "modules/app/store/app.actions";
import { AxiosPayloadRequest } from "store/types";

import { RootReducerType } from "../rootReducer";

const axiosClient = axios.create({
  baseURL: Config.BASE_URL,
  responseType: "json",
});

const axiosMiddlewareOptions = {
  interceptors: {
    request: [
      (
        { getState, dispatch }: Store<RootReducerType>,
        request: AxiosPayloadRequest & AxiosRequestConfig
      ) => {
        const state = getState();
        const token = state.auth.token;
        const Authorization = base64.encode(`${Config.KEY}-${Config.SECRET}`);

        if (request?.internalPayload?.setLoading) {
          dispatch(loadingAction(true));
        }

        request.headers = R.assoc(
          "Authorization",
          Authorization,
          request.headers
        );

        if (token) {
          request.headers = R.assoc(
            "Authorization",
            Authorization,
            request.headers
          );
        }

        return request;
      },
    ],
    response: [
      {
        success: (_: Store<RootReducerType>, response: Response) => {
          return Promise.resolve(response);
        },
        error: ({ getState }: Store<RootReducerType>, error: AxiosError) => {
          // Response Error Interception
          const state = getState();
          if (
            R.or(state.app.isNetworkError, R.equals(error?.code, "ERR_NETWORK"))
          ) {
            showMessage({
              message: "Network connection error",
              type: "danger",
            });
            return;
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};

const axiosMiddleware = axiosMiddlewareFactory(
  axiosClient,
  axiosMiddlewareOptions
);

export default axiosMiddleware;
