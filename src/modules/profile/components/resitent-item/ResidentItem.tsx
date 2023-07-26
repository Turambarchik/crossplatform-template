import { useNavigation } from "@react-navigation/native";
import { equals } from "ramda";
import React from "react";
import type { UserDetailsType } from "types";

import { Section } from "components/atoms/section/Section";
import { Routes } from "modules/app/Routes";

import { ResidentItemStyles } from "./residentItem.styles";

const {
  Text,
  Container,
  ContainerTouchable,
  Header,
  SVGIconPhone,
  Line,
  InfoText,
  Chip,
  ChipText,
} = ResidentItemStyles;

type ResidentItemProps = {
  userDetails: UserDetailsType;
  index: number;
};

export const ResidentItem = ({ userDetails, index }: ResidentItemProps) => {
  const navigation = useNavigation();
  const navigateToResidentDetails = () => {
    navigation.navigate(Routes.ResidentDetails, { userDetails });
  };

  return (
    <Container isFirst={equals(index, 0)}>
      <ContainerTouchable onPress={navigateToResidentDetails}>
        <Header>
          <Chip>
            <ChipText numberOfLines={3}>{userDetails["@type"]}</ChipText>
          </Chip>
        </Header>
        <Text marginTop={6}>{userDetails.name}</Text>
        <Line />
        <Section row centerVertical>
          <SVGIconPhone type="phone" />
          <InfoText numberOfLines={3}>{userDetails.phone}</InfoText>
        </Section>
      </ContainerTouchable>
    </Container>
  );
};
