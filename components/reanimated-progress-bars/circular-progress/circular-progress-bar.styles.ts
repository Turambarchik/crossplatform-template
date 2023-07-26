import { ReText } from "react-native-redash";
import styled from "styled-components/native";

import { CustomText } from "components/text";
import { isIOS } from "helpers/constants";
import theme from "theme/theme";

export const CircularProgressBarStyles = {
  GraphWrapper: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    position: relative;
  `,
  CircleContainer: styled.View<{ width: number; height: number }>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    justify-content: center;
    align-items: center;
  `,
  TextContainer: styled.View`
    position: absolute;
    flex-direction: row;
    align-items: center;
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
    fz: "fz12",
    color: theme.colors.lightBlack,
  })<{
    isBold?: boolean;
  }>`
    margin-bottom: -2px;
    letter-spacing: 0.3px;
    font-weight: ${({ isBold }) =>
      isBold ? theme.fontWeight.fw700 : theme.fontWeight.fw400};
    ${!isIOS && " margin-left: -5px"};
  `,
};
