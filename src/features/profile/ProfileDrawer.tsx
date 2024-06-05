import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Drawer,
  FormControlLabel,
  OutlinedTextFieldProps,
  Snackbar,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSelector,
  modeSelector,
  setFocusedProfile,
  setMode,
} from "./profileSlice";
import { ProfileLineItem } from "./ProfileLineItem";
import { Controller, useForm } from "react-hook-form";
import { defaultProfile } from "./profileUtils";
import { ChangeEvent, useEffect, useState } from "react";
import {
  api,
  useAddProfileMutation,
  useUpdateProfileMutation,
} from "../api/apiSlice";

// TODO: switch input types in edit mode

const profileSchema = z.object({
  first_name: z.string().min(1, { message: "Required" }).max(255),
  last_name: z.string().min(1, { message: "Required" }).max(255),
  email: z.string().email().max(255),
  phone: z.string().min(1, { message: "Required" }).max(255),
  address: z.string().min(1, { message: "Required" }).max(255),
  city: z.string().min(1, { message: "Required" }).max(255),
  state: z.string().min(1, { message: "Required" }).max(255),
  zip: z.string().length(5),
  photo: z.string().max(255).optional().nullish(),
  notes: z.string().optional().nullish(), // TODO: 4GB max
});

// This type ends up being the same as Profile.
type ProfileSchema = z.infer<typeof profileSchema>;

function ProfileDrawer() {
  const dispatch = useDispatch();
  const [updateProfile, updateResult] = useUpdateProfileMutation();
  const [addProfile, addResult] = useAddProfileMutation();
  const [showAlert, setShowAlert] = useState(false);

  const { refetch } = api.endpoints.fetchProfiles.useQuerySubscription();

  const mode = useSelector(modeSelector);
  const readOnly = mode === "view";
  const profile = useSelector(profileSelector);

  useEffect(() => {
    if (updateResult.isSuccess || addResult.isSuccess) {
      setShowAlert(true);
      refetch();
    }
  }, [updateResult.isSuccess || addResult.isSuccess, refetch]);

  const { handleSubmit, reset, control } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    values: mode === "add" || profile === null ? defaultProfile : profile,
  });

  function onClose() {
    dispatch(setFocusedProfile(null));
    dispatch(setMode("view"));
    reset(defaultProfile);
    setShowAlert(false);
  }

  function onSubmit(data: ProfileSchema) {
    if (mode === "add") {
      addProfile(data);
    } else {
      profile && updateProfile({ ...data, id: profile.id });
    }
  }

  function onToggleEdit(_: ChangeEvent<HTMLInputElement>, checked: boolean) {
    dispatch(setMode(checked ? "edit" : "view"));
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={!!profile || mode === "add"}
        onClose={onClose}
      >
        <Stack direction="row" justifyContent="space-between">
          <ProfileLineItem profile={profile || defaultProfile} />
          {mode !== "add" && (
            <FormControlLabel
              control={
                <Switch checked={mode === "edit"} onChange={onToggleEdit} />
              }
              label="Edit"
            />
          )}
        </Stack>
        <Stack direction="column" gap={2} margin="1rem">
          <Stack direction="row" gap={1}>
            <TextInput
              id="first_name"
              label="First Name"
              variant="outlined"
              readOnly={readOnly}
              control={control}
              required={!readOnly}
              fullWidth
            />
            <TextInput
              id="last_name"
              label="Last Name"
              variant="outlined"
              readOnly={readOnly}
              control={control}
              required={!readOnly}
              fullWidth
            />
          </Stack>
          <Stack direction="row" useFlexGap gap={1}>
            <TextInput
              id="email"
              label="Email"
              variant="outlined"
              readOnly={readOnly}
              control={control}
              required={!readOnly}
              fullWidth
            />
            <TextInput
              id="phone"
              label="Phone"
              variant="outlined"
              readOnly={readOnly}
              control={control}
              required={!readOnly}
              fullWidth
            />
          </Stack>
          <TextInput
            id="address"
            label="Address"
            variant="outlined"
            control={control}
            required={!readOnly}
            readOnly={readOnly}
          />
          <Stack direction="row" gap={1}>
            <TextInput
              id="city"
              label="City"
              variant="outlined"
              control={control}
              required={!readOnly}
              readOnly={readOnly}
            />
            <TextInput
              id="state"
              label="State"
              variant="outlined"
              control={control}
              required={!readOnly}
              readOnly={readOnly}
            />
            <TextInput
              id="zip"
              label="Zip"
              variant="outlined"
              control={control}
              required={!readOnly}
              readOnly={readOnly}
            />
          </Stack>
          <TextInput
            id="photo"
            label="Photo URL"
            variant="outlined"
            control={control}
            readOnly={readOnly}
          />
          <TextInput
            id="notes"
            label="Notes"
            variant="outlined"
            control={control}
            readOnly={readOnly}
            minRows={3}
            multiline
          />
          <Stack direction="row" gap={1} justifyContent="end">
            {mode !== "view" && (
              <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                {mode === "add" ? "Add Profile" : "Update Profile"}
              </Button>
            )}
            <Button onClick={onClose} variant={"outlined"}>
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
          </Stack>
        </Stack>
      </Drawer>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={onClose}
        message="Profile updated."
      >
        <Alert severity="success">
          Profile {updateResult.isSuccess ? "updated" : "created"}.
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProfileDrawer;

interface TextInputProps extends OutlinedTextFieldProps {
  id: string;
  readOnly: boolean;
  control: any;
}

// wraps TextField in a Controller for use with react-hook-form
function TextInput(props: TextInputProps) {
  return (
    <Controller
      control={props.control}
      name={props.id}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          value={value}
          onChange={onChange}
          helperText={error ? error.message : null}
          error={!!error}
          inputProps={{
            readOnly: props.readOnly,
          }}
          sx={{ pointerEvents: props.readOnly ? "none" : "initial" }}
        />
      )}
    />
  );
}
