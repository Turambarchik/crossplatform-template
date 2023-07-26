import type { FC } from "react";

import { reviewTypeEnum, StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseDetailReview } from "./buildings/base-detail-review/BaseDetailReview";

export const DetailReviewBuilder = ({ item }: BuildersProps) => {
  const buildDetailReview: FC<{
    type: reviewTypeEnum;
    status: StatusOrderType;
  }> = ({ type, status }) => {
    switch (type) {
      case reviewTypeEnum.client_question:
        switch (status) {
          case StatusOrderType.completed:
            return <BaseDetailReview answer={item?.answer} />;

          default:
            return null;
        }

      default:
        return null;
    }
  };

  return buildDetailReview({ type: item.type, status: item.status });
};
