import { isNil } from "ramda";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Loader } from "components/molecules/loader/Loader";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { localization } from "helpers/constants";
import { biometricTextConverter } from "helpers/converter";
import {
  checkBiometricPermissions,
  PermissionsStatus,
} from "services/permisions";
import useBiometric from "services/useBiometric";
import { useStoreState } from "store/store";

import { UserInfoStyles } from "./userInfo.styles";

const {
  Line,
  RegularText,
  InfoText,
  ContentContainer,
  FaceIdSwitcher,
  ContentContainerRow,
} = UserInfoStyles;

export const UserInfo = () => {
  const { t } = useTranslation();
  const {
    profile: { userProfile },
    app: { isBiometricActive },
  } = useStoreState((state) => state);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBiometricSupport, setIsBiometricSupport] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);

  const {
    activateBiometric,
    disableBiometric,
    biometricType,
    isBiometricSupported,
  } = useBiometric();

  const toggleBiometricSwitch = async (value: boolean) => {
    setIsLoading(true);
    const bimetricPermissionState: PermissionsStatus | null =
      await checkBiometricPermissions();

    if (
      bimetricPermissionState !== PermissionsStatus.blocked &&
      bimetricPermissionState !== PermissionsStatus.denied
    ) {
      if (!value) {
        disableBiometric().finally(() => {
          setIsLoading(false);
        });
      } else {
        activateBiometric().finally(() => {
          setIsLoading(false);
        });
      }
    } else {
      setIsLoading(false);
      setIsSettingModal(true);
    }
  };

  useEffect(() => {
    const checkIsBiometricSupported = async () => {
      try {
        setIsLoading(true);

        setIsBiometricSupport(await isBiometricSupported());
      } finally {
        setIsLoading(false);
      }
    };
    checkIsBiometricSupported();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isNil(userProfile)) return null;
  return (
    <>
      <ContentContainer marginTop={16}>
        <InfoText>{t(localization.profile.FIO)}</InfoText>
        <RegularText marginTop={6}>{userProfile.name}</RegularText>
        <Line />
        <InfoText>{t(localization.profile.phoneNumber)}</InfoText>
        <RegularText marginTop={6}>{userProfile.phone}</RegularText>
      </ContentContainer>
      {isBiometricSupport && (
        <ContentContainerRow marginTop={16}>
          <RegularText numberOfLines={2}>
            {biometricTextConverter(biometricType)}
          </RegularText>
          <FaceIdSwitcher
            value={isBiometricActive}
            onValueChange={toggleBiometricSwitch}
          />
        </ContentContainerRow>
      )}
      <Loader visible={isLoading} transparent />
      <ModalSheet
        isOpen={isSettingModal}
        setIsOpen={setIsSettingModal}
        quitModal={setIsSettingModal.bind(null, false)}
        modalType={ModalSheetType.phoneSettings}
      />
    </>
  );
};
