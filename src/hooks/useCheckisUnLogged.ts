import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { Routes } from "modules/app/Routes";
import { useStoreState } from "store/store";

export const useCheckisUnLogged = () => {
  const {
    common: { isLoged },
  } = useStoreState((state) => state);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoged) {
      navigation.navigate(Routes.LogIn, {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged]);
};
