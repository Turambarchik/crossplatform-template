import React, { useMemo } from "react";

import type theme from "theme/theme";

import { RichTextStyles } from "./richText.styles";

export type RichTextProps = {
  value: string;
  lineHeight: number;
  maxWidth?: number;
  fullLenght?: boolean;
  fz?: keyof typeof theme.fontSizes;
  fw?: keyof typeof theme.fontWeight;
  color?: keyof typeof theme.components.typography;
};

const { Markdown } = RichTextStyles;
const MAX_STRING_LENGTH = 50;

export const RichText = ({
  value,
  color = "primaryColor",
  fz = "fz14",
  fw = "fw400",
  lineHeight,
  maxWidth,
  fullLenght = false,
}: RichTextProps) => {
  const processedString = useMemo(() => {
    if (fullLenght) return value;
    if (value.length >= MAX_STRING_LENGTH) {
      return value.slice(0, MAX_STRING_LENGTH).concat("...");
    }
    return value;
  }, [fullLenght, value]);

  return (
    <Markdown
      value={processedString}
      fw={fw}
      fz={fz}
      color={color}
      maxWidth={maxWidth}
      lineHeight={lineHeight}
    />
  );
};
