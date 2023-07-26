import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseCanceled } from "./buildings/base-canceled/BaseCanceled";

export const CanceledBuilder = ({ item }: BuildersProps) => {
  const buildCanceled: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.canceled:
        return (
          <BaseCanceled
            orderStatusType={type}
            canceledText={item?.cancellationReason}
          />
        );

      default:
        return null;
    }
  };

  return buildCanceled(item.status);
};
