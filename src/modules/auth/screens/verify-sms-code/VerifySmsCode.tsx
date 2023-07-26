import React from "react";

import { Button } from "components/atoms/button/Button";
import { Section } from "components/atoms/section/Section";
import { ErrorMessage } from "components/molecules/error-message/ErrorMessage";
import { Loader } from "components/molecules/loader/Loader";
import { DEVICE_HEIGHT, localization } from "helpers/constants";
import { phoneNumber } from "helpers/converter";
import {
  KEY_CODE_LENGTH,
  SmsCodeInput,
} from "modules/auth/components/sms-code-nput/SmsCodeInput";

import useAuthorizationScreenState from "./verifySmsCode.state";
import { VerifySmsCodeStyles } from "./verifySmsCode.styles";

const {
  Wrapper,
  HeaderText,
  ButtonText,
  Info,
  SendAgain,
  TimeToSend,
  PhoneNumber,
  InputsContainer,
  KeyboardAvoidingViewStyled,
} = VerifySmsCodeStyles;

const VerifySmsCode = () => {
  const {
    t,
    phone,
    errorMessage,
    isLoading,
    smsCode,
    timeToDisplay,
    isTimerOn,
    onChangeSmsCode,
    handleValidateCode,
    handleRepeatInitialVerification,
  } = useAuthorizationScreenState();

  return (
    <Wrapper>
      <Section marginTop={DEVICE_HEIGHT / 10} centerVertical>
        <HeaderText>{t(localization.auth.enterSmsCode)}</HeaderText>
        <Info>{t(localization.auth.codeSentOnPhoneNumber)}</Info>
        <PhoneNumber>{phoneNumber(phone)}</PhoneNumber>
        <ErrorMessage errorMessage={errorMessage} />
      </Section>
      <KeyboardAvoidingViewStyled behavior="position">
        <InputsContainer>
          <SmsCodeInput
            smsCodeValue={smsCode}
            onChangeSmsCode={onChangeSmsCode}
          />
        </InputsContainer>
        <Section centerVertical marginBottom={24} marginTop={32}>
          {isTimerOn && <TimeToSend>{timeToDisplay}</TimeToSend>}
          <SendAgain onPress={handleRepeatInitialVerification}>
            {t(localization.auth.sendSmsAgain)}
          </SendAgain>
        </Section>
      </KeyboardAvoidingViewStyled>
      <Button
        withShadow={smsCode.length === KEY_CODE_LENGTH}
        disabled={smsCode.length !== KEY_CODE_LENGTH}
        variant="primary"
        fullWidth
        onPress={handleValidateCode}
      >
        <ButtonText>{t(localization.general.continue)}</ButtonText>
      </Button>
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default VerifySmsCode;
