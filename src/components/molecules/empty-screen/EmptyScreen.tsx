import React from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { localization } from "helpers/constants";
import { useStoreState } from "store/store";

import { EmptyScreenStyles } from "./emptyScreen.styles";
import type { EmptyScreenProps } from "./emptyScreen.types";

const { Wrapper, Text } = EmptyScreenStyles;

export const EmptyScreen = ({
  iconType,
  text = "",
  marginTop,
  ...props
}: EmptyScreenProps & ViewProps) => {
  const { t } = useTranslation();
  const {
    common: { isNetworkError },
  } = useStoreState((state) => state);

  return (
    <Wrapper marginTop={marginTop} {...props}>
      {iconType && !isNetworkError && text ? (
        <>
          <SVGIcon type={iconType} />
          <Text>{text}</Text>
        </>
      ) : (
        <>
          <SVGIcon type="noInternet" color="black" />
          <Text>{t(localization.general.checkInternetConnection)}</Text>
        </>
      )}
    </Wrapper>
  );
};
