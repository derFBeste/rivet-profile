import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProfileLineItem } from "./ProfileLineItem";
import { profileList, setActiveProfile } from "./profileSlice";

const ProfileList = () => {
  const profiles = useSelector(profileList);
  const dispatch = useDispatch();

  return (
    <Stack
      gap={1}
      textAlign="left"
      width="32em"
      boxSizing="border-box"
      padding=".5em"
      margin="0 auto"
      maxWidth="100%"
    >
      {profiles.length > 0 &&
        profiles.map((profile) => (
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, .1)",
              cursor: "pointer",
            }}
            key={profile.id}
            onClick={() => dispatch(setActiveProfile(profile.id))}
          >
            <ProfileLineItem profile={profile} canEdit />
          </Box>
        ))}
    </Stack>
  );
};

export { ProfileList };
