import React from "react";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";

type SpacerProps = ViewProps & { height?: number; width?: number };

export const Spacer = ({ height, width, ...props }: SpacerProps) => (
  <Container height={height} width={width} {...props} />
);

const Container = styled.View<{ height?: number; width?: number }>`
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
`;
