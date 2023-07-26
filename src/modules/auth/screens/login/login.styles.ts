import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";

export const LoginStyles = {
  Wrapper: styled(Screen)`
    justify-content: space-between;
    padding: 0 24px 52px 24px;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: center;
    line-height: 32px;
  `,
  BiometricContainer: styled.View`
    align-items: center;
    justify-content: space-between;
  `,
  Footer: styled.View`
    height: 85%;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
  `,
  NotRememberCodeContainer: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    flex-direction: row;
    align-items: center;
  `,
  NotRememberCode: styled(Typography).attrs({
    fs: "fs12",
    fw: "fw500",
    color: "primaryColor",
  })`
    margin-right: 8px;
    text-align: center;
    line-height: 12px;
  `,
};
