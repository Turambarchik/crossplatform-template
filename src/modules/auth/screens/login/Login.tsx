import { and, isNil } from "ramda";
import React from "react";
import { ScrollView } from "react-native";
import { BiometryTypes } from "react-native-biometrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Section } from "components/atoms/section/Section";
import { ErrorMessage } from "components/molecules/error-message/ErrorMessage";
import { Loader } from "components/molecules/loader/Loader";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import {
  DEVICE_HEIGHT,
  localization,
  SMALL_DEVICE_HEIGHT,
} from "helpers/constants";
import { PinCodeInput } from "modules/auth/components/pin-code-input/PinCodeInput";

import useLoginState from "./Login.state";
import { LoginStyles } from "./login.styles";

const {
  Wrapper,
  HeaderText,
  NotRememberCode,
  NotRememberCodeContainer,
  Footer,
  BiometricContainer,
} = LoginStyles;

const Login = () => {
  const {
    t,
    isNotRememberModal,
    isLoading,
    isUnCorrectPinCodeModal,
    setIsUnCorrectPinCodeModal,
    setIsNotRememberModal,
    handleCheckPinCode,
    isNeedToAuthorize,
    handleSingInWithBiometric,
    authorize,
    isBiometricActive,
    errorMessage,
    biometricType,
    isMounted,
    setErrorMessage,
  } = useLoginState();

  return (
    <Wrapper>
      <ScrollView keyboardShouldPersistTaps="always">
        <Section marginTop={DEVICE_HEIGHT / 5} centerVertical>
          <HeaderText>{t(localization.auth.enterPinCode)}</HeaderText>
        </Section>
        <Section
          marginTop={40}
          marginBottom={
            SMALL_DEVICE_HEIGHT < DEVICE_HEIGHT ? DEVICE_HEIGHT / 6 : 0
          }
          centerVertical
        >
          <PinCodeInput
            handlePinCodeSubmit={handleCheckPinCode}
            setErrorMessage={setErrorMessage}
            isNeedToAuthorize={isNeedToAuthorize}
            isMounted={isMounted}
            isError={Boolean(errorMessage)}
          />
        </Section>
        {!isNil(errorMessage) && (
          <ErrorMessage
            marginTop={24}
            marginBottom={4}
            errorMessage={errorMessage}
          />
        )}
        {and(isBiometricActive, !isNil(biometricType)) && (
          <BiometricContainer>
            <SVGIcon
              type={
                biometricType === BiometryTypes.FaceID
                  ? "faceId"
                  : "fingerPrint"
              }
              onPress={handleSingInWithBiometric}
            />
          </BiometricContainer>
        )}
        <Footer>
          <NotRememberCodeContainer
            onPress={setIsNotRememberModal.bind(null, true)}
          >
            <NotRememberCode>
              {t(localization.auth.notRememberCode)}
            </NotRememberCode>
            <SVGIcon type="lineRight" />
          </NotRememberCodeContainer>
        </Footer>
        <KeyboardAwareScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
          enableOnAndroid
          viewIsInsideTabBar
        />
      </ScrollView>
      <ModalSheet
        modalType={ModalSheetType.forgotPinCode}
        isOpen={isNotRememberModal}
        setIsOpen={setIsNotRememberModal}
        authorize={authorize}
      />
      <ModalSheet
        modalType={ModalSheetType.unCorrectPinCode}
        isOpen={isUnCorrectPinCodeModal}
        setIsOpen={setIsUnCorrectPinCodeModal}
        authorize={authorize}
      />
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default Login;
