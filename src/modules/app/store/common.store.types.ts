import type { Action } from "easy-peasy";

export interface CommonModel {
  // loggin info
  isLoged: boolean;
  setIsLoged: Action<this, this["isLoged"]>;
  // network info
  isNetworkError: boolean;
  setIsNetworkError: Action<this, this["isNetworkError"]>;
  reset: Action<this>;
}
