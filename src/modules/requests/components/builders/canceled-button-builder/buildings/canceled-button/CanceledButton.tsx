import { useNavigation } from "@react-navigation/native";
import { __, any, equals } from "ramda";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Typography } from "components/atoms/typography/Typography";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { localization } from "helpers/constants";
import { Routes } from "modules/app/Routes";
import { useStoreActions, useStoreState } from "store/store";
import { TransitionsEnum } from "types";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseCanceledButtonProps = {
  id: number;
};

const { Box } = Styles;

export const BaseCanceledButton = ({ id }: BaseCanceledButtonProps) => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const {
    requests: { transitionList },
  } = useStoreState((state) => state);

  const {
    requests: { canceledActiveRequest, setIsLoading },
  } = useStoreActions((state) => state);

  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);

  const handleCanceledActiveRequest = async () => {
    setIsLoading(true);
    try {
      await canceledActiveRequest({ id });
      navigation.navigate(Routes.Requests);
      showMessage({
        type: "success",
        message: t(localization.requests.review_deleted),
      });
    } finally {
      setIsLoading(false);
    }
  };
  const openModal = () => setIsOpenLogoutModal(true);

  const isDisabled = any(equals(__, TransitionsEnum.citizen_cancel as string))(
    transitionList
  );

  return (
    <Wrapper marginTop={16}>
      <SwadowButton
        onPress={openModal}
        disabled={!isDisabled}
        isDisabled={!isDisabled}
      >
        <ButtonText>{t(localization.general.cancel)}</ButtonText>
      </SwadowButton>
      <ModalSheet
        modalType={ModalSheetType.confirmation}
        accept={handleCanceledActiveRequest}
        isOpen={isOpenLogoutModal}
        setIsOpen={setIsOpenLogoutModal}
        text={localization.requests.is_canceled_review}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  flex: 1;
  justify-content: flex-end;
`;

const SwadowButton = styled(Button).attrs(() => ({
  fullWidth: true,
}))<{ isDisabled?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primaryBg};
  opacity: ${({ isDisabled, theme }) =>
    isDisabled ? theme.opacity.active : theme.opacity.default};
`;

const ButtonText = styled(Typography).attrs({
  fz: "fz14",
  fw: "fw400",
  color: "dangerColor",
})`
  line-height: 24px;
`;
