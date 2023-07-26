import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Screen } from "components/atoms/screen/Screen";
import { Typography } from "components/atoms/typography/Typography";
import { defaultZero } from "helpers/functions";

export const ResidentDetailsStyles = {
  Wrapper: styled(Screen)`
    align-items: flex-start;
    justify-content: space-between;
    padding: 16px 16px 32px 16px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw300",
    color: "neutralColor2",
  })`
    line-height: 12px;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "primaryColor",
  })<{ marginTop: number }>`
    margin-top: ${({ marginTop }) => defaultZero(marginTop)}px;
    line-height: 24px;
  `,
  DeleteButton: styled(Button)`
    margin-bottom: 24px;
  `,
  DeleteButtonText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
    color: "dangerColor",
  })`
    margin-left: 8px;
    line-height: 24px;
  `,
};
