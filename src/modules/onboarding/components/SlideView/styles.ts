import { defaultTo } from "ramda";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

export const Styles = {
  ViewContainer: styled.View<{
    backgroundColor?: string;
    justifyContent: string;
  }>`
    justify-content: ${(props) => props.justifyContent};
    flex: 1;
    background-color: ${(props) =>
      defaultTo(props.theme.colors.primaryBg, props.backgroundColor)};
  `,
  ImageBackground: styled(FastImage)`
    flex: 0.6;
    width: 100%;
  `,
  ContentContainer: styled.View<{
    offsetpadding?: number;
    paddingTop?: number;
  }>`
    flex: 1;
    align-items: center;
    ${(props) =>
      props.offsetpadding && `padding-horizontal: ${props.offsetpadding}px`};
    position: relative;
  `,
};
