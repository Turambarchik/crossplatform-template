import React, { useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import theme from "theme/theme";

import { SemiCircularProgressBarStyles as Styled } from "./semi-circular-progress-bar.styles";
import { SemiCircularProgressBarProps } from "./semi-circular-progress-bar.types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CIRCLE_LENGTH = 301; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const CX = 52;
const CY = 52;
const CONTAINER_WIDTH = CX + CY;
const CONTAINER_HEIGHT = CX + CY;

export const SemiCircularProgressBar = (
  props: SemiCircularProgressBarProps
) => {
  const {
    value = 0,
    progressValueColor = theme.colors.green,
    inActiveStrokeColor = theme.colors.stormColor,
  } = props;
  const progress = useSharedValue(0);

  useEffect(() => {
    // because of semi circle maximum value is 0.5
    progress.value = withTiming(value, {
      duration: 2000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${50 - Math.floor(progress.value * 100)}`;
  });

  return (
    <Styled.Wrapper>
      <Styled.CircleContainer width={CONTAINER_WIDTH} height={CONTAINER_HEIGHT}>
        <Svg height={150} style={{ transform: [{ rotate: "180deg" }] }}>
          <Circle
            r={R}
            cx={CX}
            cy={CY}
            strokeWidth={8}
            stroke={inActiveStrokeColor}
            strokeDasharray={CIRCLE_LENGTH / 2}
          />
          <AnimatedCircle
            r={R}
            cx={CX}
            cy={CY}
            strokeWidth={8}
            stroke={progressValueColor}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
          />
        </Svg>
        <Styled.TextContainer top={93} bottom={50} right={35} left={35}>
          <Styled.PercentageText text={progressText} />
          <Styled.PercentageSymbol right={2} bottom={-9}>
            %
          </Styled.PercentageSymbol>
        </Styled.TextContainer>
      </Styled.CircleContainer>
    </Styled.Wrapper>
  );
};
