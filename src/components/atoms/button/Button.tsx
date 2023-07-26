import React, { useState } from "react";
import type { PressableProps } from "react-native";
import { Pressable } from "react-native";
import styled from "styled-components/native";

import type theme from "theme/theme";

type ButtonProps = {
  withShadow?: boolean;
  fullWidth?: boolean;
  isPressed?: boolean;
  variant?: "primary" | "secondary";
  bgColor?: keyof typeof theme.components.button;
};

export const Button = ({
  fullWidth,
  children,
  withShadow = true,
  variant,
  ...props
}: PressableProps & ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Wrapper
      withShadow={withShadow}
      variant={variant}
      isPressed={isPressed}
      fullWidth={fullWidth}
      onPressIn={setIsPressed.bind(null, true)}
      onPressOut={setIsPressed.bind(null, false)}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled(Pressable).attrs<PressableProps & ButtonProps>(
  ({ theme, withShadow }) =>
    withShadow && {
      ...theme.shadows.button,
    }
)<PressableProps & ButtonProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 12;
  opacity: ${({ isPressed, theme }) =>
    isPressed ? theme.opacity.active : theme.opacity.default};
  ${({ fullWidth }) => fullWidth && "width: 100%"};
  background-color: ${({ bgColor = "primaryColor", theme }) =>
    theme.components.button[bgColor]};

  ${({ variant, theme, disabled }) => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled
            ? theme.components.button.disableColor
            : theme.components.button.primaryColor,
        };

      case "secondary":
        return {
          backgroundColor: disabled
            ? theme.components.button.disableColor
            : theme.components.button.secondaryColor,
        };

      default:
        break;
    }
  }}
`;
