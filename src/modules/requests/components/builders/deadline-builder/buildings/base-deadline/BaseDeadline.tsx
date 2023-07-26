import React from "react";
import { useTranslation } from "react-i18next";
import type { StatusOrderType } from "types";

import { Divider } from "components/atoms/divider/divider";
import { Spacer } from "components/atoms/spacer/Spacer";
import { OrderStatus } from "components/molecules/order-status/OrderStatus";
import { localization } from "helpers/constants";
import { getFullDate } from "helpers/date";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseDeadlineProps = {
  orderStatusType: StatusOrderType;
  deadlineDate: Date;
};

const { Box, FlexWrapper, BaseText, TitleText } = Styles;

const requests = localization.requests;

export const BaseDeadline = ({
  orderStatusType,
  deadlineDate,
}: BaseDeadlineProps) => {
  const { t } = useTranslation();

  return (
    <Box marginTop={16}>
      <FlexWrapper withoutPadding>
        <BaseText>{t(localization.requests.deadline)}:</BaseText>
        <OrderStatus statusOrderType={orderStatusType} />
      </FlexWrapper>

      <Spacer height={14} />

      <TitleText>{`${t(requests.for)} ${getFullDate(deadlineDate)} (${t(
        requests.including
      )})`}</TitleText>

      <Spacer height={16} />

      <Divider />
    </Box>
  );
};
