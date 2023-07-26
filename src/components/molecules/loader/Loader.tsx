import React, { useEffect } from "react";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Modal } from "components/atoms/modal/Modal";

import { LoaderStyles } from "./loader.styles.";

type LoaderProps = {
  visible: boolean;
  transparent: boolean;
};

const { Container } = LoaderStyles;

export const Loader = ({ visible, transparent }: LoaderProps) => {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }),
    [rotation.value]
  );

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
    return () => cancelAnimation(rotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return visible ? (
    <Modal visible={visible} transparent={transparent}>
      <Container>
        <Animated.View style={[animatedStyles]}>
          <SVGIcon type="loader" />
        </Animated.View>
      </Container>
    </Modal>
  ) : null;
};
