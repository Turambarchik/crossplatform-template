import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

import { SVGIcon } from "../icon/Icon";

export type HeaderBackButtonProps = {
  navigateBackCustom?: () => void;
};
export const HeaderBackButton = ({
  navigateBackCustom,
}: HeaderBackButtonProps) => {
  const navigation = useNavigation();
  return (
    <PressableStyled
      onPress={navigateBackCustom ? navigateBackCustom : navigation.goBack}
    >
      <SVGIconStyled type="arrowLeft" />
    </PressableStyled>
  );
};

const PressableStyled = styled.Pressable`
  width: 30px;
  height: 30px;
  align-items: flex-start;
  justify-content: center;
  margin-left: -8px;
`;

const SVGIconStyled = styled(SVGIcon)`
  margin-left: 8px;
`;
