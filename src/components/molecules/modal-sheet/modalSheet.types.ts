import type { BiometryType } from "react-native-biometrics";

export type ConfirmationModalProps = {
  modalType?: ModalSheetType.confirmation;
  isOpen: boolean;
  setIsOpen: (is: boolean) => void;
  accept: () => void;
  declinde?: () => void;
  text?: string;
};
export type ObjectsModalProps = {
  modalType?: ModalSheetType.objects;
  isOpen: boolean;
  setIsOpen: (is: boolean) => void;
};
export type BiometricModalProps = {
  modalType?: ModalSheetType.biometric;
  isOpen: boolean;
  setIsOpen: (is: boolean) => void;
  biometricType?: BiometryType;
};
export type ForgotPinCodeModalProps = {
  modalType?: ModalSheetType.forgotPinCode;
  isOpen: boolean;
  setIsOpen: (is: boolean) => void;
  authorize: () => void;
};
export type UnCorrectPinCodeModalProps = {
  modalType?: ModalSheetType.unCorrectPinCode;
  isOpen: boolean;
  setIsOpen: (is: boolean) => void;
  authorize: () => void;
};
export type FeedbackModalProps = {
  modalType?: ModalSheetType.feedback;
  isOpen: boolean;
  iriId: string;
  id: number;
  setIsOpen: (is: boolean) => void;
};
export type MediaModalProps = {
  modalType?: ModalSheetType.media;
  isOpen: boolean;
  setIsOpen: (is: boolean) => void;
};

export type OrderCreatedModalProps = {
  modalType?: ModalSheetType.orderCreated;
  isOpen: boolean;
  setIsOpen: (is: boolean) => void;
};

export type PhoneSettingsModalProps = {
  modalType?: ModalSheetType.phoneSettings;
  isOpen: boolean;
  quitModal: () => void;
  setIsOpen: (is: boolean) => void;
};

export enum ModalSheetType {
  confirmation = "confirmation",
  objects = "objects",
  biometric = "biometric",
  forgotPinCode = "forgotPinCode",
  unCorrectPinCode = "unCorrectPinCode",
  feedback = "feedback",
  media = "media",
  orderCreated = "orderCreated",
  phoneSettings = "phoneSettings",
}
export type CommonModalSheetProps = Partial<Record<"isOpen", boolean>>;

export type ConditionalModalSheetTypeProps =
  | ConfirmationModalProps
  | ObjectsModalProps
  | BiometricModalProps
  | ForgotPinCodeModalProps
  | UnCorrectPinCodeModalProps
  | FeedbackModalProps
  | MediaModalProps
  | OrderCreatedModalProps
  | PhoneSettingsModalProps;
