import { useHeaderHeight } from "@react-navigation/elements";
import { isEmpty } from "ramda";
import React from "react";

import { Button } from "components/atoms/button/Button";
import { SVGIcon } from "components/atoms/icon/Icon";
import Image from "components/atoms/image/Image";
import { Loader } from "components/molecules/loader/Loader";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { MultilineInput } from "components/molecules/multiline-input/MultilineInput";
import { localization } from "helpers/constants";
import { requestCategoryConverter } from "helpers/converter";
import { CloseModal } from "modules/requests/components/close-modal/CloseModal";

import usePickFilesAndAddTextState from "./pickFilesAndAddText.state";
import { PickFilesAndAddTextStyles } from "./pickFilesAndAddText.styles";

const {
  Wrapper,
  ButtonText,
  Title,
  Icon,
  ScrollView,
  FormContainer,
  Text,
  InfoText,
  Line,
  MediaContainer,
  MediaItemContainer,
  DeleteMediaContainer,
  AddMediaButton,
} = PickFilesAndAddTextStyles;

export const PickFilesAndAddText = () => {
  const headerHeight = useHeaderHeight();

  const {
    t,
    isLoading,
    newOrder,
    descriptionText,
    setDescriptionText,
    isMediaModalOpened,
    handleCreateNewOrder,
    isOrderCreatedModalOpened,
    isCanCreateOrder,
    MAX_INPUT_LENGHT,
    setIsOrderCreatedModalOpened,
    handleDeleteMedia,
    setIsMediaModalOpened,
  } = usePickFilesAndAddTextState();

  return (
    <Wrapper>
      <ScrollView headerHeight={headerHeight}>
        <Title>{t(localization.general.create)}</Title>
        <FormContainer>
          {newOrder.category && (
            <Text>{requestCategoryConverter(newOrder.category)}</Text>
          )}
          <Line />
          <InfoText>{`${t(
            localization.requests.whatHappenedAndWhere
          )}:`}</InfoText>
          <MultilineInput
            maxLenght={MAX_INPUT_LENGHT}
            maxHeight={140}
            text={descriptionText}
            setText={setDescriptionText}
          />
        </FormContainer>
        <AddMediaButton>
          <Button
            variant="secondary"
            fullWidth
            onPress={setIsMediaModalOpened.bind(null, true)}
          >
            <Icon type="plus" color="black" />
            <ButtonText color="primaryColor">
              {t(localization.requests.addPhotoVideo)}
            </ButtonText>
          </Button>
        </AddMediaButton>
        {!isEmpty(newOrder.files) && (
          <MediaContainer>
            {newOrder.files.map((el, idx) => (
              <MediaItemContainer key={idx}>
                <Image
                  source={{ uri: el.uri }}
                  height={101}
                  width={101}
                  borderRadius={8}
                />
                <DeleteMediaContainer
                  onPress={() => handleDeleteMedia(el.fileName ?? "")}
                >
                  <SVGIcon type="close" />
                </DeleteMediaContainer>
              </MediaItemContainer>
            ))}
          </MediaContainer>
        )}
      </ScrollView>
      <Button
        withShadow={isCanCreateOrder}
        disabled={!isCanCreateOrder}
        variant="primary"
        fullWidth
        onPress={handleCreateNewOrder}
      >
        <ButtonText color="tertiaryColor">
          {t(localization.general.create)}
        </ButtonText>
      </Button>
      <ModalSheet
        modalType={ModalSheetType.media}
        isOpen={isMediaModalOpened}
        setIsOpen={setIsMediaModalOpened}
      />
      <ModalSheet
        modalType={ModalSheetType.orderCreated}
        isOpen={isOrderCreatedModalOpened}
        setIsOpen={setIsOrderCreatedModalOpened}
      />
      <CloseModal />
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};
