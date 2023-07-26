import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RefreshControl } from "react-native";

import { Button } from "components/atoms/button/Button";
import { EmptyScreen } from "components/molecules/empty-screen/EmptyScreen";
import { Loader } from "components/molecules/loader/Loader";
import { DEVICE_HEIGHT, localization } from "helpers/constants";
import { Routes } from "modules/app/Routes";
import { RequestCard } from "modules/requests/components/request-card/RequestCard";

import { useRequests } from "./requestList.state";
import { RequestsStyles as Styles } from "./requestList.styles";

const {
  Wrapper,
  FlatListContainer,
  Loading,
  LoadingWrapper,
  Title,
  ButtonWrapper,
  ButtonText,
  Icon,
} = Styles;

const requests = localization.requests;

const RequestList = () => {
  const navigation = useNavigation();

  const headerHeight = useHeaderHeight();
  const {
    isLoading,
    isEmptyList,
    requestList,
    onRefresh,
    refreshing,
    onMomentumScrollBegin,
    handleLoadMoreLoading,
    handleLoadMore,
    t,
  } = useRequests();

  const navigateToNewOrder = () => {
    navigation.navigate(Routes.PickSpace);
  };

  return (
    <Wrapper>
      <FlatListContainer
        ListHeaderComponent={
          !isEmptyList ? <Title>{t(requests.requests)}</Title> : null
        }
        data={requestList}
        headerHeight={headerHeight}
        renderItem={({ item }) => <RequestCard {...item} />}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onEndReached={handleLoadMore}
        ListEmptyComponent={
          <EmptyScreen
            iconType="emptyRequests"
            text={t(requests.emptyScreen)}
            marginTop={DEVICE_HEIGHT / 4}
          />
        }
        estimatedItemSize={343}
        ListFooterComponent={
          handleLoadMoreLoading ? (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={headerHeight}
          />
        }
      />
      <ButtonWrapper>
        <Button variant="primary" fullWidth onPress={navigateToNewOrder}>
          <Icon type="plus" color="white" />
          <ButtonText>{t(requests.createNewRequest)}</ButtonText>
        </Button>
      </ButtonWrapper>
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default RequestList;
