import type { FC } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";
import { StatusOrderType } from "types/index";

import { Text, TextWithIcon } from "./content/index";
import { Styles } from "./orderStatus.styles";
import type { OrderStatusProps } from "./orderStatus.type";

const { Wrapper } = Styles;

const notif = localization.notification;

export const OrderStatus = (props: Omit<OrderStatusProps, "text">) => {
  const { t } = useTranslation();

  const renderContent: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.canceled:
        return <Text {...props} text={t(notif.canceled)} />;

      case StatusOrderType.consideration:
        return <Text {...props} text={t(notif.consideration)} />;

      case StatusOrderType.in_progress:
        return <Text {...props} text={t(notif.in_progress)} />;

      case StatusOrderType.new:
        return <Text {...props} text={t(notif.new)} />;

      case StatusOrderType.completed:
        return <TextWithIcon {...props} text={t(notif.completed)} />;

      default:
        return null;
    }
  };

  return (
    <Wrapper type={props.statusOrderType}>
      {renderContent(props.statusOrderType)}
    </Wrapper>
  );
};
