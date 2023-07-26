import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "styled-components";

import { HeaderBackButton } from "components/atoms/header-back-button/HeaderBackButton";
import type { RootStackParams } from "modules/app/Routes";
import { Routes } from "modules/app/Routes";
import Onboarding from "modules/onboarding/screens/Onboarding";
import { useStoreState } from "store/store";

import Authorization from "./screens/athorization/Authorization";
import CreatePinCode from "./screens/create-pin-code/CreatePinCode";
import VerifyPinCode from "./screens/verify-pin-code/VerifyPinCode";
import VerifySmsCode from "./screens/verify-sms-code/VerifySmsCode";

const AuthStack = createNativeStackNavigator<RootStackParams>();

export const AuthRoutes = () => {
  const theme = useTheme();
  const {
    app: { isOnboarded },
  } = useStoreState((state) => state);

  return (
    <AuthStack.Navigator
      initialRouteName={!isOnboarded ? Routes.Onboarding : Routes.Auth}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={Routes.Onboarding} component={Onboarding} />
      <AuthStack.Screen name={Routes.Auth} component={Authorization} />
      <AuthStack.Screen
        name={Routes.VerifySmsCode}
        component={VerifySmsCode}
        options={() => ({
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: theme.colors.primaryBg,
          },
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackButton />,
        })}
      />
      <AuthStack.Screen name={Routes.CreatePinCode} component={CreatePinCode} />
      <AuthStack.Screen name={Routes.VerifyPinCode} component={VerifyPinCode} />
    </AuthStack.Navigator>
  );
};
