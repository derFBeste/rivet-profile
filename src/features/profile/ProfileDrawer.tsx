import { useDispatch, useSelector } from "react-redux";
import { currentProfile, setActiveProfile } from "./profileSlice";
import { Drawer, Stack, TextField } from "@mui/material";
import { ProfileLineItem } from "./ProfileLineItem";

function ProfileDrawer() {
  const profile = useSelector(currentProfile);
  const dispatch = useDispatch();

  // TODO: make view and edit modes
  // TODO: make editable in store

  return (
    <Drawer
      anchor="right"
      open={!!profile}
      onClose={() => dispatch(setActiveProfile(null))}
    >
      {/* {DrawerList} */}
      {profile && <ProfileLineItem profile={profile} />}
      <Stack direction="column" spacing={1} style={{ margin: "1rem" }}>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={profile?.first_name}
        />
        <TextField id="filled-basic" label="First Name" variant="filled" />
        <TextField id="standard-basic" label="First Name" variant="standard" />
      </Stack>
    </Drawer>
  );
}

export default ProfileDrawer;
