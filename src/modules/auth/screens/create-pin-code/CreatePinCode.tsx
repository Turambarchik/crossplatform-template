import React from "react";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Section } from "components/atoms/section/Section";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { DEVICE_HEIGHT, localization } from "helpers/constants";
import { PinCodeInput } from "modules/auth/components/pin-code-input/PinCodeInput";

import useCreatePinCodeScreenState from "./createPinCode.state";
import { CreatePinCodeStyles } from "./createPinCode.styles";

const { Wrapper, HeaderText, Info } = CreatePinCodeStyles;

const CreatePinCode = () => {
  const { t, isBiometricModal, setIsBiometricModal, handleCreatePinCode } =
    useCreatePinCodeScreenState();

  return (
    <Wrapper>
      <ScrollView keyboardShouldPersistTaps="always">
        <Section marginTop={DEVICE_HEIGHT / 5} centerVertical>
          <HeaderText>{t(localization.auth.createFourDigitsCode)}</HeaderText>
          <Info> {t(localization.auth.fourDigitsCodeInfo)}</Info>
        </Section>
        <Section marginTop={40} centerVertical>
          <PinCodeInput handlePinCodeSubmit={handleCreatePinCode} />
        </Section>
        <KeyboardAwareScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
          enableOnAndroid
          viewIsInsideTabBar
        />
      </ScrollView>
      <ModalSheet
        modalType={ModalSheetType.biometric}
        isOpen={isBiometricModal}
        setIsOpen={setIsBiometricModal}
      />
    </Wrapper>
  );
};

export default CreatePinCode;
