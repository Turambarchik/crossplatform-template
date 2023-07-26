import React, { useCallback } from "react";

import { EmptyScreen } from "components/molecules/empty-screen/EmptyScreen";
import { Loader } from "components/molecules/loader/Loader";
import { DEVICE_HEIGHT, localization } from "helpers/constants";
import type { NotificationCardType } from "modules/notification-history/compontents/notification-card/notification-card.type";
import { NotificationCard } from "modules/notification-history/compontents/notification-card/NotificationCard";

import { useNotification } from "./notification.state";
import { NotificationStyles as Styles } from "./notification.style";

const { Wrapper, FlatListContainer, Loading, LoadingWrapper, Text } = Styles;

const notif = localization.notification;

const Notification = () => {
  const {
    isLoading,
    isEmptyList,
    notificationList,
    onRefresh,
    refreshing,
    onMomentumScrollBegin,
    handleLoadMoreLoading,
    handleLoadMore,
    getIsReadTextVisible,
    getIsNotReadTextVisible,
    t,
  } = useNotification();

  const renderNotifacationItem = useCallback(
    ({ item, index }: { item: NotificationCardType; index: number }) => {
      const isReadTextVisible = getIsReadTextVisible(item, index);
      const isNotReadTextVisible = getIsNotReadTextVisible(item, index);
      return (
        <>
          {isNotReadTextVisible && <Text>{t(notif.read)}</Text>}
          {isReadTextVisible && <Text>{t(notif.unread)}</Text>}
          <NotificationCard {...item} />
        </>
      );
    },
    [getIsNotReadTextVisible, getIsReadTextVisible, t]
  );

  return (
    <Wrapper>
      {isEmptyList && (
        <EmptyScreen
          iconType="noNotification"
          text={t(notif["no-notification"])}
          marginTop={DEVICE_HEIGHT / 4}
        />
      )}
      <Loader visible={isLoading} transparent />
      <FlatListContainer
        data={notificationList}
        onRefresh={onRefresh}
        refreshing={refreshing}
        estimatedItemSize={104}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        renderItem={renderNotifacationItem}
        onMomentumScrollBegin={onMomentumScrollBegin}
        ListFooterComponent={
          handleLoadMoreLoading ? (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          ) : null
        }
      />
    </Wrapper>
  );
};

export default Notification;
