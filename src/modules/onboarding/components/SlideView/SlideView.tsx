import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LogoText } from "components/atoms/logo-text/LogoText";

import { OnboardingBottom } from "../OnboardingBottom/OnboardingBottom";
import { Styles } from "./styles";
import type { SlideViewProps } from "./types";

const { ViewContainer, ContentContainer, ImageBackground } = Styles;

export const SlideView = ({
  index,
  isDark = false,
  imageBackgroundSource,
  onClickButton,
  onLastScreen,
  text,
  title,
}: SlideViewProps) => {
  const insets = useSafeAreaInsets();

  const handleOnClickButton = () => {
    onClickButton(index);
  };

  return (
    <ViewContainer key={index} justifyContent="space-between">
      <ContentContainer>
        <LogoText
          color={isDark ? "black" : "white"}
          style={{ position: "absolute", top: insets.top + 30, zIndex: 2 }}
        />
        <ImageBackground source={imageBackgroundSource} resizeMode="cover" />
        <OnboardingBottom
          onClickButton={handleOnClickButton}
          onLastScreen={onLastScreen}
          text={text}
          title={title}
        />
      </ContentContainer>
    </ViewContainer>
  );
};
