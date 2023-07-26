import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import { DEVICE_WIDTH } from "helpers/constants";

export const ServiceContainerStyles = {
  Container: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    width: ${DEVICE_WIDTH / 2.3};
    height: 80px;
    margin-top: 16px;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  Point: styled.View`
    position: absolute;
    width: 18px;
    height: 18px;
    left: 145px;
    top: 6px;
    border-radius: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.components.point.primaryColor};
  `,
  PointText: styled(Typography).attrs({
    fz: "fz8",
    fw: "fw500",
    color: "primaryColor",
  })`
    line-height: 8px;
  `,
};
