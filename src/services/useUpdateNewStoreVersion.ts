import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";
import { checkVersion } from "react-native-check-version";
import Config from "react-native-config";

import { isIOS } from "helpers/constants";

const useUpdateNewStoreVersion = (onLoad = false) => {
  const [isUpdateExist, setIsUpdateExist] = useState(false);

  const openAppStore = useCallback(async () => {
    const storeLink = isIOS ? Config.URL_LINK_IOS : Config.URL_LINK_ANDROID;
    await Linking.openURL(storeLink);
  }, []);

  const handleCheckVersion = useCallback(async () => {
    try {
      const version = await checkVersion({ country: "ua" });
      if (!__DEV__) {
        version.needsUpdate && setIsUpdateExist(true);
      }
    } catch (e) {
      console.warn("handleCheckVersion ex");
    }
  }, []);

  useEffect(() => {
    if (onLoad) {
      handleCheckVersion().then();
    }
  }, [handleCheckVersion, onLoad]);

  return {
    isUpdateExist,
    setIsUpdateExist,
    openAppStore,
    handleCheckVersion,
  };
};

export default useUpdateNewStoreVersion;
