import type { Action, Thunk } from "easy-peasy";
import type { Platform } from "react-native";

export type GetTokenPayload = {
  phone: string;
  password: string;
  deviceId: string;
  os: typeof Platform.OS;
};

export interface AuthModel {
  isAuth: boolean;
  setIsAuth: Action<this, this["isAuth"]>;

  token: string | null;
  setToken: Action<this, this["token"]>;

  refreshToken: null | string;
  setRefreshToken: Action<this, this["refreshToken"]>;

  signInWithBiometricThunk: Thunk<this, { signature?: string; id: string }>;

  pinCode: string | null;
  setPinCode: Action<this, this["pinCode"]>;

  timeToSendCode: number | null;
  setTimeToSendCode: Action<this, this["timeToSendCode"]>;

  isTriggeredFullLogout: boolean;
  setIsTriggeredFullLogout: Action<this, this["isTriggeredFullLogout"]>;
  logout: Thunk<this>;

  reset: Action<this>;
  initialVerification: Thunk<
    this,
    {
      phone: string;
      agreement: boolean;
      setErrorMessage: (error: string) => void;
    }
  >;
  validateCode: Thunk<
    this,
    { phone: string; smsCode: string; setErrorMessage: (error: string) => void }
  >;
  createPinCode: Thunk<
    this,
    { phone: string; pinCode: string; smsCode: string }
  >;
}
