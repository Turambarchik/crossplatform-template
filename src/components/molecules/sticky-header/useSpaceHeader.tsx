import { useNavigation } from "@react-navigation/native";
import { equals, isNil } from "ramda";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { HeaderBackButton } from "components/atoms/header-back-button/HeaderBackButton";
import { HeaderBackground } from "components/atoms/header-background/HeaderBackground";
import { SVGIcon } from "components/atoms/icon/Icon";
import { addressNameConverter } from "helpers/converter";
import { Routes } from "modules/app/Routes";
import { useStoreState } from "store/store";

import { ModalSheet } from "../modal-sheet/ModalSheet";
import { ModalSheetType } from "../modal-sheet/modalSheet.types";
import { StickyHeaderStyles } from "./spaceHeader.styles";

const {
  HeaderText,
  LeftWrapper,
  RightWrapper,
  CenterWrapper,
  NotificationCountWrapper,
  NotificationCountText,
  NotificationCountIcon,
} = StickyHeaderStyles;

export type useSpaceHeaderProps = {
  isTransparent?: boolean;
  withLeft?: boolean;
  withNotifs?: boolean;
  withLeftArrow?: boolean;
  withDropdown?: boolean;
  // TODO -  BottomTabNavigationOptions && NativeStackNavigationOptions
};

export const useSpaceHeader = ({
  isTransparent = false,
  withNotifs = false,
  withLeft = false,
  withLeftArrow = false,
  withDropdown = false,
}: useSpaceHeaderProps) => {
  const [isOpenObjectsModal, setIsOpenObjectsModal] = useState<boolean>(false);
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

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerTitle: () =>
        withDropdown ? (
          <CenterWrapper onPress={setIsOpenObjectsModal.bind(null, true)}>
            <HeaderText numberOfLines={1}>{currentHeaderTitle}</HeaderText>
            <SVGIcon type="arrowDown" />
            <ModalSheet
              modalType={ModalSheetType.objects}
              isOpen={isOpenObjectsModal}
              setIsOpen={setIsOpenObjectsModal}
            />
          </CenterWrapper>
        ) : (
          <HeaderText numberOfLines={1}>{currentHeaderTitle}</HeaderText>
        ),
      headerLeft: () =>
        withLeft ? (
          <LeftWrapper>
            <SVGIcon type="logo" />
          </LeftWrapper>
        ) : withLeftArrow ? (
          <HeaderBackButton />
        ) : (
          <></>
        ),
      headerRight: () =>
        withNotifs ? (
          <RightWrapper onPress={goToTheNotificationScreen}>
            {!equals(totalItemsUnread, 0) ? (
              <>
                <NotificationCountIcon type="notificatiosWithText" />
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
        ) : (
          <></>
        ),
      headerBackground: () => <HeaderBackground />,
      headerTransparent: isTransparent,
      headerStyle: {
        backgroundColor: theme.colors.opacityBg,
      },
    });
  }, [
    currentHeaderTitle,
    goToTheNotificationScreen,
    isOpenObjectsModal,
    navigation,
    theme.colors.primaryBg,
    totalItemsUnread,
    isTransparent,
    withDropdown,
    withLeft,
    withLeftArrow,
    withNotifs,
    theme.colors.opacityBg,
  ]);
};
