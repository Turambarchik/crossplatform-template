import React from "react";
import { useTranslation } from "react-i18next";

import { localization } from "helpers/constants";

import { ContentChangerButtonStyles } from "./contentChangerButtons.styles";

const { ChangerButton, Wrapper, RegularText } = ContentChangerButtonStyles;

type ChangerButtonProps = {
  isSelected: boolean;
  setSelected: (is: boolean) => void;
};

export const ContentChangerButtons = ({
  isSelected,
  setSelected,
}: ChangerButtonProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper marginTop={16}>
      <ChangerButton
        withShadow={!isSelected}
        onPress={setSelected.bind(null, false)}
      >
        <RegularText isSelected={!isSelected}>
          {t(localization.profile.myObjects)}
        </RegularText>
      </ChangerButton>
      <ChangerButton
        withShadow={isSelected}
        onPress={setSelected.bind(null, true)}
      >
        <RegularText isSelected={isSelected}>
          {t(localization.profile.myInformation)}
        </RegularText>
      </ChangerButton>
    </Wrapper>
  );
};
