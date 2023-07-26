import { Switch } from "react-native";
import styled from "styled-components/native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const ApartmentDetailsStyles = {
  Wrapper: styled(Screen)`
    align-items: flex-start;
    padding: 0 16px 32px 16px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw300",
    color: "neutralColor2",
  })`
    line-height: 12px;
  `,
  ScrollView: styled.ScrollView.attrs<{ headerHeight?: number }>(
    ({ headerHeight }) => ({
      contentContainerStyle: {
        paddingTop: headerHeight,
      },
    })
  )<{ headerHeight?: number }>`
    width: 100%;
    flex: 1;
  `,
  FlashListViewWrapper: styled.View`
    margin-top: 16px;
    padding-bottom: 40px;
  `,
  SVGIconCopy: styled(SVGIcon)`
    margin-top: 8px;
    margin-left: 16px;
  `,
  ButtonText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "tertiaryColor",
  })<{ marginTop?: number }>`
    line-height: 24px;
    margin-left: 8px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{ marginTop?: number }>`
    line-height: 24px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  NotifContainer: styled.View`
    margin-top: 16px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  NofitSwitcher: styled(Switch).attrs(({ theme }) => ({
    thumbColor: theme.colors.primaryBg,
    trackColor: {
      false: theme.colors.neutral2,
      true: theme.colors.green,
    },
    ios_backgroundColor: theme.colors.primaryBg,
  }))``,
  TitleText: styled(Typography).attrs({
    fz: "fz20",
    fw: "fw400",
    color: "primaryColor",
  })<{ marginTop?: number }>`
    line-height: 28px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
  Footer: styled.View`
    width: 100%;
  `,
};
