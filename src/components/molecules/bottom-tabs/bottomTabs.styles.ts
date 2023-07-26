import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { isIOS } from "helpers/constants";

export const BottomTabsStyles = {
  Wrapper: styled(SafeAreaView)`
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  Container: styled.View`
    height: 65px;
    flex-direction: row;
  `,
  InnerContainer: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    ${!isIOS && "margin-bottom: 10px;"}
  `,
  TabIconWrapper: styled.View`
    margin-top: 15;
    align-items: center;
    justify-content: center;
  `,
  TabIconText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw400",
  })<{ isFocused: boolean }>`
    margin-top: 5px;
    color: ${({ theme, isFocused }) =>
      isFocused
        ? theme.components.typography.primaryColor
        : theme.components.typography.neutralColor3};
  `,
};
