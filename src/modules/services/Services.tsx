import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";

import { SVGIcon } from "components/atoms/icon/Icon";
import { useSpaceHeader } from "components/molecules/sticky-header/useSpaceHeader";
import { localization } from "helpers/constants";

import { ServicesContainer } from "./components/service-container/ServiceContainer";
import useServicesState from "./services.state";
import { ServicesStyles } from "./services.styles";

const { Wrapper, HeaderText, ScrollView, ContentWrapper, Text, PrimaryText } =
  ServicesStyles;

const Services = () => {
  const headerHeight = useHeaderHeight();
  const { t, openSupportPhone } = useServicesState();

  useSpaceHeader({
    withDropdown: true,
    withLeft: true,
    withNotifs: true,
    isTransparent: true,
  });

  return (
    <Wrapper>
      <ScrollView headerHeight={headerHeight}>
        <HeaderText>{t(localization.general.services)}</HeaderText>
        <ContentWrapper>
          <ServicesContainer onPress={openSupportPhone}>
            <SVGIcon type="call" color="green" />
            <PrimaryText>{t(localization.services.call)}</PrimaryText>
          </ServicesContainer>
        </ContentWrapper>
        <HeaderText>{t(localization.services.inDevelopment)}</HeaderText>
        <ContentWrapper>
          <ServicesContainer pointer={0} disabled>
            <SVGIcon type="poll" color="neutralColor2" />
            <Text>{t(localization.services.poll)}</Text>
          </ServicesContainer>
          <ServicesContainer disabled>
            <SVGIcon type="guard" color="neutralColor2" />
            <Text>{t(localization.services.guard)}</Text>
          </ServicesContainer>
          <ServicesContainer disabled>
            <SVGIcon type="plumber" color="neutralColor2" />
            <Text>{t(localization.services.plumber)}</Text>
          </ServicesContainer>
          <ServicesContainer disabled>
            <SVGIcon type="electrician" color="neutralColor2" />
            <Text>{t(localization.services.electrician)}</Text>
          </ServicesContainer>
          <ServicesContainer disabled>
            <SVGIcon type="repair" color="neutralColor2" />
            <Text>{t(localization.services.repair)}</Text>
          </ServicesContainer>
          <ServicesContainer disabled>
            <SVGIcon type="vigulDogs" color="neutralColor2" />
            <Text>{t(localization.services.vigulDogs)}</Text>
          </ServicesContainer>
          <ServicesContainer disabled>
            <SVGIcon type="finance" color="neutralColor2" />
            <Text>{t(localization.services.finance)}</Text>
          </ServicesContainer>
        </ContentWrapper>
      </ScrollView>
    </Wrapper>
  );
};

export default Services;
