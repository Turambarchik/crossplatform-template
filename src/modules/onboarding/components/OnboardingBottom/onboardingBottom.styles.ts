import { defaultTo } from "ramda";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";

export const Styles = {
  Wrapper: styled.View<{ backgroundColor?: string; flex?: string }>`
    flex: ${(props) => defaultTo(0.4, props.flex)};
    width: 100%;
    background-color: ${(props) =>
      defaultTo(props.theme.colors.primaryBg, props.backgroundColor)};
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    align-items: center;
    padding-horizontal: 24px;
    top: -40px;
  `,
  ButtonWrapper: styled.View`
    flex: 1;
    width: 100%;
    justify-content: flex-end;
  `,
  Title: styled(Typography).attrs({
    fz: "fz24",
    fw: "fw500",
  })`
    margin-top: 32px;
    text-align: center;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
  })`
    margin-top: 24px;
    text-align: center;
  `,
  ButtonText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
  })`
    color: ${({ theme }) => theme.components.typography.tertiaryColor};
  `,
};
