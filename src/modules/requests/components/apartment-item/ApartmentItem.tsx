import { useNavigation } from "@react-navigation/native";
import React from "react";
import type { SpacesType } from "types";

import { WhiteContainer } from "components/atoms/white-container/WhiteContainer";
import { ApartmentInfo } from "components/molecules/apartment-info/ApartmentInfo";
import { ApartmentType } from "components/molecules/apartment-type/ApartmentType";
import { addressNameConverter, ApartmentsConverter } from "helpers/converter";
import { Routes } from "modules/app/Routes";
import { useStoreActions } from "store/store";

import { ApartmentItemStyles } from "./apartment-item.styles";

const { Text, Header } = ApartmentItemStyles;

type ApartmentItemProps = {
  apartment: SpacesType;
};

export const ApartmentItem = ({ apartment }: ApartmentItemProps) => {
  const {
    requests: { setNewOrderSpace },
  } = useStoreActions((state) => state);

  const navigation = useNavigation();

  const handleSetNewOrderSpace = () => {
    setNewOrderSpace(apartment);
    navigation.navigate(Routes.PickCategory);
  };

  return (
    <WhiteContainer onPress={handleSetNewOrderSpace}>
      <>
        <Header>
          <ApartmentType text={ApartmentsConverter(apartment["@type"])} />
          <ApartmentInfo account={apartment.account} />
        </Header>
        <Text marginTop={8}>
          {addressNameConverter(apartment.address, true)}
        </Text>
      </>
    </WhiteContainer>
  );
};
