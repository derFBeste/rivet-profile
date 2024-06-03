import { Profile } from "./features/profile/profileUtils";

// TODO: type responses
// TODO: handle errors, clean up

export async function fetchProfile(id: string): Promise<Profile> {
  // TODO: cleanup, change to profile
  return await fetch(`https://codechallenge.rivet.work/api/v1/profile/${id}`, {
    headers: {
      token: process.env.REACT_APP_API_TOKEN || "",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // do something with the data
      return data;
    })
    .catch((error) => {
      console.error("Error fetching profile", error);
    });

  // if (isArray(profiles)) {
  //   return profiles;
  // }
  // return [profiles];
}

export async function fetchProfiles(): Promise<Profile[]> {
  return await fetch("https://codechallenge.rivet.work/api/v1/profiles", {
    headers: {
      token: process.env.REACT_APP_API_TOKEN || "",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching profiles", error);
    });
}

export async function updateProfile() {}

export async function createProfile() {}
