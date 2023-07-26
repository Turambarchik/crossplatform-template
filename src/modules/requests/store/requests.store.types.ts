import type { Action, Thunk } from "easy-peasy";
import type { Asset } from "react-native-image-picker";
import type {
  AddressType,
  FileType,
  GetResponseDTO,
  PaginationFlatListType,
  reviewCategoryEnum,
  reviewTypeEnum,
  SpacesType,
} from "types";
import type { StatusOrderType } from "types";

export type galleryFileTypeDTO = {
  ["@id"]: string;
  ["@type"]: string;
  id: string;
  name: string;
  originalName: string;
  context: string;
  mimeType: string;
  size: number;
  path: string;
  uri: string;
};

export type ReviewTypeDTO = {
  ["@id"]: string;
  ["@type"]: string;
  id: string;
  rating: number;
  comment?: string;
};

export type SpaceDTO = {
  number: number;
  floor: number;
  owner: string;
  section: string;
  address: string[];
  conciergeNumber: string;
  house: string;
  complex: string;
};

export type CreatedBy = {
  id: string;
  phone: string;
  role: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  verified: boolean;
  spaces: SpaceDTO[];
  name: string;
  concierges: string[];
};

export type CitizenDTO = {
  id: string;
  phone: string;
  role: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  verified: boolean;
  spaces: SpaceDTO[];
  name: string;
  concierges: string[];
};

export type File = {
  id: string;
  name: string;
  originalName: string;
  context: string;
  mimeType: string;
  size: number;
  path: string;
};

export type Gallery = {
  files: FileType[];
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
};

export type ActiveRequest = {
  "@id": string;
  id: number;
  parent: string;
  duplicates: string[];
  category: reviewCategoryEnum;
  status: StatusOrderType;
  type: reviewTypeEnum;
  description: string;
  addressData: AddressType;
  cancellationReason: string;
  answer: string;
  topicId: string;
  createdBy: CreatedBy;
  citizen: CitizenDTO;
  deadline: Date;
  createdAt: Date;
  gallery: Gallery;
  review: Review;
  space: SpaceDTO;
  completedAt: Date;
  isGroup: boolean;
  isChild: boolean;
  latestTaskDeadline: Date;
  responsible: string[];
};

export type RequestsTypeDTO = {
  "@id": string;
  id: number;
  status: StatusOrderType;
  type: reviewTypeEnum;
  category: reviewCategoryEnum;
  createdAt: Date;
  deadline?: string;
  description: string;
  citizen: string;
  isGroup: boolean;
  gallery: {
    ["@id"]: string;
    ["@type"]: string;
    files: Array<galleryFileTypeDTO>;
  };
  review?: ReviewTypeDTO;
  createdBy: string;
  cancellationReason?: string;
  answer?: string;
};

export type NewOrderDTO = {
  category: reviewCategoryEnum | null;
  description: string;
  files: Asset[];
  space: SpacesType | null;
};

export type GetRequestResponseDTO = GetResponseDTO<RequestsTypeDTO>;

export interface RequestsModel extends PaginationFlatListType {
  requestList: RequestsTypeDTO[] | null;
  setRequestList: Action<this, this["requestList"]>;
  getRequests: Thunk<this, { page: number }>;
  activeRequest: ActiveRequest | null;
  setAciveRequest: Action<this, this["activeRequest"]>;
  setTransitionList: Action<this, this["transitionList"]>;
  getActiveRequest: Thunk<this, { id: number }>;
  canceledActiveRequest: Thunk<this, { id: number }>;
  sendFeedback: Thunk<this, { rating: number; comment: string; iriId: string }>;
  createNewOrder: Thunk<this, { descriptionText: string }>;
  transitionList: string[];
  newOrder: NewOrderDTO;
  setNewOrderCategory: Action<this, this["newOrder"]["category"]>;
  setNewOrderDescription: Action<this, this["newOrder"]["description"]>;
  setNewOrderSpace: Action<this, this["newOrder"]["space"]>;
  setNewOrderGallery: Action<this, this["newOrder"]["files"]>;
  resetNewRequest: Action<this>;
  isOpenConfirmCloseModal: boolean;
  setIsOpenConfirmCloseModal: Action<this, this["isOpenConfirmCloseModal"]>;
  reset: Action<this>;
}
