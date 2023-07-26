import { Config } from "react-native-config";

export function setRefreshTokenFormData(refreshToken: string | null) {
  const formData = new FormData();
  formData.append("grant_type", "refresh_token");
  formData.append("client_id", Config.CLIENT_ID);
  formData.append("client_secret", Config.CLIENT_SECRET);
  formData.append("refresh_token", String(refreshToken));

  return formData;
}

export function setTokenFormData({
  phone,
  password,
}: {
  phone: string;
  password: string;
}) {
  const formData = new FormData();
  formData.append("grant_type", "password");
  formData.append("client_id", Config.CLIENT_ID);
  formData.append("client_secret", Config.CLIENT_SECRET);
  formData.append("username", phone);
  formData.append("password", password);

  return formData;
}

export function setTokenInitialVerification({ phone }: { phone: string }) {
  const formData = new FormData();
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", Config.CLIENT_ID);
  formData.append("client_secret", Config.CLIENT_SECRET);
  formData.append("username", phone);

  return formData;
}

export function setTokenCreatePinCode({
  phone,
  smsCode,
}: {
  phone: string;
  smsCode: string;
}) {
  const formData = new FormData();
  formData.append("grant_type", "sms");
  formData.append("client_id", Config.CLIENT_ID);
  formData.append("client_secret", Config.CLIENT_SECRET);
  formData.append("username", phone);
  formData.append("smsCode", smsCode);

  return formData;
}

export function setBiometricFormData({
  id,
  signature,
}: {
  id: string;
  signature?: string;
}) {
  const formData = new FormData();
  formData.append("grant_type", "gadget");
  formData.append("client_id", Config.CLIENT_ID);
  formData.append("client_secret", Config.CLIENT_SECRET);
  formData.append("gadget_id", id);
  formData.append("signature", String(signature));
  return formData;
}

export function setInitialVerificationFormData({
  phone,
  agreement,
}: {
  phone: string;
  agreement: boolean;
}) {
  // do not use formData for this request
  return { phone, agreement };
}
