import styled from "styled-components/native";

export const MultilineInputStyles = {
  Wrapper: styled.View`
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.neutral};
    flex-direction: row;
    justify-content: space-between;
  `,
  TextInput: styled.TextInput.attrs({})<{ maxHeight: number }>`
    min-height: 40px;
    width: 90%;
    max-height: ${({ maxHeight }) => maxHeight}px;
    font-size: ${({ theme }) => theme.fontSizes.fz14}px;
    font-family: ${({ theme }) => theme.fontWeight.fw400};
    color: ${({ theme }) => theme.components.typography.primaryColor};
    line-height: 24px;
    padding-bottom: 8px;
  `,
  RightContainer: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  `,
};
