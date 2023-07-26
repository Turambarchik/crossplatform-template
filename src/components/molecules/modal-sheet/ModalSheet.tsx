import React, { useCallback } from "react";

import { BiometricModal } from "./content/biometric/BiometricModal";
import { ConfirmationModal } from "./content/confirmation/ConfirmationModal";
import { FeedbackModal } from "./content/feedback/FeedbackModal";
import { ForgotPinCodeModal } from "./content/forgot-pin-code/ForgotPinCodeModal";
import { MediaModal } from "./content/media/MediaModal";
import { ObjectsModal } from "./content/objects/ObjectsModal";
import { OrderCreatedModal } from "./content/order-created/OrderCreatedModal";
import { PhoneSettingsModal } from "./content/phone-settings/PhoneSettingsModal";
import { UnCorrectPinCodeModal } from "./content/uncorrect-pin-code/UnCorrectPinCodeModal";
import type {
  CommonModalSheetProps,
  ConditionalModalSheetTypeProps,
} from "./modalSheet.types";
import { ModalSheetType } from "./modalSheet.types";

export const ModalSheet = (
  props: CommonModalSheetProps & ConditionalModalSheetTypeProps
) => {
  const renderContent = useCallback(() => {
    switch (props.modalType) {
      case ModalSheetType.confirmation: {
        const { isOpen, setIsOpen, accept, text } = props;

        return (
          <ConfirmationModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            accept={accept}
            text={text}
          />
        );
      }
      case ModalSheetType.forgotPinCode: {
        const { isOpen, setIsOpen, authorize } = props;

        return (
          <ForgotPinCodeModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            authorize={authorize}
          />
        );
      }
      case ModalSheetType.unCorrectPinCode: {
        const { isOpen, setIsOpen, authorize } = props;

        return (
          <UnCorrectPinCodeModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            authorize={authorize}
          />
        );
      }
      case ModalSheetType.objects: {
        const { isOpen, setIsOpen } = props;
        return <ObjectsModal isOpen={isOpen} setIsOpen={setIsOpen} />;
      }
      case ModalSheetType.biometric: {
        const { isOpen, setIsOpen, biometricType } = props;
        return (
          <BiometricModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            biometricType={biometricType}
          />
        );
      }
      case ModalSheetType.feedback: {
        const { isOpen, setIsOpen, iriId, id } = props;
        return (
          <FeedbackModal
            iriId={iriId}
            id={id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        );
      }
      case ModalSheetType.media: {
        const { isOpen, setIsOpen } = props;
        return <MediaModal isOpen={isOpen} setIsOpen={setIsOpen} />;
      }
      case ModalSheetType.orderCreated: {
        const { isOpen, setIsOpen } = props;
        return <OrderCreatedModal isOpen={isOpen} setIsOpen={setIsOpen} />;
      }
      case ModalSheetType.phoneSettings: {
        const { isOpen, setIsOpen, quitModal } = props;
        return (
          <PhoneSettingsModal
            quitModal={quitModal}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        );
      }
      default: {
        <></>;
      }
    }
  }, [props]);

  return renderContent() as JSX.Element;
};
