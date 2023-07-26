import { defaultTo } from "ramda";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";

const HEADER_HEIGHT = 44;

export const EmptyScreenStyles = {
  Wrapper: styled.View<{ marginTop?: number }>`
    align-items: center;
    justify-content: center;
    margin-top: ${({ marginTop }) => defaultTo(HEADER_HEIGHT, marginTop)}px;
  `,
  Text: styled(Typography).attrs({
    fz: "fz16",
    fw: "fw400",
    color: "infoColor",
  })`
    margin-top: 28;
    text-align: center;
    line-height: 26px;
  `,
};
