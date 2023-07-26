import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseSubjectOfTheAppeal } from "./buildings/base-subject-of-the-appeal/BaseSubjectOfTheAppeal";

export const SubjectOfTheAppealBuilder = ({ item }: BuildersProps) => {
  const buildSubjectOfTheAppea: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.canceled:
      case StatusOrderType.completed:
      case StatusOrderType.consideration:
      case StatusOrderType.in_progress:
      case StatusOrderType.new:
        return <BaseSubjectOfTheAppeal text={item.description} />;

      default:
        return null;
    }
  };

  return buildSubjectOfTheAppea(item.status);
};
