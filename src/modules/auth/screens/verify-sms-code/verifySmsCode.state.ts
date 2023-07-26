import type { Route } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSecondsTimer } from "hooks/useSecondsTimer";
import { Routes } from "modules/app/Routes";
import { useStoreActions, useStoreState } from "store/store";
import { errorMessageByServer } from "store/store.types";

const useVerifySmsCodeState = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    auth: { validateCode, initialVerification },
  } = useStoreActions((actions) => actions);
  const {
    auth: { timeToSendCode },
  } = useStoreState((state) => state);
  const {
    params: { phone },
  } = useRoute<Route<string, { phone: string }>>();

  const [smsCode, onChangeSmsCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isTimerOn = useMemo(
    () => errorMessage.includes(errorMessageByServer.haveToWait),
    [errorMessage]
  );

  const timeToDisplay = useSecondsTimer(timeToSendCode, isTimerOn);

  const handleValidateCode = async () => {
    setIsLoading(true);
    const credentials = {
      phone: phone,
      smsCode: smsCode,
      setErrorMessage,
    };
    validateCode(credentials)
      .then(() => {
        setErrorMessage("");
        navigation.navigate(Routes.CreatePinCode, {
          phone: phone,
          smsCode: smsCode,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRepeatInitialVerification = async () => {
    setIsLoading(true);
    const credentials = {
      phone: phone,
      agreement: true,
      setErrorMessage,
    };
    initialVerification(credentials).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (timeToDisplay === "0:01") {
      setErrorMessage("");
    }
  }, [setErrorMessage, timeToDisplay]);

  return {
    t,
    phone,
    smsCode,
    isLoading,
    timeToDisplay,
    errorMessage,
    isTimerOn,
    onChangeSmsCode,
    handleValidateCode,
    handleRepeatInitialVerification,
  };
};

export default useVerifySmsCodeState;
