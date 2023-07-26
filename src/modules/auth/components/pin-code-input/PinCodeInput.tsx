import { and, equals, isNil } from "ramda";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from "react-native";

import { BACKSPACE } from "helpers/constants";
import { useShakeAniamtion } from "hooks/animations/useShake";

import { PinCodeInputStyles } from "./pinCodeInput.styles";

const { Wrapper, PinCodeInputStyled, Container } = PinCodeInputStyles;

const PIN_CODE_LENGTH = 4;

type PinCodeInputProps = {
  handlePinCodeSubmit: (pinCode: string) => void;
  isNeedToAuthorize?: boolean;
  isError?: boolean;
  setErrorMessage?: (val: string) => void;
  isMounted?: boolean;
};

export const PinCodeInput = ({
  handlePinCodeSubmit,
  isNeedToAuthorize,
  isMounted = true,
  setErrorMessage,
  isError,
}: PinCodeInputProps) => {
  const firstTextInputRef = useRef<TextInput>(null);
  const secondTextInputRef = useRef<TextInput>(null);
  const thirdTextInputRef = useRef<TextInput>(null);
  const fourthTextInputRef = useRef<TextInput>(null);

  const pinCodeInitial = Array(PIN_CODE_LENGTH).fill("");
  const [pinCode, setPinCode] = useState(pinCodeInitial);
  const { animatedStyles, shake } = useShakeAniamtion({});

  useEffect(() => {
    if (isError) {
      shake();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (isNeedToAuthorize) return;

    if (isMounted || isNil(isMounted)) {
      const timer = setTimeout(() => {
        firstTextInputRef.current && firstTextInputRef.current.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const handlePinCodeOnChange = (index: number) => (value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    setErrorMessage && setErrorMessage("");

    const pinCodeCopy = pinCode.concat();
    pinCodeCopy[index] = value;
    setPinCode(pinCodeCopy);

    // auto focus to next InputText if value is not blank
    if (!isNil(value)) {
      if (equals(index, 0) && secondTextInputRef.current) {
        secondTextInputRef.current.focus();
      } else if (equals(index, 1) && thirdTextInputRef.current) {
        thirdTextInputRef.current.focus();
      } else if (equals(index, 2) && fourthTextInputRef.current) {
        fourthTextInputRef.current.focus();
      }
    }
  };

  const handlePinCodeKeyPress = useCallback(
    (index: number) =>
      ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        setErrorMessage && setErrorMessage("");
        // auto focus to previous InputText if value is blank and existing value is also blank
        if (and(equals(nativeEvent.key, BACKSPACE), !pinCode[index])) {
          if (equals(index, 1) && firstTextInputRef.current) {
            firstTextInputRef.current.focus();
          } else if (equals(index, 2) && secondTextInputRef.current) {
            secondTextInputRef.current.focus();
          } else if (equals(index, 3) && thirdTextInputRef.current) {
            thirdTextInputRef.current.focus();
          }

          if (and(index > 0)) {
            const pinCodeCopy = pinCode.concat();
            pinCodeCopy[index - 1] = "";
            setPinCode(pinCodeCopy);
          }
        }
      },
    [pinCode, setErrorMessage]
  );

  const handleFocusOnFirstEmptyInput = () => () => {
    setErrorMessage && setErrorMessage("");
    const indexToFocus = pinCode.indexOf("");
    if (equals(indexToFocus, 0) && firstTextInputRef.current) {
      firstTextInputRef.current.focus();
    } else if (equals(indexToFocus, 1) && secondTextInputRef.current) {
      secondTextInputRef.current.focus();
    } else if (equals(indexToFocus, 2) && thirdTextInputRef.current) {
      thirdTextInputRef.current.focus();
    } else if (equals(indexToFocus, 3) && fourthTextInputRef.current) {
      fourthTextInputRef.current.focus();
    }
  };

  const onSubmit = useCallback(
    () =>
      new Promise<void>((resolve) => {
        if (pinCode.every((el) => el)) {
          const pinCodeString = pinCode.join("");
          return new Promise<void>((res) => {
            handlePinCodeSubmit(pinCodeString);
            res();
            resolve();
          });
        }
      }),
    [handlePinCodeSubmit, pinCode]
  );

  useEffect(() => {
    setTimeout(() => {
      onSubmit().then(() => {
        setPinCode(pinCodeInitial);
        firstTextInputRef.current && firstTextInputRef.current.focus();
      });
    }, 200);
  }, [onSubmit, pinCodeInitial]);

  return (
    <Wrapper style={animatedStyles}>
      {[
        firstTextInputRef,
        secondTextInputRef,
        thirdTextInputRef,
        fourthTextInputRef,
      ].map((textInputRef, index) => (
        <Container unFilled={!pinCode[index]} key={index} isDanger={isError}>
          <PinCodeInputStyled
            isDanger={isError}
            caretHidden
            value={pinCode[index]}
            keyboardType="numeric"
            autoComplete="off"
            maxLength={1}
            secureTextEntry
            ref={textInputRef}
            unFilled={!pinCode[index]}
            onKeyPress={handlePinCodeKeyPress(index)}
            onChangeText={handlePinCodeOnChange(index)}
            onFocus={handleFocusOnFirstEmptyInput()}
          />
        </Container>
      ))}
    </Wrapper>
  );
};
