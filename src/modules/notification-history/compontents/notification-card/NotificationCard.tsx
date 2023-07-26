import type { FC } from "react";
import React from "react";

import { getNotificationDate } from "helpers/date";
import { NotificationType } from "types";

import { Order } from "./content";
import type { NotificationCardType } from "./notification-card.type";

export const NotificationCard = (props: NotificationCardType) => {
  const renderContent: FC<NotificationType> = (typeRender) => {
    switch (typeRender) {
      case NotificationType.order:
        return (
          <Order
            time={getNotificationDate(props.createdAt)}
            id={props.order.id}
            notificationId={props.id}
            type={props.payload.objectStatus}
            isRead={props.read}
          />
        );

      default:
        return null;
    }
  };

  return renderContent(props.type);
};
