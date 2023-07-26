import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";

export const CategoryItemStyles = {
  Wrapper: styled.View``,
  WrapperPadding: styled.View`
    padding: 0px 16px;
  `,
  Container: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))<{ isLastItem?: boolean; isFirstItem?: boolean }>`
    padding: 16px;
    border-top-left-radius: ${({ isFirstItem }) => (isFirstItem ? 12 : 0)}px;
    border-top-right-radius: ${({ isFirstItem }) => (isFirstItem ? 12 : 0)}px;
    border-bottom-left-radius: ${({ isLastItem }) => (isLastItem ? 12 : 0)}px;
    border-bottom-right-radius: ${({ isLastItem }) => (isLastItem ? 12 : 0)}px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    flex-direction: row;
    align-items: center;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
  })`
    line-height: 24px;
    margin-left: 12px;
  `,
};
