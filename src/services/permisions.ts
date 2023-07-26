import type { Permission } from "react-native-permissions";
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from "react-native-permissions";

export enum PermissionsStatus {
  denied = "denied",
  blocked = "blocked",
  granted = "granted",
  limited = "limited",
  unavailable = "unavailable",
  unknown = "unknown",
}

const CAMERA_PERMISSIONS_LIST = [
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.ANDROID.CAMERA,
];

const GALLERY_PERMISSIONS_LIST = [
  PERMISSIONS.IOS.PHOTO_LIBRARY,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

const BIOMETRIC_PERMISSIONS = [PERMISSIONS.IOS.FACE_ID];

const checkPermissions =
  (perrmisionArr: Permission[]) =>
  async (): Promise<PermissionsStatus | null> => {
    try {
      const data: any = await checkMultiple(perrmisionArr);
      const permissionsData = Object.keys(data);
      let permissionAccesState: PermissionsStatus | null = null;

      for (const permission of permissionsData) {
        if (
          data[permission] === PermissionsStatus.denied ||
          data[permission] === PermissionsStatus.blocked
        ) {
          const result: any = await requestMultiple(perrmisionArr);
          if (result[permission] === PermissionsStatus.blocked) {
            permissionAccesState = PermissionsStatus.blocked;
          } else if (result[permission] === PermissionsStatus.denied) {
            permissionAccesState = PermissionsStatus.denied;
          } else {
            permissionAccesState = PermissionsStatus.granted;
          }
        } else if (
          data[permission] === PermissionsStatus.granted ||
          data[permission] === PermissionsStatus.limited
        ) {
          permissionAccesState = PermissionsStatus.granted;
        }
      }
      return permissionAccesState;
    } catch (error) {
      console.warn("Permmision error", error);
      return null;
    }
  };

export const checkCameraPhotoPermissions = checkPermissions(
  CAMERA_PERMISSIONS_LIST
);

export const checkGalleryPermissions = checkPermissions(
  GALLERY_PERMISSIONS_LIST
);

export const checkBiometricPermissions = checkPermissions(
  BIOMETRIC_PERMISSIONS
);
