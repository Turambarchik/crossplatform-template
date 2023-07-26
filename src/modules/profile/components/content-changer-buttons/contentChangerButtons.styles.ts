import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const ContentChangerButtonStyles = {
  Wrapper: styled.View<{
    marginTop?: number;
  }>`
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  RegularText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{
    isSelected: boolean;
  }>`
    line-height: 24px;
    color: ${({ theme, isSelected }) =>
      isSelected
        ? theme.components.typography.primaryColor
        : theme.components.typography.neutralColor3};
  `,
  ChangerButton: styled(Button)`
    margin-right: 1%;
    width: 49%;
    border-bottom-color: ${({ theme }) => theme.colors.primaryBg};
    border-color: black;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
};
