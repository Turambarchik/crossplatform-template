import type { Route } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { equals } from "ramda";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";
import { useStoreActions } from "store/store";

const useVerifyPinCodeState = () => {
  const { t } = useTranslation();
  const {
    auth: { createPinCode, setIsAuth },
    app: { getMySpaces },
  } = useStoreActions((actions) => actions);

  const {
    params: { smsCode, phone, pinCode },
  } =
    useRoute<
      Route<string, { smsCode: string; phone: string; pinCode: string }>
    >();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleVerifyPinCode = useCallback(
    async (reapatedPinCode: string) => {
      if (isLoading) return;
      if (equals(pinCode, reapatedPinCode)) {
        try {
          setIsLoading(true);
          await createPinCode({
            phone: phone,
            pinCode: pinCode,
            smsCode: smsCode,
          });
          await getMySpaces();
          setIsAuth(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setErrorMessage(t(localization.errors.enterSamePinCodes));
      }
    },
    [
      createPinCode,
      getMySpaces,
      isLoading,
      phone,
      pinCode,
      setIsAuth,
      smsCode,
      t,
    ]
  );

  return {
    t,
    isLoading,
    errorMessage,
    handleVerifyPinCode,
    setErrorMessage,
  };
};

export default useVerifyPinCodeState;
