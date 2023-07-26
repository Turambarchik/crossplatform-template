import { defaultTo } from "ramda";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSpaceHeader } from "components/molecules/sticky-header/useSpaceHeader";
import { defaultZero } from "helpers/functions";
import type { RequestsTypeDTO } from "modules/requests/store/requests.store.types";
import { useStoreActions, useStoreState } from "store/store";

export const useRequests = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [handleLoadMoreLoading, setHandleLoadMoreLoading] = useState(false);
  const stopHandleLoadMore = useRef(false);

  const { t } = useTranslation();

  useSpaceHeader({
    withDropdown: true,
    withLeft: true,
    withNotifs: true,
    isTransparent: true,
  });

  const {
    requests: { isEmptyList, requestList, page, totalItems, isLoading },
    app: { currentSpace },
    common: { isNetworkError },
  } = useStoreState((state) => state);
  const {
    requests: { getRequests, setRequestList, setIsLoading },
  } = useStoreActions((state) => state);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await getRequests({ page: 1 });
      setRequestList(data);
    } finally {
      setRefreshing(false);
    }
  }, [getRequests, setRequestList]);

  const handleLoadMore = async () => {
    if (!stopHandleLoadMore.current) {
      if (
        defaultZero(requestList?.length) < totalItems &&
        !handleLoadMoreLoading
      ) {
        setHandleLoadMoreLoading(true);
        const data: RequestsTypeDTO[] = await getRequests({
          page: page + 1,
        });
        setRequestList([...defaultTo([], requestList), ...data]);
        setHandleLoadMoreLoading(false);
      }
      stopHandleLoadMore.current = true;
    }
  };

  const handleGetRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getRequests({ page: 1 });
      setRequestList(data);
    } finally {
      setIsLoading(false);
    }
  }, [getRequests, setIsLoading, setRequestList]);

  const setStopHandleLoadMore = useCallback((value: boolean) => {
    stopHandleLoadMore.current = value;
  }, []);

  const onMomentumScrollBegin = useCallback(
    () => setStopHandleLoadMore(false),
    [setStopHandleLoadMore]
  );

  useEffect(() => {
    handleGetRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSpace]);

  return {
    requestList,
    refreshing,
    isLoading,
    isEmptyList,
    isNetworkError,
    onRefresh,
    handleGetRequests,
    handleLoadMore,
    onMomentumScrollBegin,
    handleLoadMoreLoading,
    t,
  };
};
