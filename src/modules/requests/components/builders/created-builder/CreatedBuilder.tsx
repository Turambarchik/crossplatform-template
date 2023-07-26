import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseCreated } from "./buildings/base-created/BaseCreated";

export const CreatedBuilder = ({ item }: BuildersProps) => {
  const buildCreated: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.canceled:
      case StatusOrderType.completed:
      case StatusOrderType.consideration:
      case StatusOrderType.in_progress:
      case StatusOrderType.new:
        return <BaseCreated created={item.createdAt} />;

      default:
        return null;
    }
  };

  return buildCreated(item.status);
};
