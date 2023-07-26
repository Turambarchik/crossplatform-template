import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useTheme } from "styled-components";

import { HeaderBackButton } from "components/atoms/header-back-button/HeaderBackButton";
import { HeaderBackground } from "components/atoms/header-background/HeaderBackground";
import { localization } from "helpers/constants";
import { navigate, navigationRef } from "helpers/navigation";
import { AuthRoutes } from "modules/auth/auth.router";
import Login from "modules/auth/screens/login/Login";
import NewsDetails from "modules/news/screens/news-details/NewsDetails";
import Notification from "modules/notification-history/screens/notification/Notification";
import ApartmentDetails from "modules/profile/screens/apartment-details/ApartmentDetails";
import ResidentDetails from "modules/profile/screens/resident-details/ResidentDetails";
import { HeaderCloseButton } from "modules/requests/components/header-close-button/HeaderCloseButton";
import { HeaderTitle } from "modules/requests/components/header-title/HeaderTitle";
import ActiveRequest from "modules/requests/screens/active-request/ActiveRequest";
import ActiveRequestDetails from "modules/requests/screens/active-request-details/ActiveRequestDetails";
import { PickCategory } from "modules/requests/screens/create-new-order/pick-category/PickCategory";
import { PickFilesAndAddText } from "modules/requests/screens/create-new-order/pick-files-and-add-text/PickFilesAndAddText";
import { PickSpace } from "modules/requests/screens/create-new-order/pick-space/PickSpace";
import { useStoreState } from "store/store";

import type { RootStackParams } from "./Routes";
import { Routes } from "./Routes";
import { TabRoutes } from "./TabRoutes";

export const PrivateStack = createNativeStackNavigator<RootStackParams>();

const PrivateNavigator = () => {
  const theme = useTheme();

  const {
    common: { isLoged },
  } = useStoreState((state) => state);

  return (
    <PrivateStack.Navigator
      initialRouteName={isLoged ? Routes.TabBar : Routes.LogIn}
      screenOptions={{
        headerTitleAlign: "center",
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <PrivateStack.Screen name={Routes.TabBar} component={TabRoutes} />
      <PrivateStack.Screen
        name={Routes.LogIn}
        component={Login}
        initialParams={{
          pushNotifItemId: undefined,
          pushItemType: undefined,
          notificationId: undefined,
        }}
      />
      <PrivateStack.Screen
        name={Routes.ApartmentDetails}
        component={ApartmentDetails}
        options={() => ({
          headerShown: true,
          title: localization.profile.apartment,
          headerShadowVisible: false,
          headerBackground: () => <HeaderBackground />,
          headerTransparent: true,
          headerLeft: () => <HeaderBackButton />,
          headerStyle: {
            backgroundColor: theme.colors.opacityBg,
          },
        })}
      />
      <PrivateStack.Screen
        name={Routes.ResidentDetails}
        component={ResidentDetails}
        options={() => ({
          headerShown: true,
          headerShadowVisible: false,
          title: localization.profile.resident,
          headerLeft: () => <HeaderBackButton />,
        })}
      />
      <PrivateStack.Screen
        name={Routes.NewsDetails}
        component={NewsDetails}
        options={({ navigation }) => ({
          headerShown: true,
          title: localization.general.news,
          headerShadowVisible: false,
          headerBackground: () => <HeaderBackground />,
          headerTransparent: true,
          headerLeft: () => (
            <HeaderBackButton
              navigateBackCustom={() => {
                navigation.navigate(Routes.TabBar);
              }}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors.opacityBg,
          },
        })}
      />
      <PrivateStack.Screen
        name={Routes.Notification}
        component={Notification}
        options={() => ({
          headerShown: true,
          headerShadowVisible: false,
          title: localization.notification.notification,
          headerLeft: () => <HeaderBackButton />,
        })}
      />
      <PrivateStack.Screen
        name={Routes.ActiveRequestDetails}
        component={ActiveRequestDetails}
        options={() => ({
          headerShown: true,
          title: localization.requests.details_review,
          headerLeft: () => <HeaderBackButton />,
        })}
      />
      <PrivateStack.Screen
        name={Routes.ActiveRequest}
        component={ActiveRequest}
      />
      <PrivateStack.Screen
        name={Routes.PickSpace}
        component={PickSpace}
        options={() => ({
          headerShown: true,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderCloseButton />,
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.opacityBg,
          },
        })}
      />
      <PrivateStack.Screen
        name={Routes.PickCategory}
        component={PickCategory}
      />
      <PrivateStack.Screen
        name={Routes.PickFilesAndAddText}
        component={PickFilesAndAddText}
      />
    </PrivateStack.Navigator>
  );
};

const AppRoutes = () => {
  const {
    auth: { isAuth, isTriggeredFullLogout },
  } = useStoreState((state) => state);

  useEffect(() => {
    if (isTriggeredFullLogout) {
      navigate(Routes.Auth);
    }
  }, [isTriggeredFullLogout]);

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuth ? <PrivateNavigator /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default AppRoutes;
