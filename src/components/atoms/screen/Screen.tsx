import React from "react";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

type ScreenProps = {
  horizontalPadding?: number;
  verticalPadding?: number;
  showsVerticalScrollIndicator?: boolean;
};

type SafeAreaViewScreenProps = SafeAreaViewProps & ScreenProps;

export const Screen = ({
  children,
  horizontalPadding,
  verticalPadding,
  ...props
}: SafeAreaViewScreenProps) => (
  <Wrapper
    edges={["right", "left"]}
    horizontalPadding={horizontalPadding}
    verticalPadding={verticalPadding}
    {...props}
  >
    {children}
  </Wrapper>
);

const Wrapper = styled(SafeAreaView)<{
  height?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
}>`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBg};
`;
