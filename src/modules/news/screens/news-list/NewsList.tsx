import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { concat, defaultTo } from "ramda";
import React, { useCallback } from "react";
import { RefreshControl } from "react-native";

import { EmptyScreen } from "components/molecules/empty-screen/EmptyScreen";
import { Loader } from "components/molecules/loader/Loader";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { useSpaceHeader } from "components/molecules/sticky-header/useSpaceHeader";
import { DEVICE_HEIGHT, localization } from "helpers/constants";
import { useCustomBackHandler } from "hooks/useBackhandler";
import { useCheckisUnLogged } from "hooks/useCheckisUnLogged";
import { NewsItem } from "modules/news/components/news-item/NewsItem";
import { NEWS_CARD_HEIGHT } from "modules/news/components/news-item/newsItem.styles";
import type { NewsType } from "modules/news/store/news.store.types";

import useNewsListScreenState from "./newsList.state";
import { NewsListStyles } from "./newsList.styles";

const { Wrapper, HeaderText, FlashListViewWrapper, Loading, LoadingWrapper } =
  NewsListStyles;

const NewsList = () => {
  const headerHeight = useHeaderHeight();
  useCustomBackHandler({});
  useCheckisUnLogged();
  useSpaceHeader({
    withDropdown: true,
    withLeft: true,
    withNotifs: true,
    isTransparent: true,
  });

  const {
    t,
    newsList,
    emergencyNewsList,
    handleLoadMoreLoading,
    isLoading,
    refreshing,
    isBiometricModal,
    biometricType,
    handleLoadMore,
    setIsBiometricModal,
    onRefresh,
    getIsEmergencyHeader,
    getIsNewsHeader,
    onMomentumScrollBegin,
  } = useNewsListScreenState();

  const renderNewsItem = useCallback(
    ({ item, index }: { item: NewsType; index: number }) => {
      const isEmergencyHeader = getIsEmergencyHeader(item, index);
      const isNewsHeader = getIsNewsHeader(item);

      return (
        <>
          {isEmergencyHeader && (
            <HeaderText marginTop={28}>
              {t(localization.news.emergencyNews)}
            </HeaderText>
          )}
          {isNewsHeader && (
            <HeaderText marginTop={28}>
              {t(localization.news.itWillbeIntresting)}
            </HeaderText>
          )}
          <NewsItem news={item} />
        </>
      );
    },
    [getIsEmergencyHeader, getIsNewsHeader, t]
  );

  return (
    <Wrapper>
      <FlashListViewWrapper>
        <FlashList
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            paddingTop: headerHeight,
            paddingBottom: 32,
          }}
          data={concat(
            defaultTo([], emergencyNewsList),
            defaultTo([], newsList)
          )}
          keyExtractor={(item, index) => item["@id"] + index.toString()}
          onEndReachedThreshold={0.3}
          estimatedItemSize={NEWS_CARD_HEIGHT + 20}
          renderItem={renderNewsItem}
          bounces
          onMomentumScrollBegin={onMomentumScrollBegin}
          onEndReached={handleLoadMore}
          ListEmptyComponent={
            <EmptyScreen
              iconType="noNews"
              text={t(localization.news.noNewsForCurrentAddress)}
              marginTop={DEVICE_HEIGHT / 4}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={headerHeight}
            />
          }
          ListFooterComponent={
            handleLoadMoreLoading ? (
              <LoadingWrapper>
                <Loading />
              </LoadingWrapper>
            ) : null
          }
        />
      </FlashListViewWrapper>
      <Loader visible={isLoading} transparent />
      <ModalSheet
        biometricType={biometricType}
        modalType={ModalSheetType.biometric}
        isOpen={isBiometricModal}
        setIsOpen={setIsBiometricModal}
      />
    </Wrapper>
  );
};

export default NewsList;
