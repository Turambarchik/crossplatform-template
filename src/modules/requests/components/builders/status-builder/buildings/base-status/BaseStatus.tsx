import React from "react";
import { useTranslation } from "react-i18next";
import type { StatusOrderType } from "types";

import { Divider } from "components/atoms/divider/divider";
import { Spacer } from "components/atoms/spacer/Spacer";
import { OrderStatus } from "components/molecules/order-status/OrderStatus";
import { localization } from "helpers/constants";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseStatusProps = {
  orderStatusType: StatusOrderType;
};

const { FlexWrapper, BaseText, Box } = Styles;

export const BaseStatus = ({ orderStatusType }: BaseStatusProps) => {
  const { t } = useTranslation();

  return (
    <>
      <FlexWrapper>
        <BaseText>{t(localization.requests.status)}:</BaseText>
        <OrderStatus statusOrderType={orderStatusType} />
      </FlexWrapper>
      <Spacer height={16} />
      <Box>
        <Divider />
      </Box>
    </>
  );
};
