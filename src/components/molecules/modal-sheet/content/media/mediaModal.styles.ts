import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Typography } from "components/atoms/typography/Typography";

export const MediaModalStyles = {
  Wrapper: styled.View`
    flex: 1;
    width: 100%;
    justify-content: flex-end;
  `,
  Container: styled.View`
    border-radius: 16px;
    padding: 16px 24px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  Line: styled.View`
    top: -10;
    width: 64;
    height: 3px;
    align-self: center;
    position: absolute;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  AgreeButton: styled(Button)`
    margin-top: 16px;
  `,
  RefuseButton: styled(Button)`
    margin-top: 16px;
  `,
  AgreeText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "tertiaryColor",
  })`
    line-height: 24px;
  `,
  Text: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "primaryColor",
  })`
    line-height: 24px;
  `,
};
