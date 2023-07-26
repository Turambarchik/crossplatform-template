import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";

export const VerifySmsCodeStyles = {
  Wrapper: styled(Screen)`
    justify-content: space-between;
    padding: 0 24px 52px 24px;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz32",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: center;
    line-height: 40px;
    margin-bottom: 16px;
  `,
  ButtonText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "tertiaryColor",
  })`
    line-height: 24px;
  `,
  Info: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw300",
    color: "neutralColor2",
  })`
    line-height: 24px;
  `,
  PhoneNumber: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw700",
    color: "secondaryColor",
  })`
    line-height: 24px;
    margin-bottom: 16px;
  `,
  InputsContainer: styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 40px;
  `,
  KeyboardAvoidingViewStyled: styled(KeyboardAvoidingView)`
    margin-bottom: auto;
  `,
  SendAgain: styled(Typography).attrs({
    fs: "fs12",
    fw: "fw500",
    color: "primaryColor",
  })`
    font-size: 12px;
    line-height: 18px;
    margin-top: 4px;
  `,
  TimeToSend: styled(Typography).attrs({
    fs: "fs12",
    fw: "fw400",
    color: "neutralColor3",
  })`
    font-size: 12px;
    line-height: 18px;
  `,
};
