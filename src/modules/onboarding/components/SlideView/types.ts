import type { ImageRequireSource } from "react-native";
import type { Source } from "react-native-fast-image";

import type { OnboardingBottomProps } from "../OnboardingBottom/onboardingBottom.types";

export type SlideViewProps = Omit<OnboardingBottomProps, "onClickButton"> & {
  index: number;
  isDark?: boolean;
  imageBackgroundSource: Source | ImageRequireSource;
  onClickButton: (slideIndex: number) => void;
};
