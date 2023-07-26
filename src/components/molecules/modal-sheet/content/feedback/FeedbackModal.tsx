import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type FlashMessage from "react-native-flash-message";

import { Loader } from "components/molecules/loader/Loader";
import { MultilineInput } from "components/molecules/multiline-input/MultilineInput";
import { Toaster } from "components/molecules/toaster/Toaster";
import { localization } from "helpers/constants";
import type { RequestsTypeDTO } from "modules/requests/store/requests.store.types";
import { useStoreActions } from "store/store";

import { ModalSheetStyles } from "../../modalSheet.styles";
import type { FeedbackModalProps } from "../../modalSheet.types";
import { FeedbackModalStyles } from "./feedbackModal.styles";

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
  AirbnbRatingStyled,
  KeyboardAvoidingViewStyled,
} = FeedbackModalStyles;

const MAX_INPUT_LENGHT = 100;

export const FeedbackModal = ({
  isOpen,
  setIsOpen,
  iriId,
  id,
}: FeedbackModalProps) => {
  const { t } = useTranslation();
  const {
    requests: { sendFeedback, getActiveRequest, getRequests, setRequestList },
  } = useStoreActions((actions) => actions);
  const [ratingNumber, setRatingNumber] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const localFlashMessageInsdieModal = useRef<FlashMessage>(null);

  const handleMaximumLenght = useCallback(() => {
    if (commentText.length >= MAX_INPUT_LENGHT) {
      // NOTE: inside modal you need to put second instance of <FlashMessage /> and call it
      localFlashMessageInsdieModal.current &&
        localFlashMessageInsdieModal.current.showMessage({
          type: "warning",
          position: "top",
          floating: true,
          message: "Максимальна кількість символів - 100",
        });
    }
  }, [commentText.length]);

  useEffect(() => {
    handleMaximumLenght();
  }, [handleMaximumLenght]);

  const handleAccept = () => {
    setIsLoading(true);

    sendFeedback({ comment: commentText, rating: ratingNumber, iriId })
      .then(() => {
        getActiveRequest({ id }).finally(() => {
          getRequests({ page: 1 })
            .then((requestList: RequestsTypeDTO[]) => {
              setRequestList(requestList);
            })
            .finally(() => {
              setIsOpen(false);
              setIsLoading(false);
            });
        });
      })
      .catch(() => {
        setIsOpen(false);
        setIsLoading(false);
      });
  };

  return (
    <ModalSheetStyles.Modal isVisible={isOpen}>
      <KeyboardAvoidingViewStyled behavior="padding" style={{ height: "100%" }}>
        <Wrapper>
          <Container>
            <Line />
            <HeaderText>{t(localization.requests.yourRating)}</HeaderText>
            <AirbnbRatingStyled
              count={5}
              showRating={false}
              defaultRating={0}
              size={25}
              onFinishRating={(e) => setRatingNumber(e)}
            />
            <InfoText>{`${t(localization.requests.comment)}:`}</InfoText>
            <MultilineInput
              maxLenght={MAX_INPUT_LENGHT}
              maxHeight={90}
              text={commentText}
              setText={setCommentText}
              withClearButton
            />
            <AgreeButton
              variant="secondary"
              fullWidth
              onPress={setIsOpen.bind(null, false)}
            >
              <AgreeText>{t(localization.requests.anotherTime)}</AgreeText>
            </AgreeButton>
            <RefuseButton
              variant="primary"
              withShadow={!!ratingNumber}
              disabled={!ratingNumber}
              fullWidth
              onPress={handleAccept}
            >
              <RefuseText>{t(localization.general.send)}</RefuseText>
            </RefuseButton>
          </Container>
        </Wrapper>
      </KeyboardAvoidingViewStyled>
      <Loader visible={isLoading} transparent />
      <Toaster localFlashMessageInsdieModal={localFlashMessageInsdieModal} />
    </ModalSheetStyles.Modal>
  );
};
