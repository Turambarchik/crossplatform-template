import type { Route } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Routes } from "modules/app/Routes";

const useCreatePinCodeState = () => {
  const {
    params: { smsCode, phone },
  } = useRoute<Route<string, { smsCode: string; phone: string }>>();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isBiometricModal, setIsBiometricModal] = useState<boolean>(false);

  const handleCreatePinCode = useCallback(
    (pinCode: string) => {
      navigation.navigate(Routes.VerifyPinCode, { smsCode, phone, pinCode });
    },
    [navigation, phone, smsCode]
  );

  return {
    t,
    isBiometricModal,
    setIsBiometricModal,
    handleCreatePinCode,
  };
};

export default useCreatePinCodeState;
