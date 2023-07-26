import type { Action, Thunk } from "easy-peasy";
import type { ApartmentType, SpacesType } from "types";

export interface ProfileModel {
  userProfile: ProfileType | null;
  setUserProfile: Action<this, this["userProfile"]>;
  getUserProfile: Thunk<this>;
  apartmentDetails: ApartmentType | null;
  setApartmentDetails: Action<this, this["apartmentDetails"]>;
  getApartmentDetails: Thunk<
    this,
    {
      id: string;
    }
  >;
  createSpaceBlacklist: Thunk<
    this,
    {
      userIri: string;
      spaceIri: string;
    }
  >;
  deleteSpaceBlacklist: Thunk<
    this,
    {
      spaceBlacklistId: string;
    }
  >;
  reset: Action<this>;
}

type ConciergeType = {
  apartment: number;
  city: string;
  complex: string;
  concierge: string;
  floor: number;
  house: string;
  section: string;
  street: string;
};

export type ProfileType = {
  ["@context"]: string;
  ["@id"]: string;
  ["@type"]: string;
  firstName: string;
  id: string;
  lastName: string;
  patronymic: string;
  name: string;
  phone: string;
  role: string;
  onboarding: boolean;
  concierges: ConciergeType;
  allSpaces: SpacesType[];
  spaces: SpacesType[];
  verified: boolean;
};
