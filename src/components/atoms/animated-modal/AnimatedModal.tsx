import type { ReactNode } from "react";
import { Dimensions, View } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "styled-components/native";

type AnimatedModalProps = {
  children: ReactNode;
  isVisible: boolean;
  withSwiped?: boolean;
  onModalHide?: () => void;
};
export const AnimatedModal = ({
  children,
  isVisible,
  withSwiped = false,
  onModalHide,
}: AnimatedModalProps) => {
  const theme = useTheme();
  return (
    <Modal
      backdropColor={theme.colors.disabled}
      statusBarTranslucent
      isVisible={isVisible}
      onModalHide={onModalHide}
      swipeDirection={withSwiped ? "down" : undefined}
      onSwipeComplete={onModalHide}
      onBackdropPress={onModalHide}
      onBackButtonPress={onModalHide}
      propagateSwipe
      customBackdrop={
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: theme.colors.disabled,
            ...Dimensions.get("screen"),
          }}
        />
      }
    >
      {children}
    </Modal>
  );
};
