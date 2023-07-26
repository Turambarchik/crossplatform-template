import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { checkServerErrorMessages } from "helpers/checkServerErrorMessages";

import { ErrorMessageStyles } from "./errorMessage.styles";

const { ErrorMessageText } = ErrorMessageStyles;

type ErrorMessageProps = {
  errorMessage: string;
  marginTop?: number;
  marginBottom?: number;
};

export const ErrorMessage = ({
  errorMessage,
  marginTop,
  marginBottom,
}: ErrorMessageProps) => {
  const { t } = useTranslation();

  const extractErrorMessage = useCallback(
    () => checkServerErrorMessages(errorMessage, t),
    [errorMessage, t]
  );
  return (
    <ErrorMessageText marginTop={marginTop} marginBottom={marginBottom}>
      {extractErrorMessage()}
    </ErrorMessageText>
  );
};
