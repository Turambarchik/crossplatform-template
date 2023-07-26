import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { Divider } from "components/atoms/divider/divider";
import { Spacer } from "components/atoms/spacer/Spacer";
import { localization } from "helpers/constants";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseSubjectOfTheAppealProps = {
  text: string;
};

const { Box, BaseText, LinkText } = Styles;

export const BaseSubjectOfTheAppeal = ({
  text,
}: BaseSubjectOfTheAppealProps) => {
  const { t } = useTranslation();

  return (
    <Box marginTop={16}>
      <BaseText>{t(localization.requests.subject_of_the_appeal)}:</BaseText>
      <Spacer height={6} />
      <Text value={text} lineHeight={24} />
      <Spacer height={16} />
      <Divider />
    </Box>
  );
};

const Text = styled(LinkText).attrs(({ theme }) => ({
  color: theme.components.typography.primaryColor,
}))``;
