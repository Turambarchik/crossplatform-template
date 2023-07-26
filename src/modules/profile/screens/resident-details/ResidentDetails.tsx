import type { Route } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import React from "react";
import type { UserDetailsType } from "types";

import { Section } from "components/atoms/section/Section";
import { localization } from "helpers/constants";

import useResidentDetailsState from "./residentDetails.state";
import { ResidentDetailsStyles } from "./residentDetails.styles";

const { Wrapper, Text, InfoText, DeleteButton, DeleteButtonText } =
  ResidentDetailsStyles;

const ResidentDetails = () => {
  const {
    params: { userDetails },
  } = useRoute<Route<string, { userDetails: UserDetailsType }>>();
  const { t } = useResidentDetailsState();

  return (
    <Wrapper>
      <Section>
        <Section marginTop={16}>
          <InfoText>{t(localization.profile.fullname)}</InfoText>
          <Text marginTop={6}>{userDetails.name}</Text>
        </Section>
        <Section marginTop={16}>
          <InfoText>{t(localization.profile.phone)}</InfoText>
          <Section row>
            <Text marginTop={6}>{userDetails.phone}</Text>
          </Section>
        </Section>
      </Section>
      <DeleteButton
        variant="secondary"
        fullWidth
        // TODO
        // onPress={}
      >
        <DeleteButtonText>
          {t(localization.profile.deleteResident)}
        </DeleteButtonText>
      </DeleteButton>
    </Wrapper>
  );
};

export default ResidentDetails;
