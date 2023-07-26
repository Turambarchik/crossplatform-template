import type { ReactNode } from "react";
import React from "react";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";

import { ACTIVE_OPACITY } from "helpers/constants";

type WhiteContainerProps = {
  onPress: () => void | Promise<void>;
  children: ReactNode;
  activeOpacity?: number;
};

export const WhiteContainer = ({
  children,
  onPress,
  activeOpacity = ACTIVE_OPACITY,
  ...props
}: WhiteContainerProps & ViewProps) => (
  <Container {...props}>
    <ContainerTouchable activeOpacity={activeOpacity} onPress={onPress}>
      {children}
    </ContainerTouchable>
  </Container>
);

const Container = styled.View.attrs(({ theme }) => ({
  ...theme.shadows.card,
}))`
  margin: 2px;
`;

const ContainerTouchable = styled.TouchableOpacity.attrs(({ theme }) => ({
  activityOpacity: theme.opacity.active,
}))`
  padding: 12px 16px;
  border-radius: 16px;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.primaryBg};
`;
