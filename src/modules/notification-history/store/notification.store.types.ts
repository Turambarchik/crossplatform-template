import type { Action, Thunk } from "easy-peasy";
import type { GetResponseDTO, PaginationFlatListType } from "types";
import type { NotificationType, StatusOrderType } from "types";

export type OrderDTO = {
  ["@id"]: string;
  ["@type"]: string;
  addressData: string[];
  adminOrder: boolean;
  category: string;
  citizen: string;
  completedAt: Date;
  createdAt: Date;
  createdBy: string;
  deadline: Date;
  description: string;
  duplicates: string[];
  id: number;
  isChild: boolean;
  isGroup: boolean;
  responsible: string[];
  space: string[];
  status: StatusOrderType;
  type: string;
};

export type PayloadDTO = {
  objectCategory: string;
  objectId: number;
  objectStatus: StatusOrderType;
  transactionReason: string;
  transition: string[];
  type: StatusOrderType;
};

export type TranslationsDTO = {
  text: string;
  title: string;
};

export type NotificationDTO = {
  ["@id"]: string;
  ["@type"]: string;
  createdAt: Date;
  id: string;
  order: OrderDTO;
  payload: PayloadDTO;
  read: boolean;
  recipient: string;
  status: string;
  translations: TranslationsDTO;
  type: NotificationType;
};

export type GetNotificationResponseDTO = GetResponseDTO<NotificationDTO>;

export type GetNotificationUnreadCountResponseDTO = {
  count: number;
};

export interface NotificationModel extends PaginationFlatListType {
  notificationList: NotificationDTO[] | null;
  setNotificationList: Action<this, this["notificationList"]>;
  getNotifications: Thunk<this, { page: number }>;
  readNorification: Thunk<this, { id: string }>;
  totalItemsUnread: number;
  setTotalItemsUnread: Action<this, number>;
  getTotalItemsUnread: Thunk<this>;
  reset: Action<this>;
}
