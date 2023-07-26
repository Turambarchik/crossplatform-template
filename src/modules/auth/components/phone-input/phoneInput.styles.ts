import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";

export const PhoneInputStyles = {
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
    height: 48px;
  `,
  PhoneText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "secondaryColor",
  })`
    line-height: 28px;
  `,
  PhoneTextInput: styled.TextInput.attrs({
    textAlignVertical: "bottom",
  })`
    width: auto;
    height: 100%;
    padding: 12px;
    padding-top: 9px;
    padding-bottom: 9px;
    font-size: ${({ theme }) => theme.fontSizes.fz22}px;
    font-family: ${({ theme }) => theme.fontWeight.fw500};
    color: ${({ theme }) => theme.components.typography.secondaryColor};
  `,
};
