import { defaultTo } from "ramda";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const NotificationStyles = {
  Wrapper: styled.Pressable`
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    width: 100%;
    margin-bottom: 16px;
    border-radius: 16px;
  `,
  BaseText: styled(Typography).attrs(({ fz }) => ({
    fz: defaultTo("fz14", fz),
    fw: "fw400",
    color: "neutralColor2",
  }))<{ marginRight?: number }>`
    line-height: 24px;
    margin-right: ${({ marginRight }) => defaultZero(marginRight)}px;
  `,
  MainText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{ marginRight?: number }>`
    line-height: 24px;
    margin-right: ${({ marginRight }) => defaultZero(marginRight)}px;
  `,
  Flex: styled.View<{ justifyContent?: string; marginTop?: number }>`
    width: 100%;
    align-items: center;
    justify-content: ${({ justifyContent }) =>
      defaultTo("flex-start", justifyContent)};
    flex-direction: row;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
};
