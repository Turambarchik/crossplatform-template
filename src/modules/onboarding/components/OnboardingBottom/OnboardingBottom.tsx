import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "components/atoms/button/Button";
import { localization } from "helpers/constants";

import { Styles } from "./onboardingBottom.styles";
import type { OnboardingBottomProps } from "./onboardingBottom.types";

const { Wrapper, Title, Text, ButtonWrapper, ButtonText } = Styles;

export const OnboardingBottom = ({
  onClickButton,
  onLastScreen,
  text,
  title,
}: OnboardingBottomProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title color="black">{title}</Title>
      <Text color="black">{text}</Text>
      <ButtonWrapper>
        <Button variant="primary" fullWidth onPress={onClickButton}>
          <ButtonText>
            {onLastScreen
              ? t(localization.onboarding.enter)
              : t(localization.onboarding.next)}
          </ButtonText>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
