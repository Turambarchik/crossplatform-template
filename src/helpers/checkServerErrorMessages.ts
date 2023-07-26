import { isNil } from "ramda";

import { localization } from "helpers/constants";
import { errorMessageByServer } from "store/store.types";

export const checkServerErrorMessages = (
  errorMessage: string,
  t: (val: string) => string
) => {
  if (isNil(errorMessage)) {
    return " ";
  }
  if (errorMessage.includes(errorMessageByServer.invalidConfirmationCode)) {
    return t(localization.errors.checkConfirmationCode);
  }
  if (errorMessage.includes(errorMessageByServer.invalidPhoneNumber)) {
    return t(localization.errors.phoneIsNotValid);
  }
  if (errorMessage.includes(errorMessageByServer.haveToWait)) {
    return t(localization.errors.codeIsAlreadySend);
  }
  if (errorMessage.includes(errorMessageByServer.citizenInActivated)) {
    return `${t(localization.errors.citizenInActivated)} `;
  }
  if (errorMessage.includes(errorMessageByServer.alreadyActivateAccount)) {
    return t(localization.errors.alreadyActivateAccount);
  }
  if (errorMessage.includes(errorMessageByServer.credentialIsIncorrect)) {
    return t(localization.errors.wrongSignData);
  }
  if (errorMessage.includes(errorMessageByServer.userNotExist)) {
    return t(localization.errors.userNotExist);
  }
  if (errorMessage.includes(errorMessageByServer.accessDenied)) {
  }
  if (errorMessage.includes(errorMessageByServer.notCitizen)) {
    return t(localization.errors.citizenInActivated);
  }
  if (errorMessage.includes(errorMessageByServer.citizenInActivated)) {
    return t(localization.errors.notCitizen);
  }
  return errorMessage;
};
