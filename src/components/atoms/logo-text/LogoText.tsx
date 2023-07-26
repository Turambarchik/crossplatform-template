import React from "react";
import type { SvgProps } from "react-native-svg";
import styled from "styled-components/native";

import type { IconProps } from "../icon/Icon";
import { SVGIcon } from "../icon/Icon";

type LogoTextProps = SvgProps & Omit<IconProps, "type">;

export const LogoText = (props: LogoTextProps) => (
  <SVGIconLogo {...props} type="logoText" />
);

const SVGIconLogo = styled(SVGIcon).attrs((props) => ({
  type: "logoText",
  color: props.color,
}))``;
