import { defaultTo } from "ramda";
import React from "react";
import styled from "styled-components/native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { useStoreActions } from "store/store";

type HeaderCloseButtonProps = {
  onClickCustom?: () => void;
};
export const HeaderCloseButton = ({
  onClickCustom,
}: HeaderCloseButtonProps) => {
  const {
    requests: { setIsOpenConfirmCloseModal },
  } = useStoreActions((state) => state);

  const closeAndResetNewRequest = () => {
    setIsOpenConfirmCloseModal(true);
  };

  return (
    <PressableStyled
      onPress={defaultTo(closeAndResetNewRequest, onClickCustom)}
    >
      <SVGIconStyled type="close" />
    </PressableStyled>
  );
};

const PressableStyled = styled.TouchableOpacity.attrs(({ theme }) => ({
  activeOpacity: theme.opacity.active,
}))`
  width: 30px;
  height: 30px;
  align-items: flex-start;
  justify-content: center;
  margin-left: -8px;
`;

const SVGIconStyled = styled(SVGIcon)`
  margin-right: 8px;
`;
