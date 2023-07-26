import axios from "axios";
import { action, thunk } from "easy-peasy";
import { and, assocPath, defaultTo, equals } from "ramda";

import { filteredFromActionsModel } from "helpers/functions";

import type {
  GetNotificationResponseDTO,
  GetNotificationUnreadCountResponseDTO,
  NotificationDTO,
  NotificationModel,
} from "./notification.store.types";

const MAX_LENGTH_ITEMS = 30;
const INITIAL_PAGE_NUMBER = 1;

const notificationModel: NotificationModel = {
  notificationList: null,
  totalItemsUnread: 0,
  setNotificationList: action((state, payload) => {
    state.notificationList = payload;
  }),
  setTotalItemsUnread: action((state, payload) => {
    state.totalItemsUnread = payload;
  }),
  getTotalItemsUnread: thunk(async (actions, _, __) => {
    try {
      const { data } = await axios.get<GetNotificationUnreadCountResponseDTO>(
        "notifications/unread-count"
      );

      actions.setTotalItemsUnread(data.count);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      } else {
        console.warn("Not Axios Error");
      }
    }
  }),
  readNorification: thunk(async (actions, payload, { getState }) => {
    try {
      actions.setIsLoading(true);
      await axios.patch(`notifications/read/${payload.id}`, {
        headers: { "content-type": "application/ld+json" },
      });

      const data = getState();

      actions.setNotificationList(
        defaultTo(
          null,
          data.notificationList
            ?.map((item) => {
              if (equals(item.id, payload.id)) {
                return assocPath(["read"], true, item);
              } else {
                return item;
              }
            })
            .sort((a, b) => Number(a.read) - Number(b.read))
        )
      );
      if (!equals(data.totalItemsUnread, 0)) {
        actions.setTotalItemsUnread(data.totalItemsUnread - 1);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
      } else {
        console.warn("Not Axios Error");
      }
    } finally {
      actions.setIsLoading(false);
    }
  }),
  getNotifications: thunk(async (actions, payload, { getState }) => {
    const modelState = getState();

    try {
      const { data } = await axios.get<GetNotificationResponseDTO>(
        `notifications?&order%5BcreatedAt%5D=desc&order[read]=desc&type=order&page=${payload.page}&itemsPerPage=${MAX_LENGTH_ITEMS}`
      );
      if (and(!data?.["hydra:member"]?.length, !modelState.notificationList)) {
        actions.setIsEmptyList(true);
      }
      actions.setPage(payload.page);
      actions.setTotalItems(defaultTo(15, data?.["hydra:totalItems"]));

      const arrayOfNotficiations: NotificationDTO[] = data?.["hydra:member"];
      const hasDuplicates = arrayOfNotficiations.some(
        (obj, index: number) =>
          arrayOfNotficiations.findIndex((item) => item.id === obj.id) !== index
      );
      if (hasDuplicates) {
        const uniqueArray = arrayOfNotficiations.filter(
          (obj, index: number, self) =>
            index === self.findIndex((item) => item.id === obj.id)
        );
        return defaultTo([], uniqueArray);
      } else {
        return defaultTo([], arrayOfNotficiations);
      }
    } catch (e) {
      actions.setIsEmptyList(true);
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getNotification");
    }
  }),
  isLoading: false,
  page: INITIAL_PAGE_NUMBER,
  totalItems: 0,
  isEmptyList: false,
  setPage: action((state, payload) => {
    state.page = payload;
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setTotalItems: action((state, payload) => {
    state.totalItems = payload;
  }),
  setIsEmptyList: action((state, payload) => {
    state.isEmptyList = payload;
  }),
  reset: action((state) => {
    const filteredNotificationModel =
      filteredFromActionsModel(notificationModel);
    Object.assign(state, filteredNotificationModel);
  }),
};

export default notificationModel;
