declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.md';
declare module 'react-native-thumbnail-grid';
declare module '@env' {
  export const BUNDLE_ID: string;
  export const DISPLAY_NAME: string;
  export const VERSION: string;
  export const BASE_URL: string;
  export const BASE_CHAT_URL: string;
  export const ENV: 'dev' | 'prod';
  export const TEST_CLUB_EMAIL: string;
  export const TEST_CLUB_PASS: string;
  export const TEST_GOLF_EMAIL: string;
  export const TEST_GOLF_PASS: string;
  export const TEST_CLUB_MEMBER_EMAIL: string;
  export const TEST_CLUB_MEMBER_PASS: string;
}

import type { RootStackParams } from "./src/modules/app/Routes";

// declare types for application routes
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

declare module "*.png" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export = value;
}

declare module "*.jpg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export = value;
}

declare module "react-native-config" {
  export interface NativeConfig {
    BASE_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    URL_LINK_IOS: string;
    URL_LINK_ANDROID: string;
    PRIVACY_POLICY: string;
    PUBLIC_OFFER: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
