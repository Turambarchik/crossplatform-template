import axios from "axios";
import { action, thunk } from "easy-peasy";
import { and, defaultTo, equals, isEmpty, isNil } from "ramda";

import { filteredFromActionsModel } from "helpers/functions";
import type { StoreModel } from "store/store.types";
import { TransitionsEnum } from "types";

import type {
  ActiveRequest,
  GetRequestResponseDTO,
  RequestsModel,
  RequestsTypeDTO,
} from "./requests.store.types";

const MAX_LENGTH_ITEMS = 10;
const INITIAL_PAGE_NUMBER = 1;

const requestsModel: RequestsModel = {
  requestList: null,
  newOrder: {
    category: null,
    description: "",
    files: [],
    space: null,
  },
  setNewOrderCategory: action((state, payload) => {
    state.newOrder.category = payload;
  }),
  setNewOrderDescription: action((state, payload) => {
    state.newOrder.description = payload;
  }),
  setNewOrderSpace: action((state, payload) => {
    state.newOrder.space = payload;
  }),
  setNewOrderGallery: action((state, payload) => {
    state.newOrder.files = payload;
  }),
  setRequestList: action((state, payload) => {
    state.requestList = payload;
  }),
  setAciveRequest: action((state, payload) => {
    state.activeRequest = payload;
  }),
  resetNewRequest: action((state) => {
    state.newOrder = {
      category: null,
      description: "",
      files: [],
      space: null,
    };
  }),
  isOpenConfirmCloseModal: false,
  setIsOpenConfirmCloseModal: action((state, payload) => {
    state.isOpenConfirmCloseModal = payload;
  }),
  getRequests: thunk(async (actions, payload, { getState, getStoreState }) => {
    const modelState = getState();

    const storeState = getStoreState() as StoreModel;

    const currentSpaceId = storeState.app.currentSpace?.id;

    try {
      const { data } = await axios.get<GetRequestResponseDTO>(
        `orders?page=${payload.page}&itemsPerPage=${MAX_LENGTH_ITEMS}&order[createdAt]=desc&space=${currentSpaceId}`
      );

      if (and(!data?.["hydra:member"]?.length, !modelState.requestList)) {
        actions.setIsEmptyList(true);
      }
      actions.setPage(payload.page);

      actions.setTotalItems(defaultTo(15, data?.["hydra:totalItems"]));

      return defaultTo([], data?.["hydra:member"]);
    } catch (e) {
      actions.setIsEmptyList(true);
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getNotification");
    }
  }),
  getActiveRequest: thunk(async (actions, payload, _) => {
    try {
      const { data } = await axios.get<ActiveRequest>(`orders/${payload.id}`);

      const response = await axios.get<string[]>(
        `orders/${payload.id}/transit`
      );

      actions.setTransitionList(response.data);

      actions.setAciveRequest(data);
      return data;
    } catch (e) {
      actions.setAciveRequest(null);
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getNotification");
    }
  }),
  canceledActiveRequest: thunk(async (actions, payload, { getState }) => {
    try {
      const { data } = await axios.patch<ActiveRequest>(
        `orders/${payload.id}/transit`,
        { transition: TransitionsEnum.citizen_cancel },
        {
          headers: {
            "Content-Type": "application/merge-patch+json",
            accept: "application/ld+json",
          },
        }
      );

      const modelState = getState();

      actions.setAciveRequest(data);
      actions.setRequestList(
        defaultTo(
          [],
          modelState.requestList?.map((item) => {
            if (equals(item.id, data.id)) {
              return data as unknown as RequestsTypeDTO;
            } else {
              return item;
            }
          })
        )
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getNotification");
    }
  }),
  sendFeedback: thunk(async (actions, payload) => {
    try {
      axios.post("reviews", {
        rating: payload.rating,
        comment: payload.comment,
        order: payload.iriId,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getNotification");
    }
  }),
  createNewOrder: thunk(async (actions, payload, { getState }) => {
    try {
      const modelState = getState();
      if (isNil(modelState.newOrder)) return;

      if (!isEmpty(modelState.newOrder.files)) {
        const request = modelState.newOrder.files.map(async (el) => {
          const formData = new FormData();
          formData.append("file", {
            uri: el.uri,
            name: el.fileName || "image",
            type: el.type || "image/jpeg",
          } as unknown as Blob);
          formData.append("originalName", el.fileName || "image");
          const awaitRequest = await axios.post(
            "files/order/media/upload",
            formData,
            {
              headers: { "content-type": "multipart/form-data" },
            }
          );
          return awaitRequest;
        });

        const uri = await Promise.all(request).then((file) => {
          const getUri = file.map((el: any) => el?.data?.["@id"]);
          return getUri;
        });

        await axios.post(
          "orders",
          {
            category: modelState.newOrder.category,
            description: payload.descriptionText,
            space: modelState.newOrder.space?.["@id"],
            gallery: { files: uri },
          },
          { headers: { "content-type": "application/ld+json" } }
        );
      } else {
        await axios.post(
          "orders",
          {
            category: modelState.newOrder.category,
            description: payload.descriptionText,
            space: modelState.newOrder.space?.["@id"],
            gallery: [],
          },
          { headers: { "content-type": "application/ld+json" } }
        );
      }
    } catch (e) {
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
  setTransitionList: action((state, payload) => {
    state.transitionList = payload;
  }),
  activeRequest: null,
  transitionList: [],
  reset: action((state) => {
    const filteredRequestsModel = filteredFromActionsModel(requestsModel);
    Object.assign(state, filteredRequestsModel);
  }),
};

export default requestsModel;
