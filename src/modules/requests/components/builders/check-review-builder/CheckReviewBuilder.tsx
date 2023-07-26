import type { FC } from "react";

import { reviewTypeEnum, StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseCheckReview } from "./buildings/base-check-review/BaseCheckReview";

export const CheckReviewBuilder = ({ item }: BuildersProps) => {
  const buildCheckReview: FC<{
    type: reviewTypeEnum;
    status: StatusOrderType;
  }> = ({ type, status }) => {
    switch (type) {
      case reviewTypeEnum.client_question:
        switch (status) {
          case StatusOrderType.completed:
            return <BaseCheckReview review={item.review} />;

          default:
            return null;
        }

      default:
        return null;
    }
  };

  return buildCheckReview({ type: item.type, status: item.status });
};
