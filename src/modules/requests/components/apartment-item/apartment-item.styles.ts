import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const ApartmentItemStyles = {
  Header: styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{ marginTop?: number }>`
    max-width: 80%;
    line-height: 24px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
  `,
};
