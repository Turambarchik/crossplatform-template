import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Toaster } from "components/molecules/toaster/Toaster";
import AppRoutes from "modules/app/AppRoutes";
import useNetworkController from "services/useNetworkController";
import { usePushNotifications } from "services/usePushNotifications";
import { useSetUnreadNotifications } from "services/useSetUnreadNotifications";
const RootContainer = () => {
  useNetworkController();
  useSetUnreadNotifications();
  usePushNotifications();

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Toaster />
      <AppRoutes />
    </SafeAreaProvider>
  );
};

export default RootContainer;
