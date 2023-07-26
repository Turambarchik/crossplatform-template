import { useNavigation } from "@react-navigation/native";
import { defaultTo, equals, isNil } from "ramda";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

import type { HeaderBackButtonProps } from "components/atoms/header-back-button/HeaderBackButton";
import { HeaderBackButton } from "components/atoms/header-back-button/HeaderBackButton";
import { HeaderBackground } from "components/atoms/header-background/HeaderBackground";
import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";
import { StickyHeaderStyles } from "components/molecules/sticky-header/spaceHeader.styles";
import type { useSpaceHeaderProps } from "components/molecules/sticky-header/useSpaceHeader";
import { isIOS } from "helpers/constants";
import { addressNameConverter } from "helpers/converter";
import { Routes } from "modules/app/Routes";
import { useStoreState } from "store/store";

const { NotificationCountWrapper, NotificationCountText } = StickyHeaderStyles;

type HeaderProps = useSpaceHeaderProps &
  HeaderBackButtonProps & {
    currentText: string;
    currentHeaderTitle?: string;
    HeaderRight?: FC;
  };

export const useSetHeader = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const {
    notification: { totalItemsUnread },
    app: { currentSpace },
  } = useStoreState((state) => state);

  const goToTheNotificationScreen = useCallback(() => {
    navigation.navigate(Routes.Notification);
  }, [navigation]);

  const currentHeaderTitle = useMemo(() => {
    if (isNil(currentSpace)) {
      return "";
    }
    return addressNameConverter(currentSpace.address);
  }, [currentSpace]);

  const setRequestHeader = useCallback(
    ({
      currentText,
      isTransparent = true,
      HeaderRight,
      currentHeaderTitle: currentHeaderTitleCustom,
      navigateBackCustom,
    }: HeaderProps) => {
      navigation.setOptions({
        headerShown: true,
        headerBackVisible: false,
        headerTitleAlign: "center",
        headerTitle: () => (
          <CenterWrapper>
            <HeaderTitle>{currentText}</HeaderTitle>
            <HeaderText>
              {defaultTo(currentHeaderTitle, currentHeaderTitleCustom)}
            </HeaderText>
          </CenterWrapper>
        ),
        headerLeft: () => (
          <HeaderBackButton navigateBackCustom={navigateBackCustom} />
        ),
        headerRight: () =>
          HeaderRight ? (
            <HeaderRight />
          ) : (
            <RightWrapper onPress={goToTheNotificationScreen}>
              {!equals(totalItemsUnread, 0) ? (
                <>
                  <SVGIcon type="notificatiosWithText" />
                  <NotificationCountWrapper>
                    <NotificationCountText>
                      {totalItemsUnread > 99 ? 99 : totalItemsUnread}
                    </NotificationCountText>
                  </NotificationCountWrapper>
                </>
              ) : (
                <SVGIcon type="notifications" />
              )}
            </RightWrapper>
          ),
        headerBackground: () => <HeaderBackground />,
        headerTransparent: isTransparent,
        headerStyle: {
          backgroundColor: theme.colors.opacityBg,
        },
      });
    },
    [
      currentHeaderTitle,
      goToTheNotificationScreen,
      navigation,
      theme.colors.opacityBg,
      totalItemsUnread,
    ]
  );

  return {
    setRequestHeader,
  };
};

const HeaderTitle = styled(Typography).attrs({
  fz: "fz18",
  fw: "fw500",
  color: "primaryColor",
  numberOfLines: 1,
})`
  line-height: 22px;
  max-width: 230px;
  text-align: center;
`;

const HeaderText = styled(Typography).attrs({
  fz: "fz12",
  fw: "fw500",
  color: "infoColor",
  numberOfLines: 1,
})`
  line-height: 12px;
  max-width: 230px;
  text-align: center;
  margin-top: 4px;
  margin-bottom: 15px;
`;

const CenterWrapper = styled.View`
  align-items: center;
  ${isIOS && "padding-bottom: 12px;"}
`;

const RightWrapper = styled.Pressable`
  position: relative;
  ${isIOS && "padding-bottom: 12px;"};
`;
