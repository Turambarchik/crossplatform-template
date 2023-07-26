import { defaultTo } from "ramda";
import styled from "styled-components/native";
import type { StatusOrderType } from "types";

import { statusConverter } from "helpers/converter";
import { defaultZero } from "helpers/functions";

import { Typography } from "../../atoms/typography/Typography";

export const Styles = {
  Wrapper: styled.View<{ type: StatusOrderType }>`
    background-color: ${({ type, theme }) => statusConverter(type, theme)};
    padding: 6.5px 8px;
    border-radius: 16px;
  `,
  BaseText: styled(Typography).attrs(({ fz }) => ({
    fz: defaultTo("fz11", fz),
    fw: "fw500",
  }))<{ marginLeft?: number }>`
    line-height: 11px;
    margin-left: ${({ marginLeft }) => defaultZero(marginLeft)}px;
  `,
  Flex: styled.View`
    align-items: center;
    flex-direction: row;
  `,
};
