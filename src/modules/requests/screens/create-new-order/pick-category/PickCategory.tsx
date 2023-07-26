import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { equals } from "ramda";
import React, { useCallback } from "react";

import { localization } from "helpers/constants";
import { CategoryItem } from "modules/requests/components/category-item/CategoryItem";
import { CloseModal } from "modules/requests/components/close-modal/CloseModal";
import { reviewCategoryEnum } from "types";

import { CreateNewOrderStyles } from "../create-new-order.styles";
import { usePickCategory } from "./pick-category.state";

const {
  Wrapper,
  ScrollView,
  HeaderText,
  ContentWrapper,
  FlashListViewWrapper,
} = CreateNewOrderStyles;

export const PickCategory = () => {
  const { t } = usePickCategory();

  const headerHeight = useHeaderHeight();

  const renderCategoryItem = useCallback(
    ({ item, index }: { item: reviewCategoryEnum; index: number }) => (
      <CategoryItem
        type={item}
        isFirstItem={equals(index, 0)}
        isLastItem={equals(index, Object.keys(reviewCategoryEnum).length - 1)}
      />
    ),
    []
  );

  return (
    <Wrapper>
      <ScrollView headerHeight={headerHeight}>
        <ContentWrapper>
          <HeaderText>{t(localization.requests.pickCategory)}</HeaderText>
          <FlashListViewWrapper>
            <FlashList
              renderItem={renderCategoryItem}
              showsVerticalScrollIndicator={false}
              data={Object.keys(reviewCategoryEnum) as reviewCategoryEnum[]}
              estimatedItemSize={56}
            />
          </FlashListViewWrapper>
        </ContentWrapper>
      </ScrollView>
      <CloseModal />
    </Wrapper>
  );
};
