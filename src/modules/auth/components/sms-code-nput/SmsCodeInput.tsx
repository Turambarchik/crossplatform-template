import React, { useEffect, useRef } from "react";

import { SmsCodeInputStyles } from "./smsCodeInput.styles";

export const KEY_CODE_LENGTH = 6;

const { OTPInputViewWrapper } = SmsCodeInputStyles;

type SmsCodeInputProps = {
  onChangeSmsCode: (keyCode: string) => void;
  smsCodeValue: string;
};

export const SmsCodeInput = ({
  onChangeSmsCode,
  smsCodeValue,
  ...props
}: SmsCodeInputProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstTextInputRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstTextInputRef.current) {
        firstTextInputRef.current.focusField(0);
      }
    }, 300);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OTPInputViewWrapper
      ref={firstTextInputRef}
      pinCount={KEY_CODE_LENGTH}
      code={smsCodeValue}
      autoFocusOnLoad={false}
      onCodeChanged={onChangeSmsCode}
      {...props}
    />
  );
};
