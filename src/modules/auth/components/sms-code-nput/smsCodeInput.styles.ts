import type { InputProps } from "@twotalltotems/react-native-otp-input";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import styled from "styled-components";

export const SmsCodeInputStyles = {
  OTPInputViewWrapper: styled(OTPInputView).attrs<InputProps>(({ theme }) => ({
    codeInputFieldStyle: {
      width: 38,
      height: 42,
      borderWidth: 0,
      borderBottomWidth: 1,
      fontFamily: theme.fontWeight.fw700,
      fontSize: theme.fontSizes.fz14,
      color: theme.components.typography.secondaryColor,
      borderColor: theme.colors.neutral,
      backgroundColor: theme.colors.primaryBg,
    },
    codeInputHighlightStyle: {
      borderColor: theme.components.typography.primaryColor,
      backgroundColor: theme.colors.primaryBg,
    },
    selectionColor: theme.colors.primaryBg,
    placeholderTextColor: theme.colors.primaryBg,
  }))`
    height: 50px;
    margin: 0;
    padding-right: 5%;
    padding-left: 5%;
    color: ${({ theme }) => theme.colors.primaryBg};
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
};
