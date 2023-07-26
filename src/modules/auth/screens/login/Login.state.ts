import type { Route } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { and, equals, isNil } from "ramda";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";
import { Routes } from "modules/app/Routes";
import { TIMES_CAN_TO_LOGIN } from "modules/auth/store/auth.store";
import useBiometric from "services/useBiometric";
import { PushedMessageType } from "services/usePushNotifications";
import { useStoreActions, useStoreState } from "store/store";

const useLoginState = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    params: { pushNotifItemId, pushItemType },
  } = useRoute<
    Route<
      string,
      {
        pushNotifItemId?: string;
        pushItemType?: string;
        notificationId?: string;
      }
    >
  >();

  const {
    common: { setIsLoged },
    app: { setTimesToLogin, setTimesToLoginReset, getMySpaces },
    auth: { logout },
    news: { getNews, getEmergencyNews, setNewsList },
  } = useStoreActions((actions) => actions);
  const {
    app: { timesToLogin },
    auth: { pinCode },
  } = useStoreState((state) => state);

  const {
    checkBiometricIsActive,
    singInWithBiometric,
    biometricType,
    isBiometricActive,
  } = useBiometric();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [isNotRememberModal, setIsNotRememberModal] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const isNeedToAuthorize = timesToLogin >= TIMES_CAN_TO_LOGIN;

  const [isUnCorrectPinCodeModal, setIsUnCorrectPinCodeModal] =
    useState<boolean>(false);
  const [isInccorrectPinCode, setisInccorrectPinCode] =
    useState<boolean>(false);

  const handleEnterApp = useCallback(() => {
    if (
      !isNil(pushNotifItemId) &&
      equals(pushItemType, PushedMessageType.Order)
    ) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: Routes.ActiveRequest,
            params: { id: Number(pushNotifItemId), openedFromPush: true },
          },
        ],
      });
      return;
    }
    if (
      !isNil(pushNotifItemId) &&
      equals(pushItemType, PushedMessageType.Announce)
    ) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: Routes.NewsDetails,
            params: { id: pushNotifItemId, openedFromPush: true },
          },
        ],
      });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.TabBar }],
    });
  }, [navigation, pushItemType, pushNotifItemId]);

  const authorize = () => {
    setIsLoading(true);
    logout().finally(() => {
      navigation.navigate(Routes.Auth);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isNeedToAuthorize) {
      setIsUnCorrectPinCodeModal(true);
    }
  }, [isNeedToAuthorize]);

  useEffect(() => {
    if (isInccorrectPinCode) {
      setTimesToLogin();
      setTimeout(() => {
        setisInccorrectPinCode(false);
      }, 300);
    }
  }, [isInccorrectPinCode, setTimesToLogin]);

  const handleCheckPinCode = useCallback(
    (enteredPinCode: string) => {
      if (!isLoading) {
        if (equals(enteredPinCode, pinCode)) {
          setTimesToLoginReset();
          setIsLoading(true);
          Promise.all([getNews({ page: 1 }), getEmergencyNews(), getMySpaces()])
            .then((res) => {
              setNewsList(res[0]);
              setIsLoged(true);
              handleEnterApp();
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          setErrorMessage(t(localization.errors.uncorrectPinCode));
          setIsLoading(false);
          setisInccorrectPinCode(true);
        }
      }
    },
    [
      getEmergencyNews,
      getMySpaces,
      getNews,
      handleEnterApp,
      isLoading,
      pinCode,
      setIsLoged,
      setNewsList,
      setTimesToLoginReset,
      t,
    ]
  );

  const handleSingInWithBiometric = () => {
    singInWithBiometric()
      .then(() => {
        setIsMounted(false);
        setIsLoading(true);
        Promise.all([getNews({ page: 1 }), getEmergencyNews(), getMySpaces()])
          .then((res) => {
            setNewsList(res[0]);
            setIsLoged(true);
            handleEnterApp();
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    checkBiometricIsActive().finally(() => {
      setIsLoading(false);
      setIsMounted(true);
      if (and(isBiometricActive, !isNil(biometricType))) {
        handleSingInWithBiometric();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biometricType, isBiometricActive]);

  return {
    t,
    isNeedToAuthorize,
    isNotRememberModal,
    isLoading,
    isUnCorrectPinCodeModal,
    errorMessage,
    biometricType,
    isBiometricActive,
    isMounted,
    handleSingInWithBiometric,
    authorize,
    setIsUnCorrectPinCodeModal,
    setIsNotRememberModal,
    handleCheckPinCode,
    setErrorMessage,
  };
};

export default useLoginState;
