import React, { useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import theme from "theme/theme";

import { DoubleCircleProgressBarsStyles as Styled } from "./double-circle-progress-bars.styles";
import { DoubleCircleProgressBarsProps } from "./double-circle-progress-bars.types";

const CIRCLE_LENGTH = 300;
const R = CIRCLE_LENGTH / (2 * Math.PI);
const CX = 52;
const CY = 52;
const CONTAINER_WIDTH = CX + CY;
const CONTAINER_HEIGHT = CX + CY;
const SEPARATOR_WIDTH = 3;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const DoubleCircleProgressBars = (
  props: DoubleCircleProgressBarsProps
) => {
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

  const inActiveAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: -CIRCLE_LENGTH * progress.value,
  }));

  const separatorAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 1 - progress.value - CIRCLE_LENGTH + SEPARATOR_WIDTH,
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const inActiveText = useDerivedValue(() => {
    return `${100 - Math.floor(progress.value * 100)}`;
  });

  return (
    <Styled.CircleContainer width={CONTAINER_WIDTH} height={CONTAINER_HEIGHT}>
      <Svg style={{ transform: [{ rotate: "270deg" }] }}>
        <AnimatedCircle
          r={R}
          cx={CX}
          cy={CY}
          strokeWidth={8}
          stroke={inActiveStrokeColor}
          strokeDasharray={CIRCLE_LENGTH - SEPARATOR_WIDTH}
          animatedProps={inActiveAnimatedProps}
        />
        <AnimatedCircle
          r={R}
          cx={CX}
          cy={CY}
          strokeWidth={8}
          stroke={progressValueColor}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={progressAnimatedProps}
        />
        <AnimatedCircle
          r={R}
          cx={CX}
          cy={CY}
          strokeWidth={8}
          stroke={theme.colors.white}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={separatorAnimatedProps}
        />
      </Svg>
      <Styled.TextContainer bottom={15} right={20} top={50} left={53}>
        <Styled.PercentageText text={progressText} />
        <Styled.PercentageSymbol>%</Styled.PercentageSymbol>
      </Styled.TextContainer>
      <Styled.VerticalSeparator bottom={20} right={50} left={30} top={50} />
      <Styled.TextContainer bottom={40} right={52} top={20} left={20}>
        <Styled.PercentageText isBold text={inActiveText} />
        <Styled.PercentageSymbol isBold>%</Styled.PercentageSymbol>
      </Styled.TextContainer>
    </Styled.CircleContainer>
  );
};
