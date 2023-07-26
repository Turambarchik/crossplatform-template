import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { localization, UKR_PHONE_CODE } from "helpers/constants";

import { PhoneInputStyles } from "./phoneInput.styles";

interface PhoneInputProps {
  phoneValue: string;
  onSubmitEditing?: () => void;
  setIsError: (is: boolean) => void;
  setErrorMessage: (error: string) => void;
  onChangeText: (phone: string) => void;
}

const { Wrapper, PhoneText, PhoneTextInput } = PhoneInputStyles;

export const MAX_PHONE_LENGTH = 11;

export const PhoneInput = ({
  phoneValue,
  onChangeText,
  setErrorMessage,
  setIsError,
}: PhoneInputProps) => {
  const { t } = useTranslation();
  const [phoneToDisplay, setPhoneToDisplay] = useState("");

  useEffect(() => {
    setPhoneToDisplay(phoneValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPhoneNumber = (number: string) => {
    if (number.length <= 2) {
      return number;
    } else if (number.length <= 5) {
      return `${number.slice(0, 2)} ${number.slice(2)}`;
    } else if (number.length > 5) {
      return `${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
    } else {
      return `${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
    }
  };

  const handlePhoneNumer = (phone: string) => {
    phone = phone.split(" ").join("");
    onChangeText(phone);
    setPhoneToDisplay(phone);
  };

  const formattedPhoneNumber = formatPhoneNumber(phoneToDisplay);

  const handleBlurOnSubmit = useCallback(() => {
    const phoneWithCountry = `+380${phoneValue}`;
    if (
      isPossiblePhoneNumber(phoneWithCountry, "UA") &&
      isValidPhoneNumber(phoneWithCountry, "UA") &&
      !validatePhoneNumberLength(phoneWithCountry, "UA")
    ) {
      setIsError(false);
      setErrorMessage("");
    } else {
      setIsError(true);
      setErrorMessage(t(localization.errors.uncorrectNumber));
    }
  }, [phoneValue, setErrorMessage, setIsError, t]);

  return (
    <Wrapper>
      <PhoneText>{UKR_PHONE_CODE}</PhoneText>
      <PhoneTextInput
        onSubmitEditing={handleBlurOnSubmit}
        onChangeText={handlePhoneNumer}
        hitSlop={{ bottom: 50, top: 50, left: 50, right: 50 }}
        value={formattedPhoneNumber}
        maxLength={MAX_PHONE_LENGTH}
        keyboardType="phone-pad"
      />
    </Wrapper>
  );
};
