import { defaultTo } from "ramda";
import React from "react";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";

import { defaultZero } from "helpers/functions";

type DividerProps = {
  color?: string;
  marginHorizontal?: number;
  marginVertical?: number;
};

export const Divider = ({
  color,
  marginHorizontal,
  marginVertical,
  ...props
}: DividerProps & ViewProps) => (
  <DividerStyle
    color={color}
    marginHorizontal={marginHorizontal}
    marginVertical={marginVertical}
    {...props}
  />
);

const DividerStyle = styled.View<{
  color?: string;
  marginHorizontal?: number;
  marginVertical?: number;
}>`
  height: 1px;
  width: 100%;
  background-color: ${({ theme, color }) =>
    defaultTo(theme.colors.borderColor, color)};
  margin-horizontal: ${({ marginHorizontal }) =>
    defaultZero(marginHorizontal)}px;
  margin-vertical: ${({ marginVertical }) => defaultZero(marginVertical)}px;
`;
