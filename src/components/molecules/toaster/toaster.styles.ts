import type { Position } from "react-native-flash-message";
import styled from "styled-components/native";

export const ToasterStyles = {
  Container: styled.Pressable<{
    isSuccess: boolean;
    positionDirection: Position;
  }>`
    flex-direction: row;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-horizontal: 16px
      ${({ positionDirection }) =>
        positionDirection === "top" && "margin-top: 40px;"};
    ${({ positionDirection }) =>
      positionDirection === "bottom" && "  margin-bottom: 30px;"};
    padding: 14px;
    background-color: ${({ theme, isSuccess }) =>
      isSuccess ? theme.colors.green : theme.colors.dangerColor};
  `,
  IconSection: styled.View`
    width: 50px;
    align-items: center;
    justify-content: center;
  `,
  ContentSection: styled.View`
    width: 85%;
    height: 100%;
    justify-content: center;
  `,
};
