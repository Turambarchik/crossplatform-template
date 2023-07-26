import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const ObjectsModalStyles = {
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
    line-height: 32;
  `,
  Separator: styled.View<{ marginTop?: number; marginBottom?: number }>`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.borderColor};
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
    margin-bottom: ${({ marginBottom }) => defaultZero(marginBottom)}px;
  `,
  RadioButtonsContainer: styled.View`
    padding: 15px 0px;
  `,
  Button: styled(Button)`
    margin-top: 16px;
  `,
  ButtonText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "tertiaryColor",
  })`
    line-height: 24px;
  `,
};
