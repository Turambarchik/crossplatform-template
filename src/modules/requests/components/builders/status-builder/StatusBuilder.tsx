import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseStatus } from "./buildings/base-status/BaseStatus";

export const StatusBuilder = ({ item }: BuildersProps) => {
  const buildStatus: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.new:
        return <BaseStatus orderStatusType={type} />;

      default:
        return null;
    }
  };

  return buildStatus(item.status);
};
