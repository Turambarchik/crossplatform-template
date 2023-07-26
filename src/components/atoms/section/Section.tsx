import React from "react";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";

import { defaultZero } from "helpers/functions";

export type SectionProps = {
  marginTop?: number;
  marginBottom?: number;
  row?: boolean;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
  horizontalPadding?: number;
};

export const Section = ({
  children,
  centerVertical,
  centerHorizontal,
  row,
  ...props
}: ViewProps & SectionProps) => (
  <SectionView
    centerVertical={centerVertical}
    centerHorizontal={centerHorizontal}
    row={row}
    {...props}
  >
    {children}
  </SectionView>
);

const SectionView = styled.View<{
  marginTop?: number;
  marginBottom?: number;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
  row?: boolean;
}>`
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  align-items: ${({ centerVertical }) =>
    centerVertical ? "center" : "flex-start"};
  justify-content: ${({ centerHorizontal }) =>
    centerHorizontal ? "center" : "flex-start"};
  margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  margin-bottom: ${({ marginBottom }) => defaultZero(marginBottom)}px;
`;
