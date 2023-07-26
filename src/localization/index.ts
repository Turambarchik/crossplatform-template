import AsyncStorage from "@react-native-async-storage/async-storage";
import type { LanguageDetectorAsyncModule } from "i18next";
import i18n from "i18next";
import { or } from "ramda";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import { LANGUAGE_STORAGE_KEY } from "helpers/constants";

import ua from "./translations/ua.json";

export const DEFAULT_LOCALE = "ua";

export const resources = {
  ua: {
    translation: ua,
  },
};

export const defaultLanguage = or(
  RNLocalize.findBestAvailableLanguage(Object.keys(resources))?.languageTag,
  DEFAULT_LOCALE
);

export const currentLanguage = or(i18n.language, defaultLanguage);

const useLanguageStorage: LanguageDetectorAsyncModule = {
  async: true,
  type: "languageDetector",
  detect: async function (
    callback
  ): Promise<string | readonly string[] | undefined> {
    AsyncStorage.getItem(LANGUAGE_STORAGE_KEY).then((lang) => {
      if (lang) return callback(lang);
    });

    return;
  },
  init: () => null,
  cacheUserLanguage: async (language: string) => {
    AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  },
};

i18n
  .use(useLanguageStorage)
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LOCALE,
    compatibilityJSON: "v3",
    fallbackLng: defaultLanguage,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
