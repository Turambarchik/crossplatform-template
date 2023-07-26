import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { isNil } from "ramda";
import React, { useCallback, useEffect } from "react";
import type { SpacesType } from "types";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Loader } from "components/molecules/loader/Loader";
import { ModalSheet } from "components/molecules/modal-sheet/ModalSheet";
import { ModalSheetType } from "components/molecules/modal-sheet/modalSheet.types";
import { useSpaceHeader } from "components/molecules/sticky-header/useSpaceHeader";
import { localization } from "helpers/constants";
import { ContentChangerButtons } from "modules/profile/components/content-changer-buttons/ContentChangerButtons";
import { UserInfo } from "modules/profile/components/user-info/UserInfo";

import { ApartmentItem } from "../../components/apartment-item/ApartmentItem";
import useProfileInfoState from "./profileInfo.state";
import { ProfileInfoStyles } from "./profileInfo.styles";

const {
  Wrapper,
  ScrollView,
  HeaderText,
  LogOutButtonText,
  ContentWrapper,
  FlashListViewWrapper,
  LogoutButtonWrapper,
  LogoutButton,
} = ProfileInfoStyles;

const ProfileInfo = () => {
  const {
    t,
    isLoading,
    isUserInfo,
    setIsUserInfo,
    setIsOpenLogoutModal,
    handleGetUserProfile,
    userProfile,
    isOpenLogoutModal,
    handleLogout,
  } = useProfileInfoState();

  const headerHeight = useHeaderHeight();

  useSpaceHeader({
    withDropdown: true,
    withLeft: true,
    withNotifs: true,
    isTransparent: true,
  });

  useEffect(() => {
    handleGetUserProfile();
  }, [handleGetUserProfile]);

  const renderAppartmentItem = useCallback(
    ({ item }: { item: SpacesType }) => <ApartmentItem apartment={item} />,
    []
  );

  return (
    <Wrapper>
      <ScrollView headerHeight={headerHeight}>
        <ContentWrapper>
          <HeaderText>{t(localization.general.profile)}</HeaderText>
          <ContentChangerButtons
            isSelected={isUserInfo}
            setSelected={setIsUserInfo}
          />
          {isUserInfo ? (
            <UserInfo />
          ) : !isNil(userProfile) ? (
            <FlashListViewWrapper>
              <FlashList
                renderItem={renderAppartmentItem}
                keyExtractor={(item) => item["@id"]}
                showsVerticalScrollIndicator={false}
                data={userProfile.allSpaces}
                estimatedItemSize={168}
              />
            </FlashListViewWrapper>
          ) : null}
        </ContentWrapper>
      </ScrollView>
      {isUserInfo && (
        <LogoutButtonWrapper>
          <LogoutButton
            variant="secondary"
            fullWidth
            onPress={setIsOpenLogoutModal.bind(null, true)}
          >
            <SVGIcon type="logout" />
            <LogOutButtonText>
              {t(localization.profile.logout)}
            </LogOutButtonText>
          </LogoutButton>
        </LogoutButtonWrapper>
      )}
      <ModalSheet
        modalType={ModalSheetType.confirmation}
        accept={handleLogout}
        isOpen={isOpenLogoutModal}
        setIsOpen={setIsOpenLogoutModal}
      />
      <Loader visible={isLoading} transparent />
    </Wrapper>
  );
};

export default ProfileInfo;
