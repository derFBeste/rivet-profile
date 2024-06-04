import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  NewProfile,
  Profile,
  ProfileState,
  makeFakeUserList,
} from "./profileUtils";
import { RootState } from "../../store";
import {
  addProfileApi,
  fetchProfileApi,
  fetchProfilesApi,
  updateProfileApi,
} from "../../api";
import { set } from "lodash";

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

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    return fetchProfilesApi();
  }
);

export const fetchProfile = createAsyncThunk(
  "profiles/fetchProfile",
  async (id: string) => {
    return fetchProfileApi(id);
  }
);

export const addProfile = createAsyncThunk(
  "profiles/addProfile",
  async (profile: NewProfile) => {
    return addProfileApi(profile);
  }
);

export const updateProfile = createAsyncThunk(
  "profiles/updateProfile",
  async (profile: Profile) => {
    return updateProfileApi(profile);
  }
);

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      const id = action.payload;
      if (id !== state.inFocus?.id) {
        const found = state.profiles.find((item) => item.id === id);
        state.inFocus = found || null;
      }

      // state.settings.customTopics.topicsSortType.name = action.payload.name;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload,
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setActiveProfile, setMode, setSearchText } =
  profileSlice.actions;
export const profileList = (state: RootState) => {
  if (state.profile.searchText) {
    return state.profile.profiles.filter((profile) =>
      profile.last_name.includes(state.profile.searchText)
    );
  }

  return state.profile.profiles;
};
export const countProfiles = (state: RootState) =>
  state.profile.profiles.length as number;
export const profileSelector = (state: RootState) => state.profile.inFocus;
export const modeSelector = (state: RootState) => state.profile.mode;

export default profileSlice.reducer;
