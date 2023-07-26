import i18n from "i18next";
import type { BiometryType } from "react-native-biometrics";
import { BiometryTypes } from "react-native-biometrics";
import type { Theme } from "styled-components";

import type { TIconNames } from "components/atoms/icon/Icon";
import { localization } from "helpers/constants";
import { NewsStatus } from "modules/news/store/news.store.types";
import type { AddressType } from "types/index";
import { ApartmentEnum } from "types/index";
import { reviewCategoryEnum, StatusOrderType } from "types/index";

export const newsChipColorConverter = (
  value: NewsStatus,
  theme: Theme
): string => {
  switch (value) {
    case NewsStatus.planned:
      return theme.components.chip.new;

    case NewsStatus.emergency:
      return theme.components.chip.canceled;

    case NewsStatus.newsCompany:
      return theme.components.chip.consideration;

    default:
      return theme.components.chip.new;
  }
};

export const newsChipTextConverter = (value: NewsStatus): string => {
  switch (value) {
    case NewsStatus.planned:
      return localization.news.plannedWorks;

    case NewsStatus.emergency:
      return localization.news.emergencyAnnouncement;

    case NewsStatus.newsCompany:
      return localization.general.appName;

    default:
      return localization.general.appName;
  }
};

export const statusConverter = (
  value: StatusOrderType | boolean,
  theme: Theme
): string => {
  switch (value) {
    case StatusOrderType.new:
      return theme.components.chip.new;

    case StatusOrderType.in_progress:
      return theme.components.chip.in_progress;

    case StatusOrderType.completed:
      return theme.components.chip.complete;

    case StatusOrderType.canceled:
      return theme.components.chip.canceled;

    case StatusOrderType.consideration:
      return theme.components.chip.consideration;

    default:
      return theme.components.chip.new;
  }
};

export const requestCategoryConverter = (
  categoryType: reviewCategoryEnum
): string => {
  switch (categoryType) {
    case reviewCategoryEnum.cleaning:
      return i18n.t(localization.requests.cleaning);

    case reviewCategoryEnum.water_supply:
      return i18n.t(localization.requests.water_supply);

    case reviewCategoryEnum.elevator:
      return i18n.t(localization.requests.elevator);

    case reviewCategoryEnum.heating:
      return i18n.t(localization.requests.heating);

    case reviewCategoryEnum.fire_protection_system:
      return i18n.t(localization.requests.fire_protection_system);

    case reviewCategoryEnum.ventilation:
      return i18n.t(localization.requests.ventilation);

    case reviewCategoryEnum.sewerage:
      return i18n.t(localization.requests.sewerage);

    case reviewCategoryEnum.electricity:
      return i18n.t(localization.requests.electricity);

    case reviewCategoryEnum.repairs:
      return i18n.t(localization.requests.repairs);

    case reviewCategoryEnum.intercom_and_video:
      return i18n.t(localization.requests.intercom_and_video);

    case reviewCategoryEnum.adjacent_territory:
      return i18n.t(localization.requests.adjacent_territory);

    case reviewCategoryEnum.protection:
      return i18n.t(localization.requests.protection);

    case reviewCategoryEnum.client_service:
      return i18n.t(localization.requests.client_service);

    case reviewCategoryEnum.financial_issues:
      return i18n.t(localization.requests.financial_issues);

    case reviewCategoryEnum.other:
      return i18n.t(localization.requests.other);

    default:
      return "";
  }
};

export const requestCategoryTypeToIconConverter = (
  categoryType: reviewCategoryEnum
): TIconNames => {
  switch (categoryType) {
    case reviewCategoryEnum.cleaning:
      return "cleaning";

    case reviewCategoryEnum.water_supply:
      return "waterSupply";

    case reviewCategoryEnum.elevator:
      return "elevator";

    case reviewCategoryEnum.heating:
      return "heating";

    case reviewCategoryEnum.fire_protection_system:
      return "fireProtectionSystem";

    case reviewCategoryEnum.ventilation:
      return "ventilation";

    case reviewCategoryEnum.sewerage:
      return "sewerage";

    case reviewCategoryEnum.electricity:
      return "electricity";

    case reviewCategoryEnum.repairs:
      return "repairs";

    case reviewCategoryEnum.intercom_and_video:
      return "intercomAndVideo";

    case reviewCategoryEnum.adjacent_territory:
      return "adjacentTerritory";

    case reviewCategoryEnum.protection:
      return "protection";

    case reviewCategoryEnum.financial_issues:
      return "financialIssues";

    case reviewCategoryEnum.client_service:
      return "clientService";

    case reviewCategoryEnum.other:
      return "other";

    default:
      return "other";
  }
};

export const ApartmentsConverter = (apartmentType: ApartmentEnum): string => {
  switch (apartmentType) {
    case ApartmentEnum.Apartment:
      return i18n.t(localization.profile.apartment);

    default:
      return "";
  }
};

export const addressNameConverter = (
  spaceAddress: AddressType,
  isFull = false
) =>
  isFull
    ? `${spaceAddress.complex}, ${spaceAddress.street}, ${
        spaceAddress.house
      }, ${spaceAddress.section}, пов. ${String(
        spaceAddress.floor
      )},  кв. ${String(spaceAddress.apartment)}`
    : `${spaceAddress.complex}, кв. ${spaceAddress.apartment}`;

export const phoneNumber = (number: string) =>
  `${number.slice(0, 4)} ${number.slice(4, 6)} ${number.slice(
    6,
    9
  )} ${number.slice(9)}`;

export const allowBiometricTextConverter = (value?: BiometryType): string => {
  switch (value) {
    case BiometryTypes.FaceID:
      return localization.auth.allowEnterWithFaceId;

    case BiometryTypes.TouchID:
      return localization.auth.allowEnterWithTouchId;

    case BiometryTypes.Biometrics:
      return localization.auth.allowEnterWithTouchId;

    default:
      return localization.auth.allowEnterWithBiometric;
  }
};

export const biometricTextConverter = (value?: BiometryType): string => {
  switch (value) {
    case BiometryTypes.FaceID:
      return localization.profile.faceIdEnter;

    case BiometryTypes.TouchID:
      return localization.profile.touchIdEnter;

    case BiometryTypes.Biometrics:
      return localization.profile.biometricEnter;

    default:
      return localization.profile.biometricEnter;
  }
};
