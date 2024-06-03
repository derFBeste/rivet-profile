import { useDispatch, useSelector } from "react-redux";
import {
  currentProfile,
  readOnly,
  setActiveProfile,
  setMode,
} from "./profileSlice";
import {
  Drawer,
  OutlinedTextFieldProps,
  Stack,
  TextField,
} from "@mui/material";
import { ProfileLineItem } from "./ProfileLineItem";
import { useState } from "react";

function ProfileDrawer() {
  const dispatch = useDispatch();
  const isReadOnly = useSelector(readOnly);
  const profile = useSelector(currentProfile);

  const [transientProfile, setTransientProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    // photo: "",
    // notes: "",
  });

  // TODO: use FormControl
  // TODO: submit button, warning if unsaved changes

  function handleClose() {
    dispatch(setActiveProfile(null));
    dispatch(setMode("view"));
  }

  return (
    <Drawer
      anchor="right"
      open={!!profile || !isReadOnly}
      onClose={handleClose}
    >
      <ProfileLineItem profile={profile || transientProfile} />

      <Stack direction="column" spacing={2} margin="1rem">
        <Stack direction="row" spacing={1}>
          <TextInput
            id="first-name"
            label="First Name"
            variant="outlined"
            value={profile?.first_name}
            readOnly={isReadOnly}
            required
            fullWidth
          />
          <TextInput
            id="last-name"
            label="Last Name"
            variant="outlined"
            value={profile?.last_name}
            readOnly={isReadOnly}
            required
            fullWidth
          />
        </Stack>
        <Stack direction="row" useFlexGap spacing={1}>
          <TextInput
            id="email"
            label="Email"
            variant="outlined"
            value={profile?.email}
            readOnly={isReadOnly}
            required
            fullWidth
          />
          <TextInput
            id="phone"
            label="Phone"
            variant="outlined"
            value={profile?.phone}
            readOnly={isReadOnly}
            required
            fullWidth
          />
        </Stack>
        <TextInput
          id="address"
          label="Address"
          variant="outlined"
          value={profile?.address}
          required
          readOnly={isReadOnly}
        />
        <Stack direction="row" spacing={1}>
          <TextInput
            id="city"
            label="City"
            variant="outlined"
            value={profile?.city}
            required
            readOnly={isReadOnly}
          />
          <TextInput
            id="state"
            label="State"
            variant="outlined"
            value={profile?.state}
            required
            readOnly={isReadOnly}
          />
          <TextInput
            id="zip"
            label="Zip"
            variant="outlined"
            value={profile?.zip}
            required
            readOnly={isReadOnly}
          />
        </Stack>
        <TextInput
          id="photo"
          label="Photo"
          variant="outlined"
          readOnly={isReadOnly}
          value={profile?.photo}
        />
        <TextInput
          id="notes"
          label="Notes"
          variant="outlined"
          value={profile?.notes}
          readOnly={isReadOnly}
          minRows={3}
          multiline
        />
      </Stack>
    </Drawer>
  );
}

export default ProfileDrawer;

interface TextInputProps extends OutlinedTextFieldProps {
  readOnly: boolean;
}

function TextInput(props: TextInputProps) {
  return (
    <TextField
      {...props}
      inputProps={{
        readOnly: props.readOnly,
      }}
      sx={{ pointerEvents: props.readOnly ? "none" : "initial" }}
    />
  );
}
