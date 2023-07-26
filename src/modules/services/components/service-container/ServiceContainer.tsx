import type { ReactNode } from "react";
import React from "react";
import type { TouchableOpacityProps } from "react-native";

import { ServiceContainerStyles } from "./serviceContainer.styles";

const { Container, Point, PointText } = ServiceContainerStyles;

type ServicesContainerProps = {
  children: ReactNode;
  pointer?: number;
};

export const ServicesContainer = ({
  children,
  pointer,
  ...props
}: ServicesContainerProps & TouchableOpacityProps) => (
  <Container {...props}>
    {children}
    {!!pointer && (
      <Point>
        <PointText>{pointer}</PointText>
      </Point>
    )}
  </Container>
);
