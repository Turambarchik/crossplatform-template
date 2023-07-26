import { AxiosError } from "axios";

export interface AxiosPayloadRequest {
  method: Method;
  url: string;
  area?: string;
  headers?: Record<string, string>;
  internalPayload?: {
    setLoading?: boolean;
  };
}

interface AxiosPayload {
  request: AxiosPayloadRequest;
  options?: {
    // TODO: typing data for each middleware function
    onComplete?: (e: any) => void;
    onSuccess?: (e: any) => void;
    onError?: (e: any) => void;
  };
}

interface AxiosAction {
  type: string;
  error?: AxiosError;
  payload: AxiosPayload;
}

export type AxiosActionCreator = () => AxiosAction;

interface AxiosPayloadRequestWithData<T> {
  data: T;
  method: Method;
  url: string;
  area?: string;
  headers?: Record<string, string>;
}

interface AxiosPayloadWithData<T> {
  request: AxiosPayloadRequestWithData<T>;
  options?: {
    // TODO: typing data for each middleware function
    onComplete?: (e: any) => void;
    onSuccess?: (e: any) => void;
    onError?: (e: any) => void;
  };
}

interface AxiosActionWithData<T> {
  type: string;
  error?: AxiosError;
  payload: AxiosPayloadWithData<T>;
}

export type AxiosActionWithDataCreator<T> = (
  payload: T
) => AxiosActionWithData<T>;

export enum Method {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum ActionSuffix {
  SUCCESS = "_SUCCESS",
  FAIL = "_FAIL",
}
