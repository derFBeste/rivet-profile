import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileState, makeFakeUserList } from "./profileUtils";
import { RootState } from "../../store";
import { fetchProfile, fetchProfiles } from "../../api";

const initialState = {
  profiles: [],
  inFocus: null,
} as ProfileState;

function returnFakeProfiles() {
  const profiles = makeFakeUserList();
  console.log("got some [fake] data", profiles);
  return profiles;
}

export const fetchUser = createAsyncThunk("users/fetchUser", (id: string) => {
  return fetchProfile(id);
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return fetchProfiles();
});

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      const id = action.payload;
      const found = state.profiles.find((item) => item.id === id);
      state.inFocus = found || null;
      // state.settings.customTopics.topicsSortType.name = action.payload.name;
    },
  },
  extraReducers(builder) {
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     profiles: action.payload,
    //   };
    // });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload,
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setActiveProfile } = profileSlice.actions;
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) =>
  state.profile.profiles.length as number;
export const currentProfile = (state: RootState) => state.profile.inFocus;

export default profileSlice.reducer;
