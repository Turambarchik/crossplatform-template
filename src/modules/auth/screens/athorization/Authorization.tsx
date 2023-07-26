import { or } from "ramda";
import React from "react";
import Config from "react-native-config";

import { Button } from "components/atoms/button/Button";
import { Section } from "components/atoms/section/Section";
import { ErrorMessage } from "components/molecules/error-message/ErrorMessage";
import { Loader } from "components/molecules/loader/Loader";
import {
  DEVICE_HEIGHT,
  localization,
  SMALL_DEVICE_HEIGHT,
} from "helpers/constants";

import { PhoneInput } from "../../components/phone-input/PhoneInput";
import useAuthorizationScreenState from "./authorization.state";
import { AuthorizationStyles } from "./authorization.styles";

const {
  Wrapper,
  HeaderText,
  ButtonText,
  PrivacyPolicyLink,
  PrivacyPolicyText,
  KeyboardAvoidingView,
  PrivacyPolicyContainer,
  UnderlineContainer,
} = AuthorizationStyles;

const Authorization = () => {
  const {
    t,
    phone,
    errorMessage,
    isError,
    isLoading,
    setPhone,
    setIsError,
    setErrorMessage,
    handleInitialVerification,
  } = useAuthorizationScreenState();

  const PublickOfferUnderlineText = () => (
    <UnderlineContainer>
      <PrivacyPolicyLink url={Config.PUBLIC_OFFER}>
        {t(localization.auth.termsConditions)}
      </PrivacyPolicyLink>
    </UnderlineContainer>
  );

  const PrivacyPolicyUnderlineText = () => (
    <UnderlineContainer>
      <PrivacyPolicyLink url={Config.PRIVACY_POLICY}>
        {t(localization.auth.privacyPolicy)}
      </PrivacyPolicyLink>
    </UnderlineContainer>
  );

  return (
    <Wrapper>
      <Section
        marginTop={DEVICE_HEIGHT > SMALL_DEVICE_HEIGHT ? DEVICE_HEIGHT / 6 : 20}
        centerVertical
      >
        <HeaderText>{t(localization.auth.enterPhoneNumber)}</HeaderText>
        <PhoneInput
          phoneValue={phone}
          setIsError={setIsError}
          setErrorMessage={setErrorMessage}
          onChangeText={setPhone}
        />
        <ErrorMessage
          errorMessage={errorMessage}
          marginTop={8}
          marginBottom={8}
        />
      </Section>
      <KeyboardAvoidingView behavior="padding">
        <Section>
          <Button
            withShadow={false}
            variant="primary"
            disabled={or(phone.length !== 9, isError)}
            fullWidth
            onPress={handleInitialVerification}
          >
            <ButtonText>{t(localization.auth.enter)}</ButtonText>
          </Button>
          <PrivacyPolicyContainer>
            <PrivacyPolicyText>{t(localization.auth.agree)}</PrivacyPolicyText>
            <PrivacyPolicyUnderlineText />
            <PrivacyPolicyText>{`${" "}${t(
              localization.auth.and
            )}`}</PrivacyPolicyText>
            <PublickOfferUnderlineText />
          </PrivacyPolicyContainer>
        </Section>
      </KeyboardAvoidingView>
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default Authorization;
