import type { FC } from "react";

import { StatusOrderType } from "types";

import type { BuildersProps } from "../builders.types";
import { BaseImagesList } from "./buildings/base-images-list/BaseImagesList";

export const ImagesListBuilder = ({ item }: BuildersProps) => {
  const buildImagesList: FC<StatusOrderType> = (type) => {
    switch (type) {
      case StatusOrderType.canceled:
      case StatusOrderType.completed:
      case StatusOrderType.consideration:
      case StatusOrderType.in_progress:
      case StatusOrderType.new:
        return <BaseImagesList files={item?.gallery?.files} />;

      default:
        return null;
    }
  };

  return buildImagesList(item.status);
};
