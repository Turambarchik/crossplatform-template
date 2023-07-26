import React from "react";

import { Styles } from "./animetedIndicator.styles";
import type { AnimetedIndicatorProps } from "./animetedIndicator.types";
import { Dot } from "./Dot";

const { Wrapper } = Styles;

export const AnimetedIndicator = ({
  length,
  currentIndexPage,
}: AnimetedIndicatorProps) => (
  <Wrapper>
    {Array.from({ length }, (_, index) => (
      <Dot
        key={index}
        currentIndexPage={currentIndexPage}
        currentIndex={index}
      />
    ))}
  </Wrapper>
);
