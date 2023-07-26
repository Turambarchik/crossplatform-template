import { useNavigation } from "@react-navigation/native";
import { and, any, anyPass, equals } from "ramda";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";
import type PagerView from "react-native-pager-view";
import {
  runOnJS,
  useDerivedValue,
  useEvent,
  useHandler,
  useSharedValue,
} from "react-native-reanimated";

import { Routes } from "modules/app/Routes";
import { useStoreActions } from "store/store";

const DARK_SCREENS_INDEX = [1, 3];

export const useOnboarding = (length: number) => {
  const currentIndexPage = useSharedValue(0);

  const {
    app: { setIsOnboarded },
  } = useStoreActions((actions) => actions);

  const navigation = useNavigation();

  const { t } = useTranslation();

  const viewPager = useRef<PagerView>(null);

  const usePagerScrollHandler = (handlers: any, dependencies?: any) => {
    const { context, doDependenciesDiffer } = useHandler(
      handlers,
      dependencies
    );
    const subscribeForEvents = ["onPageScroll"];

    return useEvent<any>(
      (event) => {
        "worklet";
        const { onPageScroll } = handlers;
        if (onPageScroll && event.eventName.endsWith("onPageScroll")) {
          onPageScroll(event, context);
        }
      },
      subscribeForEvents,
      doDependenciesDiffer
    );
  };

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      "worklet";
      currentIndexPage.value = e.position;
    },
  });

  const setStatusBarStyle = (result: number) => {
    const arrPredicates = [
      (pageIndex: number) =>
        any((value) => equals(value, pageIndex), DARK_SCREENS_INDEX),
    ];

    StatusBar.setBarStyle(
      anyPass(arrPredicates)(result) ? "dark-content" : "light-content",
      true
    );
  };

  const goToTheSlide = (slideIndex: number) => {
    if (and(!equals(slideIndex, length), slideIndex > 0)) {
      viewPager.current?.setPage(slideIndex);
      currentIndexPage.value = slideIndex;
    }
  };

  const onClickLastSlide = () => {
    setIsOnboarded(true);
    navigation.navigate(Routes.Auth);
    StatusBar.setBarStyle("dark-content");
    return;
  };

  useDerivedValue(() => {
    runOnJS(setStatusBarStyle)(currentIndexPage.value);
  }, [currentIndexPage]);

  return {
    currentIndexPage,
    viewPager,
    usePagerScrollHandler,
    goToTheSlide,
    onClickLastSlide,
    handler,
    t,
  };
};
