import React from "react";
import { useTranslation } from "react-i18next";
import type { reviewCategoryEnum } from "types";

import { Divider } from "components/atoms/divider/divider";
import { Spacer } from "components/atoms/spacer/Spacer";
import { localization } from "helpers/constants";
import { requestCategoryConverter } from "helpers/converter";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseCategoryProps = {
  reviewCategoryType: reviewCategoryEnum;
};

const { Box, BaseText, TitleText } = Styles;

export const BaseCategory = ({ reviewCategoryType }: BaseCategoryProps) => {
  const { t } = useTranslation();

  return (
    <Box marginTop={16}>
      <BaseText>{t(localization.requests.category)}:</BaseText>
      <Spacer height={6} />
      <TitleText>{requestCategoryConverter(reviewCategoryType)}</TitleText>
      <Spacer height={16} />
      <Divider />
    </Box>
  );
};
