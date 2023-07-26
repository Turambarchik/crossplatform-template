import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { localization } from "helpers/constants";
import { Routes } from "modules/app/Routes";
import { useStoreActions, useStoreState } from "store/store";

export const CloseModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const {
    requests: { isOpenConfirmCloseModal },
  } = useStoreState((state) => state);

  const {
    requests: { resetNewRequest, setIsOpenConfirmCloseModal },
  } = useStoreActions((state) => state);

  const closeAndResetNewRequest = () => {
    resetNewRequest();
    navigation.navigate(Routes.Requests);
  };

  return (
    <ModalSheet
      modalType={ModalSheetType.confirmation}
      accept={closeAndResetNewRequest}
      isOpen={isOpenConfirmCloseModal}
      setIsOpen={setIsOpenConfirmCloseModal}
      text={t(localization.requests.cancelNewRequest) as string}
    />
  );
};
