import { defaultTo } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { Spacer } from "components/atoms/spacer/Spacer";
import { localization } from "helpers/constants";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseDetailReviewProps = {
  answer: string;
};

const { Box, BaseText, LinkText } = Styles;

export const BaseDetailReview = ({ answer }: BaseDetailReviewProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <BaseText>{t(localization.requests.comment)}:</BaseText>
      <Spacer height={6} />
      <Text value={defaultTo("—", answer)} />
    </Box>
  );
};

const Text = styled(LinkText).attrs(({ theme }) => ({
  textColor: theme.components.typography.primaryColor,
}))``;
