import axios from "axios";
import { action, thunk } from "easy-peasy";
import type { ApartmentType } from "types";

import { filteredFromActionsModel } from "helpers/functions";

import type { ProfileModel, ProfileType } from "./profile.store.types";

const profileModel: ProfileModel = {
  userProfile: null,

  setUserProfile: action((state, payload) => {
    state.userProfile = payload;
  }),
  apartmentDetails: null,
  setApartmentDetails: action((state, payload) => {
    state.apartmentDetails = payload;
  }),
  getUserProfile: thunk(async (actions) => {
    try {
      const { data: userData } = await axios.get<ProfileType>("users/me");

      actions.setUserProfile(userData);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getUserProfile");
    }
  }),
  getApartmentDetails: thunk(async (actions, payload) => {
    try {
      const { data } = await axios.get<ApartmentType>(
        `apartments/${payload.id}`,
        {
          headers: { "content-type": "application/ld+json" },
        }
      );
      actions.setApartmentDetails(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting getApartmentDetails");
    }
  }),
  createSpaceBlacklist: thunk(async (actions, payload, { getStoreState }) => {
    try {
      await axios.post(
        "space-blacklists",
        {
          user: payload.userIri,
          space: payload.spaceIri,
        },
        {
          headers: { "content-type": "application/ld+json" },
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting createSpaceBlacklist");
    }
  }),
  deleteSpaceBlacklist: thunk(async (actions, payload) => {
    try {
      await axios.delete(`space-blacklists/${payload.spaceBlacklistId}`, {
        headers: { "content-type": "application/ld+json" },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
      } else {
        console.warn("Not Axios Error");
      }
      throw new Error("Aborting deleteSpaceBlacklist");
    }
  }),
  reset: action((state) => {
    const filteredProfileModel = filteredFromActionsModel(profileModel);
    Object.assign(state, filteredProfileModel);
  }),
};

export default profileModel;
