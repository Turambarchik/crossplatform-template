import type { StatusOrderType } from "types";

import type { TextProps, TextWithIconProps } from "./content";

export type OrderStatusProps = { statusOrderType: StatusOrderType } & (
  | TextProps
  | TextWithIconProps
);
