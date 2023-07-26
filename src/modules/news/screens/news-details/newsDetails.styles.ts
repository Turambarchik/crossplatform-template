import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";
import { DEVICE_WIDTH } from "helpers/constants";

export const NewsDetailsStyles = {
  Wrapper: styled(Screen)`
    align-items: flex-start;
    border-color :${({ theme }) => theme.colors.borderColor}
    border-top-width: 1px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  Container: styled.View`
    padding-left: 16px;
    padding-right: 16px;
  `,
  Line: styled.View`
    position: absolute;
    top: 70;
    width: ${DEVICE_WIDTH};
    height: 1px;
    color: ${({ theme }) => theme.colors.borderColor};
    background-color: ${({ theme }) => theme.colors.borderColor};
  `,
  ScrollView: styled.ScrollView.attrs<{ headerHeight?: number }>(
    ({ headerHeight }) => ({
      contentContainerStyle: {
        paddingTop: headerHeight,
        paddingBottom: 40,
      },
    })
  )<{ headerHeight?: number }>`
    padding-top: 24px;

    width: 100%;
    flex: 1;
  `,
  Header: styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw400",
    color: "neutralColor2",
  })`
    margin-right: 12px;
    line-height: 12px;
  `,
  Chip: styled.View<{ color: string }>`
    border-radius: 16px;
    padding: 10px 8px;
    background-color: ${({ color }) => color};
  `,
  ChipText: styled(Typography).attrs({
    fz: "fz11",
    fw: "fw500",
    color: "secondaryColor",
  })`
    line-height: 11px;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    line-height: 32px;
    margin-top: 16px;
  `,
};
