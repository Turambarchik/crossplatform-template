import type { SharedValue } from "react-native-reanimated";

export type AnimetedIndicatorProps = {
  length: number;
  currentIndexPage: SharedValue<number>;
};

export type AnimetedDotProps = {
  currentIndexPage: SharedValue<number>;
  currentIndex: number;
};
