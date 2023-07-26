import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import type { AddressType } from "types";

import { localization } from "helpers/constants";
import { addressNameConverter } from "helpers/converter";
import { HeaderCloseButton } from "modules/requests/components/header-close-button/HeaderCloseButton";
import { useSetHeader } from "modules/requests/hooks/useHeader";
import type { RequestsTypeDTO } from "modules/requests/store/requests.store.types";
import { useStoreActions, useStoreState } from "store/store";

const MAX_INPUT_LENGHT = 250;

const usePickFilesAndAddTextState = () => {
  const { t } = useTranslation();
  const { setRequestHeader } = useSetHeader();
  const {
    requests: { newOrder },
  } = useStoreState((state) => state);
  const {
    requests: {
      createNewOrder,
      setNewOrderGallery,
      setNewOrderCategory,
      getRequests,
      setRequestList,
    },
  } = useStoreActions((state) => state);

  const [descriptionText, setDescriptionText] = useState("");
  const [isMediaModalOpened, setIsMediaModalOpened] = useState(false);
  const [isOrderCreatedModalOpened, setIsOrderCreatedModalOpened] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isCanCreateOrder = Boolean(
    newOrder.category && descriptionText && newOrder.space
  );

  const handleCreateNewOrder = () => {
    try {
      setIsLoading(true);
      createNewOrder({ descriptionText }).then(() => {
        getRequests({ page: 1 }).then((data: RequestsTypeDTO[]) => {
          setRequestList(data);
          setIsLoading(false);
          setNewOrderGallery([]);
          setNewOrderCategory(null);
          setIsOrderCreatedModalOpened(true);
        });
      });
    } catch {
      setIsLoading(false);
    }
  };

  const handleMaximumLenght = useCallback(() => {
    if (descriptionText.length >= MAX_INPUT_LENGHT) {
      showMessage({
        type: "warning",
        position: "top",
        message: "Максимальна кількість символів - 250",
      });
    }
  }, [descriptionText.length]);

  useEffect(() => {
    handleMaximumLenght();
  }, [handleMaximumLenght]);

  useEffect(() => {
    setRequestHeader({
      currentText: t(localization.requests.newRequest),
      currentHeaderTitle: addressNameConverter(
        newOrder.space?.address as AddressType
      ),
      HeaderRight: HeaderCloseButton,
    });
  }, [newOrder.space, setRequestHeader, t]);

  const handleDeleteMedia = (selectedId: string) => {
    setNewOrderGallery(
      newOrder.files.filter((el) => el.fileName !== selectedId)
    );
  };

  return {
    isLoading,
    newOrder,
    descriptionText,
    isMediaModalOpened,
    isCanCreateOrder,
    MAX_INPUT_LENGHT,
    setIsMediaModalOpened,
    setDescriptionText,
    handleCreateNewOrder,
    isOrderCreatedModalOpened,
    setIsOrderCreatedModalOpened,
    handleDeleteMedia,
    t,
  };
};
export default usePickFilesAndAddTextState;
