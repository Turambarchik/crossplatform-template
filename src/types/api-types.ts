export interface GetResponseDTO<Type> {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": Type[];
  "hydra:totalItems": number;
  "hydra:view": { "@id": string; "@type": string };
}

export enum NotificationType {
  announce = "announce",
  order = "order",
  new_citizen = "new_citizen",
  task = "task",
  review = "review",
}

export enum StatusOrderType {
  new = "new",
  consideration = "consideration",
  in_progress = "in_progress",
  completed = "completed",
  canceled = "canceled",
}

export enum reviewTypeEnum {
  client_problem = "client_problem",
  client_complaint = "client_complaint",
  client_service = "client_service",
  client_offer = "client_offer",
  client_question = "client_question",
  staff_task = "staff_task",
}

export enum reviewCategoryEnum {
  cleaning = "cleaning",
  water_supply = "water_supply",
  elevator = "elevator",
  heating = "heating",
  ventilation = "ventilation",
  fire_protection_system = "fire_protection_system",
  electricity = "electricity",
  sewerage = "sewerage",
  repairs = "repairs",
  intercom_and_video = "intercom_and_video",
  adjacent_territory = "adjacent_territory",
  protection = "protection",
  financial_issues = "financial_issues",
  client_service = "client_service",
  other = "other",
}

export type FileType = {
  "@id": string;
  "@type": string;
  context: string;
  id: string;
  mimeType: string;
  name: string;
  originalName: string;
  path: string;
  size: number;
  uri: string;
};

export enum TransitionsEnum {
  consider = "consider",
  process = "process",
  complete = "complete",
  cancel = "cancel",
  citizen_cancel = "citizen_cancel",
  reopen = "reopen",
}

export enum ApartmentEnum {
  Apartment = "Apartment",
}

export enum TypePremises {
  Apartment = "Apartment",
  Commercial = "Commercial",
}

export enum RoleType {
  Citizen = "ROLE_CITIZEN",
  Admin = "ROLE_SUPER_ADMIN",
}

export type UserDetailsType = {
  ["@id"]: string;
  ["@type"]: string;
  firstName: string;
  name: string;
  id: string;
  lastName: string;
  patronymic: string;
  phone: string;
  role: string;
  spaces: SpacesType[];
  verified: boolean;
};

export type ApartmentType = {
  ["@context"]: string;
  ["@id"]: string;
  ["@type"]: string;
  account: string;
  address: AddressType;
  citizens: UserDetailsType[];
  conciergeNumber: string;
  floor: number;
  id: string;
  number: number;
  owner: UserDetailsType;
};

export type AddressType = {
  apartment: number;
  city: string;
  complex: string;
  floor: number;
  house: string;
  section: string;
  street: string;
};

export type SpacesType = {
  ["@id"]: string;
  ["@type"]: ApartmentEnum;
  account: string;
  address: AddressType;
  citizens: UserDetailsType[];
  complex: string;
  conciergeNumber?: string;
  floor: number;
  house: string;
  id: string;
  inBlackList: string | null;
  isOwner: boolean;
  number: number;
  owner: string;
  section: string;
  name?: string;
};
