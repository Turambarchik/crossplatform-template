import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

import { Routes } from "modules/app/Routes";
import { useStoreActions } from "store/store";

export const useOrderState = () => {
  const navigation = useNavigation();
  const {
    notification: { readNorification },
  } = useStoreActions((state) => state);

  const handleReadNotification = useCallback(
    async (id: string) => {
      await readNorification({ id });
    },
    [readNorification]
  );

  const navigateToOrderDetails = useCallback(
    async (notificationId: string, orderId: number) => {
      await handleReadNotification(notificationId);
      navigation.navigate(Routes.ActiveRequest, {
        id: Number(orderId),
      });
    },
    [handleReadNotification, navigation]
  );

  return {
    handleReadNotification,
    navigateToOrderDetails,
  };
};
