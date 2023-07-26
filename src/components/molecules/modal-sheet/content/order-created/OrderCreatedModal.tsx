import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";
import { Routes } from "modules/app/Routes";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { OrderCreatedModalProps } from "../../modalSheet.types";
import { OrderCreatedModalStyles } from "./orderCreatedModal.styles";

const {
  Container,
  Wrapper,
  HeaderText,
  AgreeButton,
  AgreeText,
  IconContainer,
  InProcessIcon,
} = OrderCreatedModalStyles;

export const OrderCreatedModal = ({
  isOpen,
  setIsOpen,
}: OrderCreatedModalProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleClose = () => {
    setIsOpen(false);
    navigation.navigate(Routes.Requests);
  };
  return (
    <ModalSheetStyles.Modal isVisible={isOpen}>
      <Wrapper>
        <Container>
          <IconContainer>
            <InProcessIcon type="inProcess" />
          </IconContainer>
          <HeaderText>{t(localization.requests.orderHasBeenSent)}</HeaderText>
          <AgreeButton variant="primary" fullWidth onPress={handleClose}>
            <AgreeText>{t(localization.general.ok)}</AgreeText>
          </AgreeButton>
        </Container>
      </Wrapper>
    </ModalSheetStyles.Modal>
  );
};
