import { isEmpty, isNil } from "ramda";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Asset } from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { Loader } from "components/molecules/loader/Loader";
import { localization } from "helpers/constants";
import {
  checkCameraPhotoPermissions,
  checkGalleryPermissions,
  PermissionsStatus,
} from "services/permisions";
import { useStoreActions, useStoreState } from "store/store";

import { ModalSheet } from "../../ModalSheet";
import { ModalSheetStyles } from "../../modalSheet.styles";
import type { MediaModalProps } from "../../modalSheet.types";
import { ModalSheetType } from "../../modalSheet.types";
import { MediaModalStyles } from "./mediaModal.styles";

const { Container, Line, Wrapper, AgreeButton, AgreeText, RefuseButton, Text } =
  MediaModalStyles;

const MAX_PHOTOS_LENGTH = 5;

export const MediaModal = ({ isOpen, setIsOpen }: MediaModalProps) => {
  const { t } = useTranslation();
  const {
    requests: { newOrder },
  } = useStoreState((state) => state);
  const {
    requests: { setNewOrderGallery },
  } = useStoreActions((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isNestedModal, setIsNestedModal] = useState(false);

  const openCamera = () => {
    checkCameraPhotoPermissions().then((res: PermissionsStatus | null) => {
      if (
        res === PermissionsStatus.granted ||
        res === PermissionsStatus.limited
      ) {
        launchCamera(
          { mediaType: "photo", quality: 0.5, maxWidth: 200, maxHeight: 200 },
          (response) => {
            if (response?.assets) {
              setIsLoading(true);
              if (newOrder.files.length) {
                setNewOrderGallery([...newOrder.files, response?.assets[0]]);
                setIsOpen(false);
              } else {
                const croppedImagesData = newOrder.files.slice(
                  0,
                  MAX_PHOTOS_LENGTH - 1
                );
                setNewOrderGallery([...croppedImagesData, response?.assets[0]]);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
                setIsOpen(false);
              }
            } else if (response?.didCancel) {
              setIsOpen(false);
              setIsLoading(false);
            }
          }
        );
      } else if (res === PermissionsStatus.blocked) {
        setIsNestedModal(true);
        setIsOpen(false);
      }
    });
  };

  const openPhotosGallery = () => {
    checkGalleryPermissions().then((res: PermissionsStatus | null) => {
      if (
        res === PermissionsStatus.granted ||
        res === PermissionsStatus.limited
      ) {
        launchImageLibrary(
          {
            mediaType: "photo",
            quality: 0.4,
            selectionLimit: 2,
            includeBase64: true,
            maxWidth: 200,
            maxHeight: 200,
          },
          (response) => {
            setIsLoading(true);
            if (response?.assets) {
              const pickerImages = response?.assets.slice(0, 5);
              const currentArrayValues =
                MAX_PHOTOS_LENGTH - newOrder.files.length;
              const availablePhotosToAdd = pickerImages.slice(
                0,
                currentArrayValues
              );
              const uniquePhotosValues = [
                ...newOrder.files.map((el) => el?.base64),
                ...availablePhotosToAdd?.map((el) => el?.base64),
              ];
              const outputData = uniquePhotosValues.map((el) =>
                [...pickerImages, ...newOrder.files].find(
                  (item) => item.base64 === el
                )
              );
              if (!isEmpty(outputData) || !isNil(outputData)) {
                setNewOrderGallery(outputData as Asset[]);
              }
              setIsOpen(false);

              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            } else if (response?.didCancel) {
              setIsOpen(false);
              setIsLoading(false);
            }
          }
        );
      } else if (res === PermissionsStatus.blocked) {
        setIsNestedModal(true);
        setIsOpen(false);
      }
    });
  };

  const onModalHide = () => {
    if (isNestedModal) {
      setIsOpen(false);
      setIsSettingModal(true);
    }
  };

  const quitModal = () => {
    setIsNestedModal(false);
    setIsSettingModal(false);
    setIsOpen(false);
  };

  return (
    <>
      <ModalSheetStyles.Modal isVisible={isOpen} onModalHide={onModalHide}>
        <Wrapper>
          <Container>
            <Line />
            <RefuseButton variant="secondary" fullWidth onPress={openCamera}>
              <Text>{t(localization.requests.takePicture)}</Text>
            </RefuseButton>
            <RefuseButton
              variant="secondary"
              fullWidth
              onPress={openPhotosGallery}
            >
              <Text>{t(localization.requests.chooseFromLibrary)}</Text>
            </RefuseButton>
            <AgreeButton variant="primary" fullWidth onPress={quitModal}>
              <AgreeText>{t(localization.general.cancel)}</AgreeText>
            </AgreeButton>
          </Container>
        </Wrapper>
        <Loader visible={isLoading} transparent />
      </ModalSheetStyles.Modal>
      {isSettingModal && (
        <ModalSheet
          isOpen={isSettingModal}
          setIsOpen={setIsSettingModal}
          quitModal={quitModal}
          modalType={ModalSheetType.phoneSettings}
        />
      )}
    </>
  );
};
