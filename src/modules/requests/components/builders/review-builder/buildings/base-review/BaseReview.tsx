import { isNil } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { Divider } from "components/atoms/divider/divider";
import { SVGIcon } from "components/atoms/icon/Icon";
import { Spacer } from "components/atoms/spacer/Spacer";
import { Typography } from "components/atoms/typography/Typography";
import { localization } from "helpers/constants";
import type { Review } from "modules/requests/store/requests.store.types";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseReviewProps = {
  review: Review | null;
};

const { Box, FlexWrapper, BaseText, LinkText } = Styles;

export const BaseReview = ({ review }: BaseReviewProps) => {
  const { t } = useTranslation();

  if (isNil(review)) {
    return null;
  }

  return (
    <>
      <Box>
        <Divider />
      </Box>
      <Box marginTop={16}>
        <FlexWrapper withoutPadding>
          <BaseText>{t(localization.requests.your_review_2)}:</BaseText>
          <ReviewWrapper>
            <ReviewText>{`${t(localization.requests.review)}: ${
              review?.rating
            }`}</ReviewText>
            <SVGIcon type="star" />
          </ReviewWrapper>
        </FlexWrapper>
        {review.comment ? (
          <>
            <Spacer height={14} />
            <ReviewTextWrapper>
              <ReviewTextLink value={review.comment} />
            </ReviewTextWrapper>
          </>
        ) : null}

        <Spacer height={16} />
      </Box>
    </>
  );
};

const ReviewWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.lightBlack};
  padding: 10px 8px;
  border-radius: 40px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const ReviewTextWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  padding: 12px;
`;

const ReviewText = styled(Typography).attrs({
  fz: "fz11",
  fw: "fw500",
  color: "tertiaryColor",
})`
  line-height: 11px;
  margin-right: 5px;
  margin-top: 3px;
`;

const ReviewTextLink = styled(LinkText).attrs(({ theme }) => ({
  textColor: theme.components.typography.primaryColor,
}))``;
