import React from "react";

import { SVGIcon } from "components/atoms/icon/Icon";

import { Styles } from "../../orderStatus.styles";
import type { TextWithIconProps } from "./textWithLeftIcon.types";

const { BaseText, Flex } = Styles;

export const TextWithIcon = ({
  text,
  iconType = "completed",
}: TextWithIconProps) => (
  <Flex>
    <SVGIcon type={iconType} color="darkGrey" />
    <BaseText marginLeft={6}>{text}</BaseText>
  </Flex>
);
