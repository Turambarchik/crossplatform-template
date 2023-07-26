import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const NEWS_CARD_HEIGHT = 93;

export const NewsItemStyles = {
  Container: styled.View.attrs(({ theme }) => ({
    ...theme.shadows.card,
  }))`
    margin: 2px;
    margin-top: 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz20",
    fw: "fw400",
    color: "neutralColor1",
  })<{ marginTop?: number }>`
    line-height: 28px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  ContainerTouchable: styled.TouchableOpacity.attrs(({ theme }) => ({
    activityOpacity: theme.opacity.active,
  }))`
    height: ${NEWS_CARD_HEIGHT};
    flex-direction: row;
  `,
  Content: styled.View`
    flex: 1;
    padding: 11px 8px;
    justify-content: space-between;
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw400",
    color: "neutralColor2",
  })`
    margin-right: 12px;
    line-height: 12px;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{ marginTop?: number }>`
    line-height: 24px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  Footer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
};
