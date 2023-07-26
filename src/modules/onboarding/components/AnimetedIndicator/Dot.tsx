import React from "react";
import { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useTheme } from "styled-components";

import { Styles } from "./animetedIndicator.styles";
import type { AnimetedDotProps } from "./animetedIndicator.types";

const { DotStyled } = Styles;

export const Dot = ({ currentIndex, currentIndexPage }: AnimetedDotProps) => {
  const theme = useTheme();

  const style = useAnimatedStyle(() => {
    const isEquals = currentIndex === currentIndexPage.value;
    return {
      width: withTiming(isEquals ? 20 : 8, {
        duration: 280,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      backgroundColor: withTiming(
        !isEquals ? theme.colors.neutral2 : theme.colors.lightBlack,
        { duration: 280, easing: Easing.circle }
      ),
    };
  }, [currentIndexPage]);

  return <DotStyled style={style} />;
};
