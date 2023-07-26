import { equals } from "ramda";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiometryTypes } from "react-native-biometrics";

import { Loader } from "components/molecules/loader/Loader";
import { localization } from "helpers/constants";
import { allowBiometricTextConverter } from "helpers/converter";
import useBiometric from "services/useBiometric";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { BiometricModalProps } from "../../modalSheet.types";
import { BiometricModalStyles } from "./biometricModal.styles";

const {
  Container,
  Line,
  Wrapper,
  HeaderText,
  AgreeButton,
  AgreeText,
  RefuseButton,
  RefuseText,
  SVGIconFaceId,
  SVGIconTouchId,
} = BiometricModalStyles;

export const BiometricModal = ({
  isOpen,
  setIsOpen,
  biometricType,
}: BiometricModalProps) => {
  const { t } = useTranslation();
  const { activateBiometric } = useBiometric();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAccept = () => {
    setIsLoading(true);
    activateBiometric()
      .then(() => {
        setIsLoading(false);
        setIsOpen(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
  };

  return (
    <ModalSheetStyles.Modal isVisible={isOpen}>
      <Wrapper>
        <Container>
          <Line />
          {equals(biometricType, BiometryTypes.FaceID) ? (
            <SVGIconFaceId />
          ) : (
            <SVGIconTouchId />
          )}
          <HeaderText>{allowBiometricTextConverter(biometricType)}</HeaderText>
          <AgreeButton variant="primary" fullWidth onPress={handleAccept}>
            <AgreeText>{t(localization.general.allow)}</AgreeText>
          </AgreeButton>
          <RefuseButton
            variant="secondary"
            fullWidth
            onPress={setIsOpen.bind(null, false)}
          >
            <RefuseText>{t(localization.general.allowLate)}</RefuseText>
          </RefuseButton>
        </Container>
      </Wrapper>
      <Loader visible={isLoading} transparent />
    </ModalSheetStyles.Modal>
  );
};
