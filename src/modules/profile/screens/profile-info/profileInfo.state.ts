import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useStoreActions, useStoreState } from "store/store";

const useProfileInfoState = () => {
  const { t } = useTranslation();
  const {
    auth: { logout },
    profile: { getUserProfile },
  } = useStoreActions((actions) => actions);
  const {
    app: { isBiometricActive },
    profile: { userProfile },
  } = useStoreState((state) => state);

  const [isUserInfo, setIsUserInfo] = useState(true);
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleGetUserProfile = useCallback(() => {
    setIsLoading(true);
    getUserProfile().finally(() => {
      setIsLoading(false);
    });
  }, [setIsLoading, getUserProfile]);

  return {
    t,
    getUserProfile,
    isUserInfo,
    setIsUserInfo,
    setIsOpenLogoutModal,
    handleGetUserProfile,
    handleLogout,
    userProfile,
    isLoading,
    isOpenLogoutModal,
    isBiometricActive,
  };
};

export default useProfileInfoState;
