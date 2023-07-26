import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { isNil } from "ramda";
import React, { useCallback } from "react";
import type { UserDetailsType } from "types";

import { Button } from "components/atoms/button/Button";
import { SVGIcon } from "components/atoms/icon/Icon";
import { Section } from "components/atoms/section/Section";
import { localization } from "helpers/constants";
import { addressNameConverter } from "helpers/converter";
import { ResidentItem } from "modules/profile/components/resitent-item/ResidentItem";

import useApartmentDetailsState from "./apartment.state";
import { ApartmentDetailsStyles } from "./apartmentDetails.styles";

const {
  Wrapper,
  Text,
  Footer,
  ButtonText,
  TitleText,
  SVGIconCopy,
  ScrollView,
  NofitSwitcher,
  InfoText,
  NotifContainer,
  FlashListViewWrapper,
} = ApartmentDetailsStyles;

const ApartmentDetails = () => {
  const headerHeight = useHeaderHeight();
  const { t, sortCitizens, apartmentDetails, handleCopyAccountMumber } =
    useApartmentDetailsState();

  const renderResidentItem = useCallback(
    ({ item, index }: { item: UserDetailsType; index: number }) => (
      <ResidentItem userDetails={item} index={index} />
    ),
    []
  );

  if (isNil(apartmentDetails)) return null;

  return (
    <Wrapper>
      <ScrollView headerHeight={headerHeight}>
        <Section marginTop={24}>
          <InfoText>{`${t(localization.profile.address)}:`}</InfoText>
          <Text marginTop={6}>
            {addressNameConverter(apartmentDetails.address, true)}
          </Text>
        </Section>
        <Section marginTop={16}>
          <InfoText>{t(localization.profile.personalAccount)}</InfoText>
          <Section row>
            <Text marginTop={6}>{apartmentDetails.account}</Text>
            <SVGIconCopy type="copy" onPress={handleCopyAccountMumber} />
          </Section>
        </Section>
        <NotifContainer>
          <Text>{t(localization.profile.getNotifications)}</Text>
          <NofitSwitcher />
        </NotifContainer>
        <Section row>
          <TitleText marginTop={24}>
            {t(localization.profile.residents)}
          </TitleText>
        </Section>

        <FlashListViewWrapper>
          <FlashList
            renderItem={renderResidentItem}
            keyExtractor={(item) => item["@id"]}
            showsVerticalScrollIndicator={false}
            data={sortCitizens}
            estimatedItemSize={142}
          />
        </FlashListViewWrapper>
      </ScrollView>
      <Footer>
        <Button variant="primary">
          <SVGIcon type="plus" color="white" />
          <ButtonText>{t(localization.profile.addResident)}</ButtonText>
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default ApartmentDetails;
