import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";

export const RadioButtonStyles = {
  Wrapper: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Text: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "primaryColor",
  })`
    line-height: 24px;
    margin-left: 12;
  `,
  RadioIcon: styled.View`
    position: absolute;
    left: 22.22%;
    right: 22.22%;
    top: 22.22%;
    bottom: 22.22%;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.components.button.primaryColor};
  `,
  Container: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    width: 18px;
    height: 18px;
    border-radius: 10px;
    border-width: 1;
    border-color: ${({ theme }) => theme.components.button.primaryColor};
    align-items: center;
    justify-content: center;
  `,
};
