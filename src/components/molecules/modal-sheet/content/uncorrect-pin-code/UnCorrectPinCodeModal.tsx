import React from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { UnCorrectPinCodeModalProps } from "../../modalSheet.types";
import { UnCorrectPinCodeModalStyles } from "./unCorrectPinCodeModal.styles";

const {
  Container,
  Line,
  Wrapper,
  HeaderText,
  AgreeButton,
  AgreeText,
  InfoText,
} = UnCorrectPinCodeModalStyles;

export const UnCorrectPinCodeModal = ({
  isOpen,
  setIsOpen,
  authorize,
}: UnCorrectPinCodeModalProps) => {
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
          <HeaderText>
            {t(localization.auth.youEnteredWrongPassword)}
          </HeaderText>
          <InfoText numberOfLines={2}>
            {t(localization.auth.reauthorizeToRegainAccess)}
          </InfoText>
          <AgreeButton variant="primary" fullWidth onPress={handleAccept}>
            <AgreeText>{t(localization.auth.autoritize)}</AgreeText>
          </AgreeButton>
        </Container>
      </Wrapper>
    </ModalSheetStyles.Modal>
  );
};
