import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";

import { SUPPORT_PHONE_NUMBER } from "helpers/constants";

const useServicesState = () => {
  const { t } = useTranslation();

  const openSupportPhone = useCallback(() => {
    Linking.openURL(`tel:${SUPPORT_PHONE_NUMBER}`);
  }, []);

  return {
    t,
    openSupportPhone,
  };
};

export default useServicesState;
