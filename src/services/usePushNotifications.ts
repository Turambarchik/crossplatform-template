import messaging from "@react-native-firebase/messaging";
import { isNil } from "ramda";
import { useEffect } from "react";
import PushNotification from "react-native-push-notification";

import { navigate } from "helpers/navigation";
import {
  pushNewsBodyConverter,
  pushNewsTitleConverter,
  pushRequestConverter,
  pushStatusConverter,
} from "helpers/pushNotificationsConverter";
import { Routes } from "modules/app/Routes";
import type { NewsStatus } from "modules/news/store/news.store.types";
import { useStoreActions, useStoreState } from "store/store";
import { StatusOrderType } from "types";

export enum PushedMessageType {
  Announce = "announce",
  Order = "order",
  NEW_CITIZEN = "new_citizen",
}

type PushNotificationAnnounceDataType = {
  objectName: string;
  objectId: string;
  objectType: NewsStatus;
  notificationId: string;
  type: PushedMessageType;
};

type PushNotificationOrderDataType = {
  objectCategory: string;
  objectId: string;
  objectStatus: string;
  notificationId: string;
  transactionReason: string;
  transition: string;
  type: PushedMessageType;
};

export type CommonModalSheetProps = Partial<Record<"isOpen", boolean>>;

export const onDisplayNotification = async (message: any) => {
  PushNotification.createChannel(
    {
      channelId: "appname",
      channelName: "My channel",
    },
    (created) => console.warn(`createChannel returned '${created}'`)
  );

  if (message.data.type === PushedMessageType.Order) {
    const orderData: PushNotificationOrderDataType = message.data;
    PushNotification.localNotification({
      channelId: "appname",
      title:
        orderData.objectStatus === StatusOrderType.completed
          ? "Заявка завершена"
          : orderData.objectStatus === StatusOrderType.canceled
          ? "Заявка відмінена"
          : "Заявка",
      message:
        orderData.objectStatus === StatusOrderType.completed
          ? `${pushRequestConverter(
              orderData.objectCategory
            )}. Завершена. Будь ласка, оцініть виконання.`
          : orderData.objectStatus === StatusOrderType.canceled &&
            orderData.transactionReason
          ? `${pushRequestConverter(
              orderData.objectCategory
            )}. Статус заявки: ${
              pushStatusConverter(orderData.objectStatus).label
            }. Причина: ${orderData.transactionReason}`
          : `${pushRequestConverter(
              orderData.objectCategory
            )}. Статус заявки: ${
              pushStatusConverter(orderData.objectStatus).label
            }`,
      userInfo: { type: PushedMessageType.Order, id: orderData.objectId },
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
    });
  }

  if (message.data.type === PushedMessageType.Announce) {
    const announceData: PushNotificationAnnounceDataType = message.data;
    PushNotification.localNotification({
      channelId: "appname",
      title: `${pushNewsTitleConverter(announceData.objectType)}`,
      message: `${pushNewsBodyConverter(announceData.objectType)}`,
      userInfo: {
        type: PushedMessageType.Announce,
        id: announceData.objectId,
      },
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
    });
  }
};

export const usePushNotifications = () => {
  const {
    notification: { readNorification },
  } = useStoreActions((actions) => actions);
  const {
    common: { isLoged },
  } = useStoreState((state) => state);

  const handleNavigateFromPush = (remoteMessage: any) => {
    setTimeout(() => {
      if (isLoged) {
        if (
          remoteMessage &&
          remoteMessage.data?.type === PushedMessageType.Order
        ) {
          navigate(Routes.ActiveRequest, {
            id: remoteMessage.data?.objectId,
            openedFromPush: true,
            notificationId: remoteMessage.data?.notificationId,
          });
        }
        if (
          remoteMessage &&
          remoteMessage.data?.type === PushedMessageType.Announce
        ) {
          navigate(Routes.NewsDetails, {
            id: remoteMessage.data?.objectId,
            openedFromPush: true,
          });
        }
      } else {
        if (!isNil(remoteMessage)) {
          if (remoteMessage.data.notificationId) {
            readNorification({ id: remoteMessage.data.notificationId });
          }
          navigate(Routes.LogIn, {
            pushItemType: remoteMessage ? remoteMessage.data.type : undefined,
            pushNotifItemId: remoteMessage
              ? remoteMessage.data.objectId
              : undefined,
            notificationId: remoteMessage
              ? remoteMessage.data.notificationId
              : undefined,
          });
        }
      }
    }, 1500);
  };

  const navigateWhenAppBackground = (remoteMessage: any) => {
    handleNavigateFromPush(remoteMessage);
  };

  const navigateWhenAppQuit = (remoteMessage: any) => {
    handleNavigateFromPush(remoteMessage);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onDisplayNotification);

    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Check whether an initial notification is available
    messaging().getInitialNotification().then(navigateWhenAppQuit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged]);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(navigateWhenAppBackground);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged]);
};
