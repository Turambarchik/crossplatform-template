import { and, defaultTo, equals, or } from "ramda";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { defaultZero } from "helpers/functions";
import type { NotificationDTO } from "modules/notification-history/store/notification.store.types";
import { useStoreActions, useStoreState } from "store/store";

export const useNotification = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [handleLoadMoreLoading, setHandleLoadMoreLoading] = useState(false);
  const stopHandleLoadMore = useRef(false);

  const { t } = useTranslation();

  const {
    notification: {
      isEmptyList,
      notificationList,
      page,
      totalItems,
      isLoading,
    },
    common: { isNetworkError },
  } = useStoreState((state) => state);
  const {
    notification: {
      getNotifications,
      setNotificationList,
      setIsLoading,
      getTotalItemsUnread,
    },
  } = useStoreActions((state) => state);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data: NotificationDTO[] = await getNotifications({ page: 1 });

      setNotificationList(data);
      await getTotalItemsUnread();
    } finally {
      setRefreshing(false);
    }
  }, [getNotifications, getTotalItemsUnread, setNotificationList]);

  const handleLoadMore = async () => {
    if (!stopHandleLoadMore.current) {
      if (
        defaultZero(notificationList?.length) < totalItems &&
        !handleLoadMoreLoading
      ) {
        setHandleLoadMoreLoading(true);
        const data: NotificationDTO[] = await getNotifications({
          page: page + 1,
        });
        setNotificationList([...defaultTo([], notificationList), ...data]);
        setHandleLoadMoreLoading(false);
      }
      stopHandleLoadMore.current = true;
    }
  };

  const handleGetNotification = useCallback(async () => {
    if (!notificationList) {
      setIsLoading(true);
      try {
        const data: NotificationDTO[] = await getNotifications({ page });

        setNotificationList(data);
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    getNotifications,
    notificationList,
    page,
    setIsLoading,
    setNotificationList,
  ]);

  const setStopHandleLoadMore = useCallback((value: boolean) => {
    stopHandleLoadMore.current = value;
  }, []);

  const onMomentumScrollBegin = useCallback(
    () => setStopHandleLoadMore(false),
    [setStopHandleLoadMore]
  );

  const getIsNotReadTextVisible = useCallback(
    (item: NotificationDTO, index: number) => and(equals(index, 0), !item.read),
    []
  );

  const getIsReadTextVisible = useCallback(
    (item: NotificationDTO, index: number) =>
      or(
        and(equals(index, 0), item.read),
        and(
          notificationList?.[index]?.read,
          equals(notificationList?.[index - 1]?.read, false)
        )
      ),
    [notificationList]
  );

  useEffect(() => {
    handleGetNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notificationList,
    refreshing,
    isLoading,
    isEmptyList,
    isNetworkError,
    onRefresh,
    handleLoadMore,
    onMomentumScrollBegin,
    handleLoadMoreLoading,
    getIsReadTextVisible,
    getIsNotReadTextVisible,
    t,
  };
};
