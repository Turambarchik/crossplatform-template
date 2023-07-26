import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";

export const CreateNewOrderStyles = {
  Wrapper: styled(Screen)`
    padding: 0 16px 16px 16px;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
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
  FlashListViewWrapper: styled.View`
    flex: 1;
    margin-top: 16px;
  `,
  ContentWrapper: styled.View`
    flex: 1;
    width: 100%;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
  })`
    text-align: left;
    line-height: 32px;
  `,
};
