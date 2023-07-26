import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";

export const ServicesStyles = {
  Wrapper: styled(Screen)`
    padding: 0 16px 0 16px;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  ScrollView: styled.ScrollView.attrs<{ headerHeight?: number }>(
    ({ headerHeight }) => ({
      contentContainerStyle: {
        paddingTop: headerHeight,
        paddingBottom: 10,
      },
    })
  )<{ headerHeight?: number }>`
    width: 100%;
    flex: 1;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: left;
    line-height: 32px;
    margin-top: 24px;
  `,
  ContentWrapper: styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
  PrimaryText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })`
    line-height: 24px;
    margin-top: 4px;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "neutralColor2",
  })`
    line-height: 24px;
    margin-top: 4px;
  `,
};
