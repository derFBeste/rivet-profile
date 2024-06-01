import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProfileState, makeFakeUserList } from './profileUtils'
import { RootState } from '../../store';
import { isArray } from 'lodash'

const initialState = {
  profiles: [],
  inFocus: null
} as ProfileState;

function returnFakeProfiles() {
  const profiles = makeFakeUserList();
  console.log('got some [fake] data', profiles);
  return profiles;
}

async function returnNetworkProfiles() {
  const profiles = await fetch("https://codechallenge.rivet.work/api/v1/profile/1", {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || ''
    }
  })
  .then((response) => response.json())
  .then((data) => {
    // do something with the data
    return data;
  })

  console.log('got some data', profiles);
  if (isArray(profiles)) {
    return profiles;
  }
  return [profiles]
}


export const fetchProfiles = createAsyncThunk('users/fetchUsers', () => {
  // return returnFakeProfiles();
  return returnNetworkProfiles();
})

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      const id = action.payload;
      console.log('should set active profile ID', action.payload);
      
      const found = state.profiles.find((item)=>item.id==id);
      state.inFocus = found || null;
      // state.settings.customTopics.topicsSortType.name = action.payload.name;   
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload
      }
    })
  }
})

// Action creators are generated for each case reducer function
export const { setActiveProfile } = profileSlice.actions
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) => state.profile.profiles.length as number;
export const currentProfile = (state: RootState) => state.profile.inFocus;

export default profileSlice.reducer