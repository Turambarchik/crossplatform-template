import React, { useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import theme from "theme/theme";

import { CircularProgressBarStyles as Styled } from "./circular-progress-bar.styles";
import { CircularProgressBarProps } from "./circular-progress-bar.types";

const CIRCLE_LENGTH = 301; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const CX = 52;
const CY = 52;
const CONTAINER_WIDTH = CX + CY;
const CONTAINER_HEIGHT = CX + CY;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgressBar = (props: CircularProgressBarProps) => {
  const {
    value = 0,
    progressValueColor = theme.colors.green,
    inActiveStrokeColor = theme.colors.stormColor,
  } = props;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value, {
      duration: 2000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  return (
    <Styled.GraphWrapper>
      <Styled.CircleContainer width={CONTAINER_WIDTH} height={CONTAINER_HEIGHT}>
        <Svg style={{ transform: [{ rotate: "270deg" }] }}>
          <Circle
            cx={CX}
            cy={CY}
            r={R}
            stroke={inActiveStrokeColor}
            strokeWidth={8}
          />
          <AnimatedCircle
            cx={CX}
            cy={CY}
            r={R}
            stroke={progressValueColor}
            strokeWidth={8}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
        <Styled.TextContainer>
          <Styled.PercentageText text={progressText} />
          <Styled.PercentageSymbol>%</Styled.PercentageSymbol>
        </Styled.TextContainer>
      </Styled.CircleContainer>
    </Styled.GraphWrapper>
  );
};
