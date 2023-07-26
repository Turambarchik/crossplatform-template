import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseDeadline } from "./buildings/base-deadline/BaseDeadline";

export const DeadlineBuilder = ({ item }: BuildersProps) => {
  const buildDeadline: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.completed:
      case StatusOrderType.consideration:
      case StatusOrderType.in_progress:
        return (
          <BaseDeadline orderStatusType={type} deadlineDate={item.deadline} />
        );

      default:
        return null;
    }
  };

  return buildDeadline(item.status);
};
