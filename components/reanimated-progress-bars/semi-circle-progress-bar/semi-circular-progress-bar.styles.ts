import { CustomText } from "components/text";
import { ReText } from "react-native-redash";
import styled from "styled-components/native";

import theme from "theme/theme";

export const SemiCircularProgressBarStyles = {
  Wrapper: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
  CircleContainer: styled.View<{ width: number; height: number }>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
  `,
  TextContainer: styled.View<{
    isBold?: boolean;
    top: number;
    right: number;
    bottom: number;
    left: number;
  }>`
    position: absolute;
    flex-direction: row;
    align-items: center;
    top: ${({ top }) => top};
    right: ${({ right }) => right};
    bottom: ${({ bottom }) => bottom};
    left: ${({ left }) => left};
  `,
  PercentageText: styled(ReText)<{
    isBold?: boolean;
  }>`
    position: absolute;
    letter-spacing: 0.3px;
    font-size: ${theme.fontSizes.fz16};
    color: ${theme.colors.lightBlack};
    font-weight: ${({ isBold }) =>
      isBold ? theme.fontWeight.fw700 : theme.fontWeight.fw400};
  `,
  PercentageSymbol: styled(CustomText).attrs({
    fz: "fz12",
    color: theme.colors.lightBlack,
  })<{
    isBold?: boolean;
    right: number;
    bottom: number;
  }>`
    position: absolute;
    letter-spacing: 0.3px;
    font-weight: ${({ isBold }) =>
      isBold ? theme.fontWeight.fw700 : theme.fontWeight.fw400};
    right: ${({ right }) => right};
    bottom: ${({ bottom }) => bottom};
  `,
};
