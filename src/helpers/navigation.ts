import type { NavigationContainerRef } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { createRef } from "react";

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.dispatch(CommonActions.navigate({ name, params }));
  } else {
    console.warn("You can decide what to do if the app hasn't mounted");
  }
}

export function getCurrentRouteName() {
  if (navigationRef?.current) {
    return navigationRef?.current?.getCurrentRoute()?.name;
  }
}
