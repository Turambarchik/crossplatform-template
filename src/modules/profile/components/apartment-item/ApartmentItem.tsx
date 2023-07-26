import { useNavigation } from "@react-navigation/native";
import { isNil } from "ramda";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SpacesType } from "types";

import { Divider } from "components/atoms/divider/divider";
import { SVGIcon } from "components/atoms/icon/Icon";
import { WhiteContainer } from "components/atoms/white-container/WhiteContainer";
import { ApartmentInfo } from "components/molecules/apartment-info/ApartmentInfo";
import { ApartmentType } from "components/molecules/apartment-type/ApartmentType";
import { Loader } from "components/molecules/loader/Loader";
import { localization } from "helpers/constants";
import { addressNameConverter, ApartmentsConverter } from "helpers/converter";
import { useStoreActions, useStoreState } from "store/store";

import { ApartmentItemStyles } from "./apartment-item.styles";

const { Text, Header, Footer, NofitSwitcher } = ApartmentItemStyles;

type ApartmentItemProps = {
  apartment: SpacesType;
};

export const ApartmentItem = ({ apartment }: ApartmentItemProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    profile: { userProfile },
  } = useStoreState((actions) => actions);
  const {
    profile: {
      createSpaceBlacklist,
      getApartmentDetails,
      deleteSpaceBlacklist,
      getUserProfile,
    },
  } = useStoreActions((state) => state);

  const handleNavigateToApartmentDetails = useCallback(() => {
    // COMING SOON: after MVP
    // if (equals(apartment["@type"], TypePremises.Apartment)) {
    //   setIsLoading(true);
    //   getApartmentDetails({ id: apartment.id })
    //     .then(() => {
    //       navigation.navigate(Routes.ApartmentDetails);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // }
  }, []);

  const toggleSpaceBlacklist = useCallback(
    (val: boolean) => {
      if (val && !isNil(apartment.inBlackList)) {
        const spaceBlacklistId = apartment.inBlackList.replace(
          "/api/space-blacklists/",
          ""
        );
        setIsLoading(true);
        deleteSpaceBlacklist({
          spaceBlacklistId,
        }).finally(() => {
          getUserProfile().finally(() => {
            setIsLoading(false);
          });
        });
      } else {
        if (!isNil(userProfile)) {
          setIsLoading(true);
          createSpaceBlacklist({
            userIri: userProfile["@id"],
            spaceIri: apartment["@id"],
          }).finally(() => {
            getUserProfile().finally(() => {
              setIsLoading(false);
            });
          });
        }
      }
    },
    [
      apartment,
      createSpaceBlacklist,
      deleteSpaceBlacklist,
      getUserProfile,
      userProfile,
    ]
  );

  return (
    <WhiteContainer onPress={handleNavigateToApartmentDetails}>
      <>
        <Header>
          <ApartmentType text={ApartmentsConverter(apartment["@type"])} />
          <ApartmentInfo account={apartment.account}>
            <SVGIcon type="arrowRight" />
          </ApartmentInfo>
        </Header>
        <Text marginTop={8}>
          {addressNameConverter(apartment.address, true)}
        </Text>
        <Divider marginVertical={16} />
        <Footer>
          <Text>{t(localization.profile.getNotifications)}</Text>
          <NofitSwitcher
            value={!apartment.inBlackList}
            onValueChange={toggleSpaceBlacklist}
          />
        </Footer>
        <Loader visible={isLoading} transparent />
      </>
    </WhiteContainer>
  );
};
