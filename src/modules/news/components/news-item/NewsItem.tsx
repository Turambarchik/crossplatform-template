import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useCallback } from "react";

import Image from "components/atoms/image/Image";
import { newsChipTextConverter } from "helpers/converter";
import { IMAGES, NEWS_IMAGE_LIST } from "helpers/images";
import { Routes } from "modules/app/Routes";
import type { NewsType } from "modules/news/store/news.store.types";
import { NewsStatus } from "modules/news/store/news.store.types";

import { NewsItemStyles } from "./newsItem.styles";

const { Text, Container, Content, Footer, InfoText, ContainerTouchable } =
  NewsItemStyles;

type NewsItemProps = {
  news: NewsType;
};

export const NewsItem = ({ news }: NewsItemProps) => {
  const navigation = useNavigation();

  const isEmergency = news.type === NewsStatus.emergency;

  const handleNavigateToNewsDetails = useCallback(() => {
    navigation.navigate(Routes.NewsDetails, { id: news.id });
  }, [navigation, news.id]);

  return (
    <Container>
      <ContainerTouchable onPress={handleNavigateToNewsDetails}>
        <Image
          source={
            isEmergency ? IMAGES.emergencyIcon : NEWS_IMAGE_LIST[news.icon]
          }
          borderRadiusLeft={8}
          width={85}
        />
        <Content>
          <Text numberOfLines={2}>{news.name}</Text>
          <Footer>
            {!isEmergency && (
              <InfoText numberOfLines={1}>
                {newsChipTextConverter(news.type)}
              </InfoText>
            )}
            <InfoText numberOfLines={1}>
              {format(new Date(news.createdAt), "dd.MM.yyyy")}
            </InfoText>
          </Footer>
        </Content>
      </ContainerTouchable>
    </Container>
  );
};
