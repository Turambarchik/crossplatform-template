import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";

import { Routes } from "modules/app/Routes";

type useCustomBackHandlerProps = {
  navigate?: () => void;
};

export const useCustomBackHandler = ({
  navigate,
}: useCustomBackHandlerProps) => {
  const navigation = useNavigation();

  const handleCustomNavigate = () => {
    if (navigate) {
      navigate();
    } else {
      navigation.navigate(Routes.TabBar);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleCustomNavigate();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  useEffect(() => {
    const onBackPress = () => {
      handleCustomNavigate();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
