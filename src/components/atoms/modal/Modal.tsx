import type { ReactNode } from "react";
import React from "react";
import { Modal as RNModal } from "react-native";

type ModalProps = {
  visible: boolean;
  children: ReactNode;
  transparent: boolean;
  animationType?: "slide";
};

export const Modal = ({
  visible,
  children,
  transparent,
  animationType,
}: ModalProps) => (
  <RNModal
    visible={visible}
    transparent={transparent}
    animationType={animationType}
  >
    <>{children}</>
  </RNModal>
);
