import { Dimensions, Platform } from "react-native";

import { currentLanguage, resources } from "localization";

export const isIOS = Platform.OS === "ios";
export const MAJOR_VERSION_IOS = 12;
export const majorVersionIOS = parseInt(String(Platform.Version), 10);
export const isAlreadyMajorIOS = isIOS && majorVersionIOS > MAJOR_VERSION_IOS;
export const ACTIVE_OPACITY = 0.7;

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const SMALL_DEVICE_HEIGHT = 660;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const OPEN_SHEET_HEIGHT = DEVICE_HEIGHT / 5;
export const LANGUAGE_STORAGE_KEY = "language";
export const STICKY_HEADER_HEIGHT = 106;
export const BACKSPACE = "Backspace";
export const UKR_PHONE_CODE = "+380";
export const SUPPORT_PHONE_NUMBER = "0443449000";
// use this variale to set path into your useTranslation t(localization.auth.path.to.your.item)
export const localization =
  resources[currentLanguage as keyof typeof resources].translation;

export const SENTRY_CUSTOM_EVENTS_MESSAGES = {
  marketNewVersionAccepted: "CUSTOM: NewAppStoreVersion AGREE press",
  marketNewVersionRefused: "CUSTOM: NewAppStoreVersion REFUSE press",
  otpAutoFillErrorLog: "CUSTOM: react-native-otp-verify error",
};
