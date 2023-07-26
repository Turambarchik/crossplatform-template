import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";

export const OrderCreatedModalStyles = {
  Wrapper: styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
  `,
  Container: styled.View`
    border-radius: 16px;
    padding: 48px 16px 24px 24px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  IconContainer: styled.View`
    justify-content: center;
  `,
  InProcessIcon: styled(SVGIcon)`
    align-self: center;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    margin-top: 32px;
    text-align: center;
    line-height: 32;
  `,
  AgreeButton: styled(Button)`
    margin-top: 32px;
  `,
  AgreeText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "tertiaryColor",
  })`
    line-height: 24px;
  `,
};
