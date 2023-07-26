import React from "react";
import type { FastImageProps } from "react-native-fast-image";
import FastImage from "react-native-fast-image";

type ImageProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  borderRadiusLeft?: number;
};

const Image = ({
  width = "100%",
  height = "100%",
  borderRadius = 0,
  borderRadiusLeft,
  ...props
}: ImageProps & FastImageProps) => (
  <FastImage
    {...props}
    style={{
      width,
      height,
      borderRadius,
      borderBottomLeftRadius: borderRadiusLeft
        ? borderRadiusLeft
        : borderRadius,
      borderTopLeftRadius: borderRadiusLeft ? borderRadiusLeft : borderRadius,
    }}
  />
);

export default Image;
