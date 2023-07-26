import { isNil } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import type { StatusOrderType } from "types";

import { Divider } from "components/atoms/divider/divider";
import { Spacer } from "components/atoms/spacer/Spacer";
import { OrderStatus } from "components/molecules/order-status/OrderStatus";
import { localization } from "helpers/constants";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseCanceledProps = {
  canceledText: string;
  orderStatusType: StatusOrderType;
};

const { Box, BaseText, FlexWrapper, LinkText } = Styles;

export const BaseCanceled = ({
  canceledText,
  orderStatusType,
}: BaseCanceledProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <FlexWrapper withoutPadding>
        {!isNil(canceledText) ? (
          <BaseText>{t(localization.requests.comment)}:</BaseText>
        ) : (
          <BaseText />
        )}
        <OrderStatus statusOrderType={orderStatusType} />
      </FlexWrapper>
      {!isNil(canceledText) && (
        <>
          <Spacer height={14} />

          <Wrapper>
            <LinkText value={canceledText} />
          </Wrapper>
        </>
      )}
      <Spacer height={16} />
      <Divider />
    </Box>
  );
};

const Wrapper = styled.View`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.thirdBg};
`;
