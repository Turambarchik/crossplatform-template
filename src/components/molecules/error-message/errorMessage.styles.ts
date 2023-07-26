import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const ErrorMessageStyles = {
  ErrorMessageText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw400",
    color: "dangerColor",
  })<{
    marginTop?: number;
    marginBottom?: number;
  }>`
    text-align: center;
    line-height: 14px;
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
    margin-bottom: ${({ marginBottom }) => defaultZero(marginBottom)}px;
  `,
};
