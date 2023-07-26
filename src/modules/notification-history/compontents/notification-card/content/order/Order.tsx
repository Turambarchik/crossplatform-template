import React from "react";
import { useTranslation } from "react-i18next";

import { OrderStatus } from "components/molecules/order-status/OrderStatus";
import { localization } from "helpers/constants";

import { NotificationStyles as Styles } from "../../notification-card.styles";
import { useOrderState } from "./order.state";
import type { IOrder } from "./order.types";

const { BaseText, MainText, Flex, Wrapper } = Styles;

const notif = localization.notification;

export const Order = ({ id, time, type, notificationId, isRead }: IOrder) => {
  const { t } = useTranslation();

  const { navigateToOrderDetails } = useOrderState();

  return (
    <Wrapper
      disabled={isRead}
      onPress={() => navigateToOrderDetails(notificationId, id)}
    >
      <Flex>
        <BaseText marginRight={8}>{t(notif.application)}</BaseText>
        <MainText marginRight={8}>№ {id}</MainText>
        <BaseText>{notif.change_status}</BaseText>
      </Flex>
      <Flex justifyContent="space-between" marginTop={8}>
        <OrderStatus statusOrderType={type} />
        <BaseText>{time}</BaseText>
      </Flex>
    </Wrapper>
  );
};
