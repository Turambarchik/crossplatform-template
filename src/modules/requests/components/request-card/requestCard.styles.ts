import { defaultTo } from "ramda";
import styled from "styled-components/native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const NotificationStyles = {
  Wrapper: styled.Pressable`
    padding: 16px 12px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    width: 100%;
    margin-bottom: 16px;
    border-radius: 16px;
  `,
  FlexWrapper: styled.View<{ marginTop?: number }>`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 16px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  BaseText: styled(Typography).attrs(({ fz }) => ({
    fz: defaultTo("fz12", fz),
    fw: "fw300",
    color: "infoColor",
  }))<{ marginLeft?: number; marginRight?: number; marginTop?: number }>`
    line-height: 12px;
    margin-left: ${({ marginLeft }) => defaultZero(marginLeft)}px;
    margin-right: ${({ marginRight }) => defaultZero(marginRight)}px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  MainText: styled(Typography).attrs(({ fz, fw }) => ({
    fz: defaultTo("fz12", fz),
    fw: defaultTo("fw400", fw),
    color: "primaryColor",
  }))`
    line-height: 21px;
  `,
  Flex: styled.View<{ justifyContent?: string; marginTop?: number }>`
    width: 100%;
    align-items: center;
    justify-content: ${({ justifyContent }) =>
      defaultTo("flex-start", justifyContent)};
    flex-direction: row;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  Box: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Icon: styled(SVGIcon)``,
  DescriptionWrapper: styled.View`
    padding: 12px;
    padding-right: 0;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  LeaveFeedbackWrapper: styled.Pressable`
    width: 100%;
    padding: 2px 0px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  `,
};
