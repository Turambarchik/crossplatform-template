import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Routes } from "modules/app/Routes";
import { checkBiometricPermissions } from "services/permisions";
import { useStoreActions, useStoreState } from "store/store";

const useAuthorizationScreenState = () => {
  const {
    auth: { isTriggeredFullLogout },
  } = useStoreState((state) => state);
  const {
    auth: { initialVerification, setIsTriggeredFullLogout, logout },
  } = useStoreActions((actions) => actions);

  const navigation = useNavigation();
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleInitialVerification = async () => {
    setIsLoading(true);
    const credentials = {
      phone: `+380${phone.split(" ").join("")}`,
      agreement: true,
      setErrorMessage,
    };
    initialVerification(credentials)
      .then(() => {
        navigation.navigate(Routes.VerifySmsCode, {
          phone: `+380${phone.split(" ").join("")}`,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isTriggeredFullLogout) {
      logout().finally(() => {
        setIsTriggeredFullLogout(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkBiometricPermissions();
  }, []);

  return {
    t,
    errorMessage,
    phone,
    isError,
    isLoading,
    setIsError,
    setErrorMessage,
    setPhone,
    handleInitialVerification,
  };
};

export default useAuthorizationScreenState;
