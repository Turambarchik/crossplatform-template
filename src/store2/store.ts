import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PersistStorage } from "easy-peasy";
import { createStore, createTypedHooks, persist } from "easy-peasy";
import { createLogger } from "redux-logger";

import { isIOS } from "helpers/constants";
import appModel from "modules/app/store/app.store";
import commonModel from "modules/app/store/common.store";
import authModel from "modules/auth/store/auth.store";
import newsModel from "modules/news/store/news.store";
import notificationModel from "modules/notification-history/store/notification.store";
import profileModel from "modules/profile/store/profile.store";
import requestsModel from "modules/requests/store/requests.store";

import type { StoreModel } from "./store.types";

// soltuion to use persist storage from easy-peasy for IOS devices https://github.com/ctrlplusb/easy-peasy/issues/599#issuecomment-781258630
if (isIOS) {
  (window as any).requestIdleCallback = null;
}

export const storeModel: StoreModel = {
  app: appModel,
  auth: authModel,
  common: commonModel,
  profile: profileModel,
  news: newsModel,
  notification: notificationModel,
  requests: requestsModel,
};

const loggerMiddleware = createLogger({
  collapsed: true,
});

const store = createStore<StoreModel>(
  persist(storeModel, {
    storage: {
      getItem: async function (key: string) {
        const value = await AsyncStorage.getItem(key);
        return JSON.parse(value as string);
      },
      setItem: function <T>(key: string, value: T) {
        AsyncStorage.setItem(key, JSON.stringify(value));
      },
    } as PersistStorage,
    allow: ["app", "auth"],
  }),
  {
    middleware: [loggerMiddleware],
  }
);

export const { useStoreActions, useStoreState, useStoreDispatch } =
  createTypedHooks<StoreModel>();

export default store;
