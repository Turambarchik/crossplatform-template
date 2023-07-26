import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseReview } from "./buildings/base-review/BaseReview";

export const ReviewBuilder = ({ item }: BuildersProps) => {
  const buildReview: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.completed:
        return <BaseReview review={item.review} />;

      default:
        return null;
    }
  };

  return buildReview(item.status);
};
