import { useNavigation } from "@react-navigation/native";
import { isNil } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { localization } from "helpers/constants";
import { Routes } from "modules/app/Routes";
import type { Review } from "modules/requests/store/requests.store.types";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseCheckReviewProps = {
  review: Review | null;
};

const { Box, TitleText } = Styles;

export const BaseCheckReview = ({ review }: BaseCheckReviewProps) => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const goToDetailsScreen = () =>
    navigation.navigate(Routes.ActiveRequestDetails);

  return (
    <Wrapper marginTop={16} isFullHeight={!isNil(review)}>
      <Button fullWidth bgColor="secondaryColor" onPress={goToDetailsScreen}>
        <TitleText>{t(localization.requests.check_review_details)}</TitleText>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ isFullHeight?: boolean }>`
  ${({ isFullHeight }) => isFullHeight && "flex: 1"};
  justify-content: flex-end;
`;
