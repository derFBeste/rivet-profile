import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewProfile, Profile } from "../profile/profileUtils";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://codechallenge.rivet.work/api/v1/",
  }),
  endpoints: (build) => ({
    fetchProfiles: build.query<Profile[], void>({
      query: () => ({
        url: "profiles",
        headers: {
          token: process.env.REACT_APP_API_TOKEN || "",
        },
      }),
    }),
    fetchProfile: build.query<Profile, string>({
      query: (id: string) => ({
        url: `profile/${id}`,
        headers: {
          token: process.env.REACT_APP_API_TOKEN || "",
        },
      }),
    }),
    addProfile: build.mutation<Profile, NewProfile>({
      query: (profile) => ({
        url: "profile",
        method: "POST",
        headers: {
          token: process.env.REACT_APP_API_TOKEN || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }),
    }),
    updateProfile: build.mutation<Profile, Profile>({
      query: (profile) => ({
        url: `profile/${profile.id}`,
        method: "PUT",
        headers: {
          token: process.env.REACT_APP_API_TOKEN || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }),
    }),
  }),
});

export const {
  useAddProfileMutation,
  useFetchProfileQuery,
  useFetchProfilesQuery,
  useUpdateProfileMutation,
} = api;
