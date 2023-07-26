import { and, concat, defaultTo, equals, isNil, not } from "ramda";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { defaultZero } from "helpers/functions";
import { usePrevious } from "hooks/usePrevious";
import type { NewsType } from "modules/news/store/news.store.types";
import { NewsStatus } from "modules/news/store/news.store.types";
import useBiometric from "services/useBiometric";
import { useStoreActions, useStoreState } from "store/store";

const useNewsListScreenState = () => {
  const { t } = useTranslation();
  const {
    news: { newsList, totalItems, page, emergencyNewsList },
    app: { currentSpace, isFirstEntry },
    common: { isNetworkError },
  } = useStoreState((state) => state);
  const {
    app: { setIsFirstEntry },
    news: { getNews, getEmergencyNews, setNewsList },
  } = useStoreActions((state) => state);
  const { checkBiometricIsAvailable, biometricType } = useBiometric();

  const stopHandleLoadMore = useRef<boolean>(false);
  const [isBiometricModal, setIsBiometricModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [handleLoadMoreLoading, setHandleLoadMoreLoading] =
    useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const prevSpaceId = usePrevious(currentSpace?.id);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([getNews({ page: 1 }), getEmergencyNews()])
      .then((res) => {
        setNewsList(res[0]);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [getEmergencyNews, getNews, setNewsList]);

  const handleGetAllNews = useCallback(() => {
    if (isLoading) return;
    if (!getNews && !getEmergencyNews) return;
    setIsLoading(true);

    Promise.all([getNews({ page: 1 }), getEmergencyNews()])
      .then((res) => {
        setNewsList(res[0]);
      })
      .finally(() => {
        setIsMounted(true);
        setIsLoading(false);
      });
  }, [isLoading, getNews, getEmergencyNews, setNewsList]);

  const handleLoadMore = async () => {
    if (!stopHandleLoadMore.current) {
      if (
        defaultZero(newsList?.length) < totalItems &&
        !handleLoadMoreLoading
      ) {
        setHandleLoadMoreLoading(true);
        const newsExtaData: NewsType[] = await getNews({
          page: page + 1,
        });
        setNewsList(concat(defaultTo([], newsList), newsExtaData));
        setHandleLoadMoreLoading(false);
      }
      stopHandleLoadMore.current = true;
    }
  };

  const setStopHandleLoadMore = useCallback((value: boolean) => {
    stopHandleLoadMore.current = value;
  }, []);

  const onMomentumScrollBegin = useCallback(
    () => setStopHandleLoadMore(false),
    [setStopHandleLoadMore]
  );

  const getIsEmergencyHeader = useCallback(
    (item: NewsType, index: number) =>
      equals(index, 0) && equals(item.type, NewsStatus.emergency),
    []
  );
  const getIsNewsHeader = useCallback(
    (item: NewsType) => {
      if (isNil(newsList)) return not(isNil(newsList));
      return and(
        not(equals(item.type, NewsStatus.emergency)),
        equals(item.id, newsList[0].id)
      );
    },
    [newsList]
  );

  useEffect(() => {
    if (!isFirstEntry || !isMounted) return;
    checkBiometricIsAvailable().then((isBiometricAvailable) => {
      setIsFirstEntry(false);

      if (isBiometricAvailable) {
        // setTimeout(() => {
        setIsBiometricModal(true);
        // }, 300);
      }
    });
  }, [checkBiometricIsAvailable, isFirstEntry, isMounted, setIsFirstEntry]);

  useEffect(() => {
    if (isNil(newsList) && isNil(emergencyNewsList)) {
      handleGetAllNews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGetAllNews, emergencyNewsList]);

  useEffect(() => {
    if (!!prevSpaceId && prevSpaceId !== currentSpace?.id) {
      handleGetAllNews();
    }
    // NOTE: set currentSpace to exhaustive-deps for hot reloading while change space
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSpace, prevSpaceId]);

  return {
    t,
    newsList,
    emergencyNewsList,
    refreshing,
    isLoading,
    isNetworkError,
    handleLoadMoreLoading,
    isBiometricModal,
    biometricType,
    isMounted,
    setIsBiometricModal,
    getIsEmergencyHeader,
    getIsNewsHeader,
    handleLoadMore,
    onMomentumScrollBegin,
    onRefresh,
  };
};

export default useNewsListScreenState;
