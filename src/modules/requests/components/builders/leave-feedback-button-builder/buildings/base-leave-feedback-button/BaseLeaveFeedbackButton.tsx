import { isNil } from "ramda";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { localization } from "helpers/constants";
import type { Review } from "modules/requests/store/requests.store.types";
import { useStoreState } from "store/store";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseLeaveFeedbackButtonProps = {
  review: Review | null;
};

const { Box, TitleText } = Styles;

export const BaseLeaveFeedbackButton = ({
  review,
}: BaseLeaveFeedbackButtonProps) => {
  const { t } = useTranslation();
  const {
    requests: { activeRequest },
  } = useStoreState((state) => state);

  const [isFeedBackModalOpened, setIsFeedBackModalOpened] =
    useState<boolean>(false);

  if (!isNil(review)) {
    return null;
  }

  if (isNil(activeRequest)) {
    return null;
  }

  return (
    <Wrapper marginTop={16} isFullHeight={isNil(review)}>
      <Button fullWidth onPress={setIsFeedBackModalOpened.bind(null, true)}>
        <TitleText color="tertiaryColor">
          {t(localization.requests.leave_feedback)}
        </TitleText>
      </Button>
      <ModalSheet
        modalType={ModalSheetType.feedback}
        id={activeRequest.id}
        iriId={activeRequest["@id"]}
        isOpen={isFeedBackModalOpened}
        setIsOpen={setIsFeedBackModalOpened}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ isFullHeight?: boolean }>`
  flex: ${({ isFullHeight }) => (isFullHeight ? undefined : 1)};
  justify-content: ${({ isFullHeight }) =>
    isFullHeight ? "flex-end" : "flex-start"};
`;
