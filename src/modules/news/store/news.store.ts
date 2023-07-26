import axios from "axios";
import { action, thunk } from "easy-peasy";
import { defaultTo } from "ramda";
import type { GetResponseDTO } from "types";

import { filteredFromActionsModel } from "helpers/functions";
import type { StoreModel } from "store/store.types";

import type { NewsModel, NewsType } from "./news.store.types";

const MAX_LENGTH_NEWS = 10;
const INITIAL_PAGE_NUMBER = 1;

const newsModel: NewsModel = {
  newsList: null,
  setNewsList: action((state, payload) => {
    state.newsList = payload;
  }),
  page: 1,
  setPage: action((state, payload) => {
    state.page = payload;
  }),
  totalItems: 0,
  setTotalItems: action((state, payload) => {
    state.totalItems = payload;
  }),
  getNews: thunk(async (actions, payload, { getStoreState }) => {
    const storeState = getStoreState() as StoreModel;

    const currentSpaceId = storeState.app.currentSpace?.id;
    try {
      const { data } = await axios.get<GetResponseDTO<NewsType>>(
        `announces?page=${payload.page}&itemsPerPage=${MAX_LENGTH_NEWS}&order%5BcreatedAt%5D=desc&&type%5B%5D=news&type%5B%5D=message&forSpaceOnly=${currentSpaceId}`
      );
      actions.setPage(payload.page);
      actions.setTotalItems(defaultTo(15, data?.["hydra:totalItems"]));
      return defaultTo([], data?.["hydra:member"]);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getNews");
    }
  }),
  emergencyNewsList: null,
  setEmergencyNewsList: action((state, payload) => {
    state.emergencyNewsList = payload;
  }),
  getEmergencyNews: thunk(async (actions, payload, { getStoreState }) => {
    const storeState = getStoreState() as StoreModel;
    const currentSpaceId = storeState.app.currentSpace?.id;
    try {
      const { data } = await axios.get<GetResponseDTO<NewsType>>(
        `announces?page=${INITIAL_PAGE_NUMBER}&itemsPerPage=${MAX_LENGTH_NEWS}&order%5BcreatedAt%5D=desc&type=emergency&activated=true&forSpaceOnly=${currentSpaceId}`
      );
      let allEmergencyNews = [];

      const requestCallCount = Math.floor(
        Number(data?.["hydra:totalItems"] / MAX_LENGTH_NEWS)
      );

      allEmergencyNews = data?.["hydra:member"];

      for (let step = 0; step < requestCallCount; step++) {
        const { data: extraEmergency } = await axios.get<
          GetResponseDTO<NewsType>
        >(
          `announces?page=${
            step + 2
          }&itemsPerPage=${MAX_LENGTH_NEWS}&order%5BcreatedAt%5D=desc&type=emergency&activated=true&forSpaceOnly=${currentSpaceId}`
        );
        allEmergencyNews = allEmergencyNews.concat(
          extraEmergency?.["hydra:member"]
        );
      }
      actions.setEmergencyNewsList(allEmergencyNews);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getEmergencyNews");
    }
  }),
  newsDetails: null,
  setNewsDetails: action((state, payload) => {
    state.newsDetails = payload;
  }),
  getNewsDetails: thunk(async (actions, payload, helpers) => {
    try {
      const { data } = await axios.get(`announces/${payload.id}`);

      actions.setNewsDetails(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getNewsDetails");
    }
  }),
  reset: action((state) => {
    const filteredNewsModel = filteredFromActionsModel(newsModel);
    Object.assign(state, filteredNewsModel);
  }),
};

export default newsModel;
