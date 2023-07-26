import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";

export const VerifyPinCodeStyles = {
  Wrapper: styled(Screen)`
    justify-content: space-between;
    padding: 0 24px 52px 24px;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: center;
    line-height: 32px;
  `,
  Info: styled(Typography).attrs({
    fs: "fs12",
    fw: "fw400",
    color: "neutralColor2",
  })`
    margin-top: 8px;
    text-align: center;
    line-height: 20px;
  `,
};
