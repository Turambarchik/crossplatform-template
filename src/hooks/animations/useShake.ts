import { useCallback } from "react";
import { Vibration } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type useShakeAniamtionProps = {
  duration?: number;
  direction?: "vertical" | "horizontal";
  repeat?: number;
};

export const useShakeAniamtion = ({
  duration = 20,
  direction = "horizontal",
  repeat = 2,
}: useShakeAniamtionProps) => {
  const shakeValue = useSharedValue(0);

  const shake = useCallback(() => {
    shakeValue.value = withRepeat(
      withSequence(
        withTiming(-2, { duration }),
        withTiming(2, { duration }),
        withTiming(-1, { duration }),
        withTiming(1, { duration })
      ),
      repeat,
      true // Reverse the animation on each repeat
    );
    Vibration.vibrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const shakeTranslate = shakeValue.value * 6; // shake distance, be carefull can change postion of Animated View
    if (direction === "vertical") {
      return {
        transform: [{ translateY: shakeTranslate }],
      };
    } else {
      return {
        transform: [{ translateX: shakeTranslate }],
      };
    }
  });

  return { shake, animatedStyles };
};
