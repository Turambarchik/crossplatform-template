import React from "react";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Section } from "components/atoms/section/Section";
import { ErrorMessage } from "components/molecules/error-message/ErrorMessage";
import { Loader } from "components/molecules/loader/Loader";
import { DEVICE_HEIGHT, localization } from "helpers/constants";
import { PinCodeInput } from "modules/auth/components/pin-code-input/PinCodeInput";

import useVerifyPinCodeScreenState from "./verifyPinCode.state";
import { VerifyPinCodeStyles } from "./verifyPinCode.styles";

const { Wrapper, HeaderText, Info } = VerifyPinCodeStyles;

const VerifyPinCode = () => {
  const { t, isLoading, errorMessage, handleVerifyPinCode, setErrorMessage } =
    useVerifyPinCodeScreenState();

  return (
    <Wrapper>
      <ScrollView keyboardShouldPersistTaps="always">
        <Section marginTop={DEVICE_HEIGHT / 5} centerVertical>
          <HeaderText>{t(localization.auth.repeatFourDigitsCode)}</HeaderText>
          <Info> {t(localization.auth.repeatFourDigitsCodeInfo)}</Info>
        </Section>
        <Section marginTop={40} centerVertical>
          <PinCodeInput
            handlePinCodeSubmit={handleVerifyPinCode}
            setErrorMessage={setErrorMessage}
            isError={Boolean(errorMessage)}
          />
        </Section>
        <Section marginTop={40} centerVertical>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        </Section>
        <KeyboardAwareScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
          enableOnAndroid
          viewIsInsideTabBar
        />
      </ScrollView>

      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default VerifyPinCode;
