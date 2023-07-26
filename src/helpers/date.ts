import { differenceInDays, format } from "date-fns";
import { equals, isNil } from "ramda";

export const DATE_FORMATS = {
  draw: "EEE do MMM",
  drawTime: "h:mm bbb",
  dateWithYear: "dd.MM.yyyy",
  purchaseDetailsGeneral: "dd/MM/yyyy HH:mm",
  purchaseDetailsInfoDate: "d MMMM yyyy",
  purchaseDetailsInfoTime: "hh:mm aaa",
};

export const getNotificationDate = (date: Date) => {
  if (!isNil(date)) {
    if (equals(differenceInDays(new Date(), new Date(date)), 0)) {
      return format(new Date(date), DATE_FORMATS.drawTime);
    } else {
      return format(new Date(date), DATE_FORMATS.dateWithYear);
    }
  }
  return "";
};

export const getFullDate = (date: Date) => {
  if (!isNil(date)) {
    return format(new Date(date), DATE_FORMATS.dateWithYear);
  }
  return "";
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { differenceInYears, format } from "date-fns";
import { format as formatTZ, utcToZonedTime } from "date-fns-tz";
import moment from "moment-timezone";
import { isNil } from "ramda";

import { isString } from "./type-guards";

export const DATE_FORMATS = {
  draw: "EEE do MMM",
  drawTime: "h:mm bbb",
  dateOfBirth: "dd/MM/yyyy",
  purchases: "yyyy, MMM dd",
  purchaseDetailsGeneral: "dd/MM/yyyy HH:mm",
  purchaseDetailsInfoDate: "d MMMM yyyy",
  purchaseDetailsInfoTime: "hh:mm aaa",
};

export const nth = function (number: number) {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getDrawTime = (date: Date) =>
  formatTZ(new Date(date), DATE_FORMATS.draw);

export const getPlayerAge = (date: Date) => {
  if (!isNil(date)) {
    return differenceInYears(new Date(), new Date(date));
  }
  return "";
};

export const getPlayerDate = (date: Date) => {
  if (!isNil(date)) {
    return date
      ? format(new Date(date), DATE_FORMATS.purchaseDetailsInfoDate)
      : "-";
  }
  return "";
};

export const getTimeForTimeZone = (
  date: Date,
  timeZone: string | undefined = "Australia/Sydney"
) => {
  if (!isNil(date)) {
    return formatTZ(utcToZonedTime(date, timeZone), DATE_FORMATS.drawTime);
  }
  return "";
};

export const getTimeForTimeZoneWithoutFormat = (
  date: Date,
  timeZone: string | undefined = "Australia/Sydney"
) => {
  if (!isNil(date)) {
    return formatTZ(utcToZonedTime(date, timeZone), DATE_FORMATS.drawTime);
  }
  return "";
};

export const getTimeAgo = (date: string | Date) => {
  if (!isNil(date)) {
    moment.tz.setDefault("Australia/Sydney");
    if (isString(date)) {
      return moment(date, "YYYY-MM-DD h:mm:ss").fromNow();
    } else {
      return moment(date).fromNow();
    }
  }
  return "not specified";
};
