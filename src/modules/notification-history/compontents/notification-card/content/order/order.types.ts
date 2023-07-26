import type { StatusOrderType } from "types";

export type IOrder = {
  id: number;
  notificationId: string;
  time: string;
  type: StatusOrderType;
  isRead: boolean;
};
