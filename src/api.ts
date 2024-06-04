import { NewProfile, Profile } from "./features/profile/profileUtils";

export async function fetchProfileApi(id: string): Promise<Profile> {
  return await fetch(`https://codechallenge.rivet.work/api/v1/profile/${id}`, {
    headers: {
      token: process.env.REACT_APP_API_TOKEN || "",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching profile", error);
    });
}

export async function fetchProfilesApi(): Promise<Profile[]> {
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

export async function addProfileApi(profile: NewProfile): Promise<Profile> {
  return await fetch("https://codechallenge.rivet.work/api/v1/profile", {
    headers: {
      token: process.env.REACT_APP_API_TOKEN || "",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(profile),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error adding profile", error);
    });
}

export async function updateProfileApi(profile: Profile): Promise<Profile> {
  return await fetch(
    `https://codechallenge.rivet.work/api/v1/profile/${profile.id}`,
    {
      headers: {
        token: process.env.REACT_APP_API_TOKEN || "",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(profile),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error updating profile", error);
    });
}
