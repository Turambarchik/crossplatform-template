import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { assoc, defaultTo, equals, pipe } from "ramda";
import { Config } from "react-native-config";

import { setRefreshTokenFormData } from "modules/auth/auth.functions";

import store from "./store";
import type { GetUserTokenResponseDTO } from "./store.types";
import { APIErrorsResponse } from "./store.types";

axios.defaults.baseURL = Config.BASE_URL;

let countOfConnections = 0;
const MAX_CONNECTIONS_LIMIT = 3;

export const newAbortSignal = (timeoutMs: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);
  return abortController.signal;
};

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { token } = store.getState()?.auth;

    if (token) {
      config.headers = pipe(
        assoc(
          "Content-Type",
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          defaultTo("application/json", config.headers?.getContentType?.())
        ),
        assoc("Authorization", `Bearer ${token}`)
      )(config.headers);
    }

    return assoc(
      "signal",
      defaultTo(newAbortSignal(15000), config.signal),
      config
    );
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const storeActions = store.getActions();
    console.error({ error });
    const { refreshToken } = store.getState()?.auth;

    if (equals(error.message, APIErrorsResponse.abortingError)) {
      storeActions.common.setIsNetworkError(true);
    }

    if (equals(error.message, APIErrorsResponse.networkError)) {
      storeActions.common.setIsNetworkError(true);
    }

    if (equals(error?.response.status, APIErrorsResponse.invalid_token)) {
      countOfConnections++;

      if (countOfConnections >= MAX_CONNECTIONS_LIMIT) {
        countOfConnections = 0;
        storeActions.auth.setIsTriggeredFullLogout(true);
        storeActions.auth.setIsAuth(false);
      } else {
        const originalRequest = error.config;

        return new Promise((resolve, reject) => {
          axios
            .post("token", setRefreshTokenFormData(refreshToken), {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res: { data: GetUserTokenResponseDTO }) => {
              const { auth } = store.getActions();

              auth.setRefreshToken(res?.data?.refresh_token);
              auth.setToken(res?.data?.access_token);
              originalRequest.headers.Authorization = `Bearer ${res?.data?.access_token}`;
              resolve(axios(originalRequest));
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
    }

    if (equals(error?.response.status, APIErrorsResponse.inactivate_user)) {
      // TODO: process inactive user
      console.warn("inactivate_user");
    }

    return Promise.reject(error);
  }
);
