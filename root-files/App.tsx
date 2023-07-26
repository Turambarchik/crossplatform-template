import { StoreProvider } from "easy-peasy";
import type { FC } from "react";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import SplashScreen from "react-native-splash-screen";
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";

import { routingInstrumentation } from "services/sentry";
import store from "store/store";
import theme from "theme/theme";

import "services/sentry";
import "localization/index";
import RootContainer from "./RootContainer";

enableScreens(true);

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StoreProvider store={store}>
      <Container>
        <ThemeProvider theme={theme}>
          <GestureHandlerRootViewFlex>
            <RootContainer routingInstrumentation={routingInstrumentation} />
          </GestureHandlerRootViewFlex>
        </ThemeProvider>
      </Container>
    </StoreProvider>
  );
};

const Container = styled.View`
  flex: 1;
`;

const GestureHandlerRootViewFlex = styled(GestureHandlerRootView)`
  flex: 1;
`;
export default App;
