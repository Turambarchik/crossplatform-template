import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Typography } from "components/atoms/typography/Typography";

export const UnCorrectPinCodeModalStyles = {
  Wrapper: styled.View`
    flex: 1;
    width: 100%;
    justify-content: flex-end;
  `,
  Container: styled.View`
    border-radius: 16px;
    padding: 16px 24px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  Line: styled.View`
    top: -10;
    width: 64;
    height: 3px;
    align-self: center;
    position: absolute;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: center;
    line-height: 32;
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "infoColor",
  })`
    margin-top: 16px;
    text-align: center;
    line-height: 24px;
  `,
  AgreeButton: styled(Button)`
    margin-top: 16px;
  `,
  AgreeText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "tertiaryColor",
  })`
    line-height: 24px;
  `,
};
