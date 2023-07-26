import React from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { ForgotPinCodeModalProps } from "../../modalSheet.types";
import { ForgotPinCodeModalStyles } from "./forgotPinCodeModal.styles";

const {
  Container,
  Line,
  Wrapper,
  HeaderText,
  AgreeButton,
  AgreeText,
  RefuseButton,
  RefuseText,
  InfoText,
} = ForgotPinCodeModalStyles;

export const ForgotPinCodeModal = ({
  isOpen,
  setIsOpen,
  authorize,
}: ForgotPinCodeModalProps) => {
  const { t } = useTranslation();

  const handleAccept = () => {
    authorize();
    setIsOpen(false);
  };

  return (
    <ModalSheetStyles.Modal isVisible={isOpen}>
      <Wrapper>
        <Container>
          <Line />
          <HeaderText>{t(localization.auth.forgotPinCode)}</HeaderText>
          <InfoText numberOfLines={2}>
            {t(localization.auth.reauthorizeToRegainAccess)}
          </InfoText>
          <AgreeButton variant="primary" fullWidth onPress={handleAccept}>
            <AgreeText>{t(localization.auth.autoritize)}</AgreeText>
          </AgreeButton>
          <RefuseButton
            variant="secondary"
            fullWidth
            onPress={setIsOpen.bind(null, false)}
          >
            <RefuseText>{t(localization.general.cancel)}</RefuseText>
          </RefuseButton>
        </Container>
      </Wrapper>
    </ModalSheetStyles.Modal>
  );
};
