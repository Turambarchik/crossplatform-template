import type { Action } from "easy-peasy";

export interface PaginationFlatListType {
  page: number;
  totalItems: number;
  isLoading: boolean;
  setIsLoading: Action<this, boolean>;
  setPage: Action<this, number>;
  setTotalItems: Action<this, number>;
  isEmptyList: boolean;
  setIsEmptyList: Action<this, boolean>;
}
