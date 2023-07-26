import Markdown from "react-native-marked";
import styled from "styled-components/native";

import type { RichTextProps } from "./RichText";

export const RichTextStyles = {
  Markdown: styled(Markdown).attrs<RichTextProps>(
    ({
      theme,
      fz = "fz14",
      fw = "fw400",
      color = "primaryColor",
      lineHeight,
      maxWidth,
    }) => ({
      styles: {
        text: {
          fontSize: theme.fontSizes[fz],
          color: theme.components.typography[color],
          lineHeight: lineHeight,
          fontFamily: theme.fontWeight[fw],
        },
        container: { backgroundColor: "transparent", margin: 0, padding: 0 },
        link: { color: theme.components.typography.dangerColor },
        paragraph: { margin: 3, padding: 3 },
        li: {
          fontSize: theme.fontSizes[fz],
          color: theme.components.typography[color],
          lineHeight: lineHeight,
          fontFamily: theme.fontWeight[fw],
        },
      },
      flatListProps: {
        style: {
          // TODO
          // flex: 1,
          flexWrap: "wrap",
        },
        contentContainerStyle: {
          paddingRight: 40,
          maxWidth: maxWidth ? maxWidth : "100%",
        },
        bounces: false,
        initialNumToRender: 8,
      },
    })
  )<RichTextProps>`
    flex-direction: row;
    align-items: center;
  `,
};
