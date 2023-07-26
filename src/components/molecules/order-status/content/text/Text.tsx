import React from "react";

import { Styles } from "../../orderStatus.styles";
import type { TextProps } from "./text.types";

const { BaseText } = Styles;

export const Text = ({ text }: TextProps) => <BaseText>{text}</BaseText>;
