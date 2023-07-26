import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";

export const ProfileInfoStyles = {
  Wrapper: styled(Screen)`
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
  `,
  ContentWrapper: styled.View`
    flex: 1;
    width: 100%;
    padding: 0px 16px;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz20",
    fw: "fw400",
    color: "primaryColor",
  })`
    text-align: left;
    line-height: 28px;
  `,
  LogoutButtonWrapper: styled.View`
    width: 100%;
    padding: 0px 16px;
  `,
  LogOutButtonText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "dangerColor",
  })`
    margin-left: 8px;
    line-height: 24px;
  `,
  LogoutButton: styled(Button)`
    margin-bottom: 24px;
  `,
};
