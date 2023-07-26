import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const NewsListStyles = {
  Wrapper: styled(Screen)`
    padding: 0 16px 0 16px;
    width: 100%;
    flex: 1;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  FlashListViewWrapper: styled.View`
    width: 100%;
    flex: 1;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz20",
    fw: "fw400",
    color: "neutralColor1",
  })<{ marginTop?: number }>`
    line-height: 28px;
    margin-bottom: 3px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,

  LoadingWrapper: styled.View`
    padding: 20px 0px;
  `,
  Loading: styled.ActivityIndicator``,
};
