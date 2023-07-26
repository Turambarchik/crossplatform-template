import { or } from "ramda";
import React from "react";
import type { TextProps } from "react-native";
import { Linking } from "react-native";
import styled from "styled-components/native";

import { ACTIVE_OPACITY } from "helpers/constants";
import type theme from "theme/theme";

type TypographyProps = {
  url?: string;
  fz?: keyof typeof theme.fontSizes;
  fw?: keyof typeof theme.fontWeight;
  color?: keyof typeof theme.components.typography;
};

export const Typography = ({
  children,
  fz = "fz14",
  fw = "fw400",
  color = "primaryColor",
  url,
  onPress,
  ...props
}: TypographyProps & TextProps) => {
  const hitStop = { bottom: 5, top: 5, left: 5, right: 5 };

  const openLink = () => Linking.openURL(url as string);

  return or(url, onPress) ? (
    <LinkContainer
      activeOpacity={ACTIVE_OPACITY}
      onPress={onPress ? onPress : openLink}
      hitSlop={hitStop}
    >
      <Text
        fz={fz}
        fw={fw}
        color={color}
        maxFontSizeMultiplier={1}
        allowFontScaling={false}
        {...props}
      >
        {children}
      </Text>
    </LinkContainer>
  ) : (
    <Text
      fz={fz}
      fw={fw}
      color={color}
      maxFontSizeMultiplier={1}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </Text>
  );
};

const Text = styled.Text<Pick<TypographyProps, "fz" | "fw" | "color">>`
  color: ${({ color = "primaryColor", theme }) =>
    theme.components.typography[color]};
  font-size: ${({ fz = "fz14", theme }) => theme.fontSizes[fz]}px;
  font-family: ${({ fw = "fw400", theme }) => theme.fontWeight[fw]};
`;

const LinkContainer = styled.TouchableOpacity.attrs(({ theme }) => ({
  activeOpacity: theme.opacity.active,
}))``;
