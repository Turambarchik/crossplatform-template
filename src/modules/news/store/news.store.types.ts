import type { Action, Thunk } from "easy-peasy";
import type { SpacesType } from "types";

export interface NewsModel {
  newsList: NewsType[] | null;
  setNewsList: Action<this, this["newsList"]>;
  page: number;
  setPage: Action<this, this["page"]>;
  totalItems: number;
  setTotalItems: Action<this, this["totalItems"]>;
  getNews: Thunk<this, { page: number }>;
  // emergency
  getEmergencyNews: Thunk<this>;
  emergencyNewsList: NewsType[] | null;
  setEmergencyNewsList: Action<this, this["emergencyNewsList"]>;
  // details
  newsDetails: NewsType | null;
  setNewsDetails: Action<this, this["newsDetails"]>;
  getNewsDetails: Thunk<this, { id: string }>;
  reset: Action<this>;
}

export enum NewsStatus {
  emergency = "emergency",
  planned = "message",
  newsCompany = "news",
}

export type galleryFileType = {
  ["@id"]: string;
  ["@type"]: string;
  id: string;
  name: string;
  originalName: string;
  context: string;
  mimeType: string;
  size: number;
  path: string;
  uri: string;
};

export type Area = {
  ["@id"]: string;
  ["@type"]: "Area";
  complex: string;
  complexName: string;
  floor: number;
  id: string;
  location: unknown;
  section: unknown;
  space: unknown;
  spaceType: unknown;
};

export type NewsType = {
  ["@id"]: string;
  ["@type"]: string;
  id: string;
  name: string;
  type: NewsStatus;
  description: string;
  areas: SpacesType[];
  draft: boolean;
  icon: NewsIcon;
  gallery: {
    ["@id"]: string;
    ["@type"]: string;
    files: Array<galleryFileType>;
  };
  createdAt: string;
};

export enum NewsIcon {
  icon_book = "Інші питання, база знань",
  icon_broom = "Прибирання",
  icon_electricity = "Електроенергія",
  icon_elevator = "Ліфт",
  icon_fan = "Вентиляція",
  icon_fire = "Протипожежна система",
  icon_hands = "Голосування, дімократія",
  icon_intercom = "Домофон та відео",
  icon_money = "Фінанси",
  icon_news = "Аварійна",
  icon_paw = "Вигул тваринок",
  icon_phone = "Телефон",
  icon_pipe = "Каналізація",
  icon_shape = "Тваринки",
  icon_shield = "Охорона",
  icon_shovel = "Ремонтні роботи",
  icon_sun = "Опалення",
  icon_support = "Клієнт-сервіс",
  icon_tap = "Водопостачання",
  icon_tree = "Прибудинкова",
}
