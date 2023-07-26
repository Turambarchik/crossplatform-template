import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";

export const BiometricModalStyles = {
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
  SVGIconFaceId: styled(SVGIcon).attrs({
    type: "faceId",
  })`
    align-self: center;
    margin-bottom: 16px;
  `,
  SVGIconTouchId: styled(SVGIcon).attrs({
    type: "fingerPrint",
  })`
    align-self: center;
    margin-bottom: 16px;
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
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: center;
    line-height: 32;
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
  RefuseText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "primaryColor",
  })`
    line-height: 24px;
  `,
};
