import { Switch } from "react-native";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const UserInfoStyles = {
  RegularText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{
    marginTop?: number;
  }>`
    max-width: 95%;
    line-height: 24px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw300",
    color: "neutralColor3",
  })`
    line-height: 24px;
  `,
  ContentContainer: styled.View.attrs(({ theme }) => ({
    ...theme.shadows.card,
  }))<{
    marginTop?: number;
  }>`
    padding: 12px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  ContentContainerRow: styled.View.attrs(({ theme }) => ({
    ...theme.shadows.card,
  }))<{
    marginTop?: number;
  }>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  Line: styled.View`
    height: 1px;
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: ${({ theme }) => theme.colors.borderColor};
  `,
  FaceIdSwitcher: styled(Switch).attrs(({ theme }) => ({
    thumbColor: theme.colors.primaryBg,
    trackColor: {
      false: theme.colors.neutral2,
      true: theme.colors.green,
    },
    ios_backgroundColor: theme.colors.primaryBg,
  }))``,
};
