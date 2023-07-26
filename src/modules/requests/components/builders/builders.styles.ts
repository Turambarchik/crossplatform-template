import { defaultTo } from "ramda";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { RichText } from "components/molecules/rich-text/RichText";
import { defaultZero } from "helpers/functions";

export const BuildersStyles = {
  BaseText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw300",
    color: "neutralColor2",
  })`
    line-height: 12px;
  `,
  TitleText: styled(Typography).attrs(({ color }) => ({
    fz: "fz14",
    fw: "fw400",
    color: defaultTo("primaryColor", color),
  }))`
    line-height: 24px;
  `,
  LinkText: styled(RichText).attrs(({ theme, color }) => ({
    color: defaultTo(theme.components.typography.dangerColor, color),
    lineHeight: 24,
    fw: "fw400",
    fz: "fz14",
    fullLenght: true,
    maxStringLenght: 250,
  }))``,
  FlexWrapper: styled.View<{
    marginTop?: number;
    marginBottom?: number;
    withoutPadding?: boolean;
  }>`
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
    margin-bottom: ${({ marginBottom }) => defaultZero(marginBottom)}px;
    padding: ${({ withoutPadding }) => (withoutPadding ? "0px" : "0px 16px")};
  `,
  Box: styled.View<{ marginTop?: number; marginBottom?: number }>`
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
    margin-bottom: ${({ marginBottom }) => defaultZero(marginBottom)}px;
    padding: 0px 16px;
  `,
};
