import { FlashList } from "@shopify/flash-list";
import { equals, isNil } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import type { FileType } from "types";

import { Divider } from "components/atoms/divider/divider";
import { Spacer } from "components/atoms/spacer/Spacer";
import { localization } from "helpers/constants";

import { BuildersStyles as Styles } from "../../../builders.styles";

type BaseImagesListProps = {
  files: FileType[];
};

const { Box, TitleText } = Styles;

export const BaseImagesList = ({ files }: BaseImagesListProps) => {
  const { t } = useTranslation();

  if (isNil(files)) {
    return null;
  }

  return (
    <>
      <Box>
        <Divider />
      </Box>
      <Box marginTop={16}>
        <TitleText>{t(localization.requests.media_files)}:</TitleText>
        <Spacer height={16} />
        <ImageContainer>
          <FlatListContainer
            data={files}
            renderItem={({ item, index }) => (
              <ImageItem index={index}>
                <ImageSection
                  source={{
                    uri: item.uri,
                  }}
                />
              </ImageItem>
            )}
          />
        </ImageContainer>
        <Spacer height={16} />
      </Box>
    </>
  );
};

const ImageContainer = styled.View`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ImageSection = styled(FastImage).attrs(() => ({
  resizeMode: "cover",
}))`
  width: 108px;
  height: 110px;
  border-radius: 12px;
`;

const ImageItem = styled.View<{ index: number }>`
  margin-right: ${({ index }) => (equals((index + 1) % 3, 0) ? 0 : 10)}px;
  margin-bottom: 10px;
  flex: 1;
`;

const FlatListContainer = styled(FlashList<FileType>).attrs(() => ({
  showsVerticalScrollIndicator: false,
  estimatedItemSize: 101,
  numColumns: 3,
}))`
  flex: 1;
`;
