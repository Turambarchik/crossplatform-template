import { StackActions, useNavigation } from "@react-navigation/native";
import { and, isNil } from "ramda";
import { useCallback } from "react";

import type { RootStackParams } from "../modules/app/Routes";
import type { Routes } from "../modules/app/Routes";
import { useSetHeader } from "./useHeader";

/*
 *
 *   Hook for some sort of override navigation, like in case with push notification, when initial state could be push screen
 *
 */

export const useOverrideNavigation = (openedFromPush?: boolean) => {
  const { getState, goBack, dispatch, navigate } = useNavigation();
  const { setRequestHeader } = useSetHeader();

  const goBackFromPush = useCallback(
    <T extends keyof RootStackParams>(
      rootRoute: T,
      nesting: RootStackParams[T],
      isReplaced = false
    ) => {
      const isBackAvailableFromPush = getState().routes.length <= 1;
      if (and(!isNil(openedFromPush), isBackAvailableFromPush)) {
        if (isReplaced) {
          dispatch(StackActions.replace(rootRoute, nesting));
        } else {
          navigate(rootRoute as Routes, nesting as never);
        }
      } else {
        goBack?.();
      }
    },
    [dispatch, getState, goBack, navigate, openedFromPush]
  );

  return {
    goBackFromPush,
    setRequestHeader,
  };
};
