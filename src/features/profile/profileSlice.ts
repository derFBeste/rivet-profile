import { createSlice } from "@reduxjs/toolkit";
import { ProfileState, makeFakeUserList } from "./profileUtils";
import { RootState } from "../../store";

const initialState = {
  profiles: [],
  inFocus: null,
  mode: "view",
  searchText: "",
} as ProfileState;

function returnFakeProfiles() {
  const profiles = makeFakeUserList();
  console.log("got some [fake] data", profiles);
  return profiles;
}

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setFocusedProfile: (state, action) => {
      state.inFocus = action.payload || null;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFocusedProfile, setMode, setSearchText } =
  profileSlice.actions;

export const countProfiles = (state: RootState) =>
  state.profile.profiles.length as number;
export const profileSelector = (state: RootState) => state.profile.inFocus;
export const modeSelector = (state: RootState) => state.profile.mode;
export const searchTextSelector = (state: RootState) =>
  state.profile.searchText;

export default profileSlice.reducer;
