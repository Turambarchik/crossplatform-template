import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseCategory } from "./buildings/base-category/BaseCategory";

export const CategoryBuilder = ({ item }: BuildersProps) => {
  const buildCategory: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.canceled:
      case StatusOrderType.completed:
      case StatusOrderType.consideration:
      case StatusOrderType.in_progress:
      case StatusOrderType.new:
        return <BaseCategory reviewCategoryType={item.category} />;

      default:
        return null;
    }
  };

  return buildCategory(item.status);
};
