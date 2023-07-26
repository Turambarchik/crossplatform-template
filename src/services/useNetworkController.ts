import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import ReactNativeBiometrics from "react-native-biometrics";

import { useStoreActions } from "store/store";

export const rnBiometrics = new ReactNativeBiometrics();

const useNetworkController = () => {
  const {
    common: { setIsNetworkError },
  } = useStoreActions((state) => state);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsNetworkError(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNetworkController;
