import type { Action, Thunk } from "easy-peasy";
import type { SpacesType } from "types";

export interface AppModel {
  // loggin info
  timesToLogin: number;
  setTimesToLogin: Action<this>;
  setTimesToLoginReset: Action<this>;
  isFirstEntry: boolean;
  setIsFirstEntry: Action<this, this["isFirstEntry"]>;
  isOnboarded: boolean;
  setIsOnboarded: Action<this, this["isOnboarded"]>;

  // manage app theme
  isDarkTheme: boolean;
  setIsDarkTheme: Action<this, this["isDarkTheme"]>;

  // manage biometric
  isBiometricActive: boolean;
  setIsBiometricActive: Action<this, this["isBiometricActive"]>;

  mySpaces: null | SpacesType[];
  setMySpaces: Action<this, this["mySpaces"]>;
  getMySpaces: Thunk<this>;
  currentSpace: null | SpacesType;
  setCurrentSpace: Action<this, this["currentSpace"]>;
  reset: Action<this>;
}
