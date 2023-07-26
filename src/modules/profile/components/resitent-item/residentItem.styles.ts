import styled from "styled-components/native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const ResidentItemStyles = {
  Container: styled.View.attrs(({ theme }) => ({
    ...theme.shadows.card,
  }))<{ isFirst: boolean }>`
    margin: 2px;
    ${({ isFirst }) => !isFirst && "margin-top: 16px"}
  `,
  ContainerTouchable: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    padding: 12px 16px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  Chip: styled.View`
    border-radius: 16px;
    padding: 10px 8px;
    background-color: ${({ theme }) => theme.components.chip.primaryColor};
  `,
  ChipText: styled(Typography).attrs({
    fz: "fz11",
    fw: "fw500",
    color: "tertiaryColor",
  })`
    line-height: 11px;
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw300",
    color: "neutralColor2",
  })`
    line-height: 12px;
  `,
  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  SVGIconPhone: styled(SVGIcon).attrs({
    type: "phone",
  })`
    margin-right: 12px;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{ marginTop?: number }>`
    line-height: 24px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  Line: styled.View`
    height: 1px;
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: ${({ theme }) => theme.colors.borderColor};
  `,
};
