import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseLeaveFeedbackButton } from "./buildings/base-leave-feedback-button/BaseLeaveFeedbackButton";

export const LeaveFeedbackButtonBuilder = ({ item }: BuildersProps) => {
  const buildLeaveFeedbackButton: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.completed:
        return <BaseLeaveFeedbackButton review={item.review} />;

      default:
        return null;
    }
  };

  return buildLeaveFeedbackButton(item.status);
};
