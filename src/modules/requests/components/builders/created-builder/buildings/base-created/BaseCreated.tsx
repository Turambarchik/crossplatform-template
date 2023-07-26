import React from "react";
import { useTranslation } from "react-i18next";

import { Spacer } from "components/atoms/spacer/Spacer";
import { localization } from "helpers/constants";
import { getFullDate } from "helpers/date";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseCreatedProps = {
  created: Date;
};

const { Box, BaseText, TitleText } = Styles;

export const BaseCreated = ({ created }: BaseCreatedProps) => {
  const { t } = useTranslation();

  return (
    <Box marginTop={16}>
      <BaseText>{t(localization.requests.created)}:</BaseText>
      <Spacer height={6} />
      <TitleText>{getFullDate(created)}</TitleText>
      <Spacer height={16} />
    </Box>
  );
};
