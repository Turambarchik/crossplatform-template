import { useNavigation } from "@react-navigation/native";
import React from "react";
import type { reviewCategoryEnum } from "types";

import { Divider } from "components/atoms/divider/divider";
import { SVGIcon } from "components/atoms/icon/Icon";
import {
  requestCategoryConverter,
  requestCategoryTypeToIconConverter,
} from "helpers/converter";
import { Routes } from "modules/app/Routes";
import { useStoreActions } from "store/store";

import { CategoryItemStyles } from "./category-item.styles";

const { Text, Container, Wrapper, WrapperPadding } = CategoryItemStyles;

type CategoryItemProps = {
  type: reviewCategoryEnum;
  isLastItem: boolean;
  isFirstItem: boolean;
};

export const CategoryItem = ({
  type,
  isFirstItem,
  isLastItem,
}: CategoryItemProps) => {
  const navigation = useNavigation();
  const {
    requests: { setNewOrderCategory },
  } = useStoreActions((state) => state);

  const handleSetNewOrderCategory = () => {
    setNewOrderCategory(type);
    navigation.navigate(Routes.PickFilesAndAddText);
  };

  return (
    <Wrapper>
      <Container
        isFirstItem={isFirstItem}
        isLastItem={isLastItem}
        onPress={handleSetNewOrderCategory}
      >
        <SVGIcon type={requestCategoryTypeToIconConverter(type)} />
        <Text>{requestCategoryConverter(type)}</Text>
      </Container>
      {!isLastItem && (
        <WrapperPadding>
          <Divider marginHorizontal={16} />
        </WrapperPadding>
      )}
    </Wrapper>
  );
};
