import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProfileLineItem } from "./ProfileLineItem";
import { searchTextSelector, setFocusedProfile } from "./profileSlice";
import { useFetchProfilesQuery } from "../api/apiSlice";
import { useMemo } from "react";

const ProfileList = () => {
  const searchText = useSelector(searchTextSelector);
  const dispatch = useDispatch();
  const { data, isFetching, isSuccess } = useFetchProfilesQuery();

  // TODO: make this more robust
  const profiles = useMemo(() => {
    return data?.filter((profile) => profile.last_name.includes(searchText));
  }, [data, searchText]);

  function selectProfile(id: number) {
    const profile = profiles?.find((p) => p.id === id);
    dispatch(setFocusedProfile(profile));
  }

  console.log("profiles", profiles, isFetching, isSuccess);

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {profiles &&
        profiles.map((profile) => (
          <Card
            key={profile.id}
            onClick={() => selectProfile(profile.id)}
            sx={{ cursor: "pointer" }}
          >
            <ProfileLineItem profile={profile} canEdit />
          </Card>
        ))}
    </>
  );
};

export { ProfileList };
