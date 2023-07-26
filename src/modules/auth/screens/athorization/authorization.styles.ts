import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";
import { isIOS } from "helpers/constants";

export const AuthorizationStyles = {
  Wrapper: styled(Screen)`
    justify-content: space-between;
    padding: 0 24px 28px 24px;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz32",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: center;
    line-height: 40px;
    margin-bottom: 56px;
  `,
  ButtonText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "tertiaryColor",
  })`
    line-height: 24px;
  `,
  KeyboardAvoidingView: styled.KeyboardAvoidingView`
    width: 100%;
  `,
  PrivacyPolicyContainer: styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 24px;
  `,
  PrivacyPolicyText: styled(Typography).attrs({
    fs: "fs12",
    fw: "fw400",
    color: "infoColor",
  })`
    text-align: center;
    align-content: center;
    line-height: 18px;
    padding-bottom: ${isIOS ? 1 : 2}px;
  `,
  PrivacyPolicyLink: styled(Typography).attrs({
    fs: "fs12",
    fw: "fw400",
    color: "primaryColor",
  })`
    line-height: 18px;
  `,
  UnderlineContainer: styled.View`
    border-bottom-width: 1;
  `,
};
