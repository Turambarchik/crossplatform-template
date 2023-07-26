import type { UserDetailsType } from "types";

export enum Routes {
  // AUTH
  Auth = "Auth",
  VerifySmsCode = "VerifySmsCode",
  LogIn = "LogIn",
  CreatePinCode = "CreatePinCode",
  VerifyPinCode = "VerifyPinCode",
  // Private
  TabBar = "TabBar",
  Onboarding = "Onboarding",
  // News
  NewsList = "NewsList",
  NewsDetails = "NewsDetails",
  // Services
  Services = "Services",
  // Profile
  ProfileInfo = "ProfileInfo",
  ApartmentDetails = "ApartmentDetails",
  ResidentDetails = "ResidentDetails",
  // Notification
  Notification = "Notification",
  // Requests
  Requests = "Requests",
  ActiveRequest = "ActiveRequest",
  ActiveRequestDetails = "ActiveRequestDetails",
  PickSpace = "PickSpace",
  PickCategory = "PickCategory",
  PickFilesAndAddText = "PickFilesAndAddText",
}

export type RootStackParams = {
  // AUTH
  [Routes.LogIn]: {
    pushNotifItemId?: string;
    pushItemType?: string;
    notificationId?: string;
  };
  [Routes.Auth]: undefined;
  [Routes.VerifySmsCode]: { phone: string };
  [Routes.CreatePinCode]: { smsCode: string; phone: string };
  [Routes.VerifyPinCode]: { smsCode: string; phone: string; pinCode: string };
  // Private
  [Routes.Onboarding]: undefined;
  // Requests
  [Routes.Requests]: undefined;
  [Routes.ActiveRequestDetails]: undefined;
  [Routes.ActiveRequest]: {
    id: number;
    openedFromPush?: boolean;
    notificationId?: string;
  };
  [Routes.PickSpace]: undefined;
  [Routes.PickCategory]: undefined;

  [Routes.TabBar]: undefined;
  // News
  [Routes.NewsList]: undefined;
  [Routes.NewsDetails]: { id: string; openedFromPush?: boolean };
  // Services
  [Routes.Services]: undefined;
  // Profile
  [Routes.ProfileInfo]: undefined;
  [Routes.ApartmentDetails]: undefined;
  [Routes.PickFilesAndAddText]: undefined;
  [Routes.ResidentDetails]: { userDetails: UserDetailsType };
  // Notification
  [Routes.Notification]: undefined;
};
