import { useNavigation } from "@react-navigation/native";
import { equals, isNil } from "ramda";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Divider } from "components/atoms/divider/divider";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { OrderStatus } from "components/molecules/order-status/OrderStatus";
import { RichText } from "components/molecules/rich-text/RichText";
import { localization } from "helpers/constants";
import { requestCategoryConverter } from "helpers/converter";
import { getFullDate } from "helpers/date";
import { Routes } from "modules/app/Routes";
import { StatusOrderType } from "types";

import { NotificationStyles as Styles } from "./requestCard.styles";
import type { RequestCardType } from "./requestCard.type";

const {
  Wrapper,
  FlexWrapper,
  MainText,
  Icon,
  Box,
  BaseText,
  DescriptionWrapper,
  LeaveFeedbackWrapper,
} = Styles;

export const RequestCard = (props: RequestCardType) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isFeedBackModalOpened, setIsFeedBackModalOpened] = useState(false);

  const navigateToActiveRequest = () => {
    navigation.navigate(Routes.ActiveRequest, {
      id: props.id,
    });
  };

  return (
    <Wrapper onPress={navigateToActiveRequest}>
      <FlexWrapper>
        <MainText>{`${t(localization.requests.requestsNumber)} — ${
          props.id
        }`}</MainText>
        <OrderStatus statusOrderType={props.status} />
      </FlexWrapper>
      <Divider />
      <FlexWrapper marginTop={16}>
        {!isNil(props.review) && (
          <Box>
            <BaseText marginTop={3} marginRight={4}>{`${t(
              localization.requests.your_review
            )} ${props.review.rating}`}</BaseText>
            <Icon type="star" />
          </Box>
        )}
        <Box>
          <Icon type="calendar" />
          <BaseText marginTop={3} marginLeft={8}>
            {getFullDate(props.createdAt)}
          </BaseText>
        </Box>
      </FlexWrapper>
      {props.description && (
        <DescriptionWrapper>
          <BaseText>{requestCategoryConverter(props.category)}:</BaseText>
          <RichText value={props.description} lineHeight={22} fz="fz14" />
        </DescriptionWrapper>
      )}
      {isNil(props.review) &&
        equals(props.status, StatusOrderType.completed) && (
          <LeaveFeedbackWrapper
            onPress={setIsFeedBackModalOpened.bind(null, true)}
          >
            <MainText fw="fw700" fz="fz14">
              {t(localization.requests.leave_feedback)}
            </MainText>
          </LeaveFeedbackWrapper>
        )}
      <ModalSheet
        modalType={ModalSheetType.feedback}
        iriId={props["@id"]}
        id={props.id}
        isOpen={isFeedBackModalOpened}
        setIsOpen={setIsFeedBackModalOpened}
      />
    </Wrapper>
  );
};
