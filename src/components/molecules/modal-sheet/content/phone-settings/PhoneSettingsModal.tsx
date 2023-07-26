import React from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";

import { localization } from "helpers/constants";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { PhoneSettingsModalProps } from "../../modalSheet.types";
import { PhoneSettingsModalStyles } from "./phoneSettingsModal.styles";

const {
  Container,
  Line,
  Wrapper,
  HeaderText,
  AgreeButton,
  AgreeText,
  RefuseButton,
  RefuseText,
} = PhoneSettingsModalStyles;

export const PhoneSettingsModal = ({
  isOpen,
  setIsOpen,
  quitModal,
}: PhoneSettingsModalProps) => {
  const { t } = useTranslation();

  const handleAccept = () => {
    Linking.openSettings();
    setIsOpen(false);
  };

  return (
    <ModalSheetStyles.Modal isVisible={isOpen}>
      <Wrapper>
        <Container>
          <Line />
          <HeaderText>
            {t(localization.general.allowUsageInSettings)}
          </HeaderText>
          <AgreeButton variant="secondary" fullWidth onPress={handleAccept}>
            <AgreeText> {t(localization.general.goToSettings)}</AgreeText>
          </AgreeButton>
          <RefuseButton fullWidth onPress={quitModal}>
            <RefuseText>{t(localization.general.later)}</RefuseText>
          </RefuseButton>
        </Container>
      </Wrapper>
    </ModalSheetStyles.Modal>
  );
};
