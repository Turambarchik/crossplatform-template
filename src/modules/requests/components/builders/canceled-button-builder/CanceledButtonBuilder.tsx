import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseCanceledButton } from "./buildings/canceled-button/CanceledButton";

export const CanceledButtonBuilder = ({ item }: BuildersProps) => {
  const buildCanceledButton: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.new:
      case StatusOrderType.consideration:
        return <BaseCanceledButton id={item.id} />;

      default:
        return null;
    }
  };

  return buildCanceledButton(item.status);
};
