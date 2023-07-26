import { ReText } from "react-native-redash";
import styled from "styled-components/native";

import { CustomText } from "components/text";
import { isIOS } from "helpers/constants";
import theme from "theme/theme";

export const DoubleCircleProgressBarsStyles = {
  CircleContainer: styled.View<{ width: number; height: number }>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    justify-content: center;
    align-items: center;
  `,
  TextContainer: styled.View<{
    bottom: number;
    right: number;
    top: number;
    left: number;
  }>`
    position: absolute;
    flex-direction: row;
    align-items: center;
    bottom: ${({ bottom }) => bottom};
    right: ${({ right }) => right};
    top: ${({ top }) => top};
    left: ${({ left }) => left};
  `,
  VerticalSeparator: styled.View`
    transform: rotate(135deg);
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.lightGrey};
    width: 67px;
    position: absolute;
  `,
  PercentageText: styled(ReText)<{
    isBold?: boolean;
  }>`
    letter-spacing: 0.3px;
    font-size: ${theme.fontSizes.fz16};
    color: ${theme.colors.lightBlack};
    font-weight: ${({ isBold }) =>
      isBold ? theme.fontWeight.fw700 : theme.fontWeight.fw400};
  `,
  PercentageSymbol: styled(CustomText).attrs({
    fz: "fz11",
    color: theme.colors.lightBlack,
  })<{
    isBold?: boolean;
  }>`
    margin-bottom: -3px;
    letter-spacing: 0.3px;
    font-weight: ${({ isBold }) =>
      isBold ? theme.fontWeight.fw700 : theme.fontWeight.fw400};
    ${!isIOS && "margin-left: -5px"};
  `,
  Separator: styled.View`
    width: 2px;
    height: 8px;
    background-color: ${theme.colors.white};
  `,
};
