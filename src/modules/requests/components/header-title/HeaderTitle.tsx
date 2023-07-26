import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { StickyHeaderStyles } from "components/molecules/sticky-header/spaceHeader.styles";
import { localization } from "helpers/constants";

const { CenterWrapper } = StickyHeaderStyles;

export const HeaderTitle = () => {
  const { t } = useTranslation();
  return (
    <CenterWrapper disabled>
      <HeaderText>{t(localization.requests.newRequest) as string}</HeaderText>
    </CenterWrapper>
  );
};

const HeaderText = styled(Typography).attrs({
  fz: "fz18",
  fw: "fw500",
  color: "primaryColor",
})`
  line-height: 22px;
`;
