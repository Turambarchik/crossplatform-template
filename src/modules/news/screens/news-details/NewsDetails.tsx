import { useHeaderHeight } from "@react-navigation/elements";
import { format } from "date-fns";
import { isNil } from "ramda";
import React from "react";
import { useTheme } from "styled-components";

import Image from "components/atoms/image/Image";
import { Loader } from "components/molecules/loader/Loader";
import { RichText } from "components/molecules/rich-text/RichText";
import {
  newsChipColorConverter,
  newsChipTextConverter,
} from "helpers/converter";
import { useCustomBackHandler } from "hooks/useBackhandler";
import { useCheckisUnLogged } from "hooks/useCheckisUnLogged";

import useNewsDetailsScreenState from "./newsDetails.state";
import { NewsDetailsStyles } from "./newsDetails.styles";

const {
  Wrapper,
  Header,
  HeaderText,
  ScrollView,
  Chip,
  ChipText,
  InfoText,
  Line,
  Container,
} = NewsDetailsStyles;

const NewsDetails = () => {
  const headerHeight = useHeaderHeight();
  useCustomBackHandler({});
  useCheckisUnLogged();
  const theme = useTheme();
  const { newsDetails, newsImage, isLoading } = useNewsDetailsScreenState();

  if (isNil(newsDetails)) return null;

  return (
    <Wrapper>
      <ScrollView headerHeight={headerHeight}>
        <Line />
        <Container>
          <Header>
            <Chip color={newsChipColorConverter(newsDetails.type, theme)}>
              <ChipText>{newsChipTextConverter(newsDetails.type)}</ChipText>
            </Chip>
            <InfoText numberOfLines={1}>
              {format(new Date(newsDetails.createdAt), "dd.MM.yyyy")}
            </InfoText>
          </Header>
          {newsImage && (
            <Image
              source={{ uri: newsImage.uri }}
              width="100%"
              height={214}
              borderRadius={12}
              resizeMode="contain"
            />
          )}
          <HeaderText>{newsDetails.name}</HeaderText>
          <RichText
            value={newsDetails.description}
            fullLenght
            lineHeight={24}
            color="secondaryColor"
            fw="fw300"
            fz="fz14"
          />
        </Container>
      </ScrollView>
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default NewsDetails;
