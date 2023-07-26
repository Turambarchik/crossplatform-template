import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import { and, isNil } from "ramda";
import { useState } from "react";
import type { BiometryType } from "react-native-biometrics";
import ReactNativeBiometrics from "react-native-biometrics";

import { useStoreActions, useStoreState } from "store/store";
import { errorMessageByServer } from "store/store.types";
import { appErrorMessages } from "types/app-types";

export const rnBiometrics = new ReactNativeBiometrics();

const useBiometric = () => {
  const {
    auth: { token, isAuth },
    app: { isBiometricActive },
  } = useStoreState((state) => state);
  const {
    app: { setIsBiometricActive },
    auth: { signInWithBiometricThunk },
  } = useStoreActions((actions) => actions);

  const [biometricType, setBiometricType] = useState<
    BiometryType | undefined
  >();

  const checkBiometricIsActive = async () => {
    if (and(!isAuth, isNil(token))) {
      setIsBiometricActive(false);
      return;
    }

    try {
      const deviceId = await messaging().getToken();

      await axios.get(`gadget-tokens/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/ld+json",
        },
      });

      const { biometryType, available } =
        await rnBiometrics.isSensorAvailable();

      if (and(available, biometryType)) {
        setIsBiometricActive(true);
        setBiometricType(biometryType);
      }
    } catch {
      console.warn("Biometric is disabled");
      setIsBiometricActive(false);
    }
  };

  const singInWithBiometric = async () => {
    try {
      const deviceId = await messaging().getToken();
      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: "Увійти",
        payload: deviceId,
      });

      if (and(success, signature)) {
        await signInWithBiometricThunk({
          id: deviceId,
          signature,
        });
      } else {
        throw new Error("Not Success singInWithBiometric ");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting singInWithBiometric ");
    }
  };

  const activateBiometric = async () => {
    try {
      const { publicKey } = await rnBiometrics.createKeys();
      const deviceId = await messaging().getToken();

      await axios.post(
        "gadget-tokens",
        { id: deviceId, publicKey },
        { headers: { "content-type": "application/ld+json" } }
      );

      setIsBiometricActive(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (
          e?.response?.data["hydra:description"] ===
          errorMessageByServer.biometricHadAlreadyActivated
        ) {
          setIsBiometricActive(true);
        }
      } else {
        console.warn("Not Axios Error");
      }
      console.warn("activateBiometric", { e });
    }
  };

  const disableBiometric = async () => {
    try {
      const deviceId = await messaging().getToken();

      await axios.delete(`gadget-tokens/${deviceId}`, {
        headers: { "content-type": "application/ld+json" },
      });

      await rnBiometrics.deleteKeys();
      setIsBiometricActive(false);
    } catch (e: unknown) {
      console.warn("disableBiometric", { e });
    }
  };

  const isBiometricSupported = async () => {
    try {
      const data = await rnBiometrics.isSensorAvailable();
      if (
        !isNil(data.error) &&
        !data.error.includes(appErrorMessages.biometricPermissionDenied) &&
        isNil(data.biometryType)
      ) {
        return false;
      }
      setBiometricType(data.biometryType);
      return true;
    } catch {
      return false;
    }
  };

  const checkBiometricIsAvailable = async () => {
    try {
      const { biometryType, available } =
        await rnBiometrics.isSensorAvailable();

      if (and(available, biometryType)) {
        setBiometricType(biometryType);
      }
      return Boolean(available && biometryType);
    } catch {
      console.warn("Biometric is unAvailable");
      return false;
    }
  };

  return {
    biometricType,
    isBiometricActive,
    checkBiometricIsActive,
    checkBiometricIsAvailable,
    singInWithBiometric,
    activateBiometric,
    disableBiometric,
    isBiometricSupported,
  };
};

export default useBiometric;
