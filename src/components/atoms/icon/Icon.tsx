import type { SvgProps } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";

import { ACTIVE_OPACITY } from "helpers/constants";
import type theme from "theme/theme";

import { ICONS } from "./icon.constants";

export type TIconNames = keyof typeof ICONS;

export type IconProps = {
  type: TIconNames;
  color?: keyof typeof theme.iconColors;
  size?: number;
};

export const SVGIcon = ({
  type,
  size,
  style,
  color = "lightBlack",
  onPress,
}: SvgProps & IconProps) => {
  const Icon = ICONS[type];
  const IconProps = Icon({})?.props;
  const theme = useTheme();
  const iconHeight = size ?? IconProps.height;
  const iconWidth = size ?? IconProps.width;

  const currentColor = theme.iconColors[color];

  return onPress ? (
    <Wrapper
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
      style={[
        {
          height: iconHeight,
          width: iconWidth,
        },
        style,
      ]}
    >
      <Icon height={iconHeight} width={iconWidth} color={currentColor} />
    </Wrapper>
  ) : (
    <Icon
      style={style}
      height={iconHeight}
      width={iconWidth}
      color={currentColor}
    />
  );
};

const Wrapper = styled.TouchableOpacity.attrs(({ theme }) => ({
  activeOpacity: theme.opacity.active,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
`;
