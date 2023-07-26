import type { AppModel } from "modules/app/store/app.store.types";
import type { CommonModel } from "modules/app/store/common.store.types";
import type { AuthModel } from "modules/auth/store/auth.store.types";
import type { NewsModel } from "modules/news/store/news.store.types";
import type { NotificationModel } from "modules/notification-history/store/notification.store.types";
import type { ProfileModel } from "modules/profile/store/profile.store.types";
import type { RequestsModel } from "modules/requests/store/requests.store.types";

export interface StoreModel {
  app: AppModel;
  auth: AuthModel;
  common: CommonModel;
  profile: ProfileModel;
  news: NewsModel;
  notification: NotificationModel;
  requests: RequestsModel;
}

export enum APIErrorsResponse {
  invalid_grant = "invalid_grant",
  invalid_token = 401,
  inactivate_user = 403,
  citizenAlreadyExist = "Citizen already added to apartment",
  citizenInActivated = "ROLE_INACTIVATED_CITIZEN",
  networkError = "Network Error",
  abortingError = "canceled",
}

export enum errorMessageByServer {
  haveToWait = "You have to wait for a 5 minutes",
  userNotExist = "User doesn't exist.",
  invalidPhoneNumber = "You entered invalid phone number",
  invalidConfirmationCode = "You entered invalid confirmation code",
  alreadyActivateAccount = "User already complete",
  credentialIsIncorrect = "The user credentials were incorrect.",
  sitizenLogout = "Is Logged out",
  accessDenied = "Access Denied.",
  notCitizen = "Note a citizen",
  citizenInActivated = "Not a resident",
  biometricHadAlreadyActivated = "id: This value is already used.",
}
// DTO (data transfer object types) - type all API data reponses here

export type GetUserTokenResponseDTO = {
  access_token: string | null;
  refresh_token: string | null;
};
