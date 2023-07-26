import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback } from "react";
import type { SpacesType } from "types";

import { localization } from "helpers/constants";
import { ApartmentItem } from "modules/requests/components/apartment-item/ApartmentItem";
import { CloseModal } from "modules/requests/components/close-modal/CloseModal";

import { CreateNewOrderStyles } from "../create-new-order.styles";
import { usePickSpace } from "./pick-space.state";

const {
  Wrapper,
  ScrollView,
  HeaderText,
  ContentWrapper,
  FlashListViewWrapper,
} = CreateNewOrderStyles;

export const PickSpace = () => {
  const { t, mySpaces } = usePickSpace();

  const headerHeight = useHeaderHeight();

  const renderAppartmentItem = useCallback(
    ({ item }: { item: SpacesType }) => <ApartmentItem apartment={item} />,
    []
  );

  return (
    <Wrapper>
      <ScrollView headerHeight={headerHeight}>
        <ContentWrapper>
          <HeaderText>{t(localization.requests.pickSpace)}</HeaderText>
          <FlashListViewWrapper>
            <FlashList
              renderItem={renderAppartmentItem}
              keyExtractor={(item) => item["@id"]}
              showsVerticalScrollIndicator={false}
              data={mySpaces}
              estimatedItemSize={168}
            />
          </FlashListViewWrapper>
        </ContentWrapper>
      </ScrollView>
      <CloseModal />
    </Wrapper>
  );
};
