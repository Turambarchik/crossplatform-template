import { defaultTo } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { ConfirmationModalProps } from "../../modalSheet.types";
import { ConfirmationModalStyles } from "./confirmationModal.styles";

const {
  Container,
  Line,
  Wrapper,
  HeaderText,
  AgreeButton,
  AgreeText,
  RefuseButton,
  RefuseText,
} = ConfirmationModalStyles;

export const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  accept,
  text,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();

  const handleAccept = () => {
    accept();
    setIsOpen(false);
  };

  return (
    <ModalSheetStyles.Modal isVisible={isOpen}>
      <Wrapper>
        <Container>
          <Line />
          <HeaderText>
            {t(defaultTo(localization.profile.exitFromAccount, text))}
          </HeaderText>
          <AgreeButton variant="secondary" fullWidth onPress={handleAccept}>
            <AgreeText>{t(localization.general.yes)}</AgreeText>
          </AgreeButton>
          <RefuseButton fullWidth onPress={setIsOpen.bind(null, false)}>
            <RefuseText>{t(localization.general.no)}</RefuseText>
          </RefuseButton>
        </Container>
      </Wrapper>
    </ModalSheetStyles.Modal>
  );
};
