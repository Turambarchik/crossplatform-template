import { TextInput } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const ReaniamtedView = Animated.View;

export const PinCodeInputStyles = {
  Wrapper: styled(ReaniamtedView)`
    flex-direction: row;
  `,
  Container: styled.View<{
    unFilled: boolean;
    isDanger?: boolean;
  }>`
    width: 16px;
    height: 16px;
    margin-left: 12px;
    margin-right: 12px;
    border-radius: 100;
    background-color: ${({ theme, unFilled, isDanger }) =>
      isDanger
        ? theme.colors.dangerColor
        : unFilled
        ? theme.colors.neutral2
        : theme.components.typography.secondaryColor};
  `,
  PinCodeInputStyled: styled(TextInput)<{
    unFilled: boolean;
    isDanger?: boolean;
  }>`
    position: absolute;
    width: auto;
    height: 100%;
    color: ${({ theme, unFilled, isDanger }) =>
      isDanger
        ? theme.colors.dangerColor
        : unFilled
        ? theme.colors.neutral2
        : theme.components.typography.secondaryColor};
  `,
};
