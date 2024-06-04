import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  FormControlLabel,
  OutlinedTextFieldProps,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSelector,
  modeSelector,
  setActiveProfile,
  setMode,
  updateProfile,
  addProfile,
} from "./profileSlice";
import { ProfileLineItem } from "./ProfileLineItem";
import { Controller, useForm } from "react-hook-form";
import { defaultProfile } from "./profileUtils";
import store from "../../store";
import { ChangeEvent } from "react";

// TODO: grey about button until dirty
// TODO: switch input types in edit mode
// TODO: validate onupdate/focus off
// TODO: try card

const profileSchema = z.object({
  first_name: z.string().min(1, { message: "Required" }).max(255),
  last_name: z.string().min(1, { message: "Required" }).max(255),
  email: z.string().email().max(255),
  phone: z.string().min(1, { message: "Required" }).max(255),
  address: z.string().min(1, { message: "Required" }).max(255),
  city: z.string().min(1, { message: "Required" }).max(255),
  state: z.string().min(1, { message: "Required" }).max(255),
  zip: z.string().min(1, { message: "Required" }).max(255),
  photo: z.string().max(255).optional(),
  notes: z.string().optional(),
});

// This type ends up being the same as Profile.
type ProfileSchema = z.infer<typeof profileSchema>;

function ProfileDrawer() {
  const dispatch = useDispatch();
  const mode = useSelector(modeSelector);
  const readOnly = mode === "view";
  const profile = useSelector(profileSelector);

  const { handleSubmit, reset, control } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    values: mode === "add" || profile === null ? defaultProfile : profile,
  });

  function onClose() {
    dispatch(setActiveProfile(null));
    dispatch(setMode("view"));
    reset(defaultProfile);
  }

  function onSubmit(data: ProfileSchema) {
    console.log("submitting", data);
    if (mode === "add") {
      store.dispatch(addProfile(data));
    } else {
      profile && store.dispatch(updateProfile({ ...data, id: profile.id }));
    }

    // TODO: on success: update the profile list, show toast

    // store.dispatch(addProfile(data));
    // store.dispatch(updateProfile(data));
    // dispatch(setActiveProfile(data));
    // dispatch(setMode("view"));
  }

  function onToggleEdit(_: ChangeEvent<HTMLInputElement>, checked: boolean) {
    dispatch(setMode(checked ? "edit" : "view"));
  }

  return (
    <Drawer anchor="right" open={!!profile || mode === "add"} onClose={onClose}>
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
            required
            fullWidth
          />
          <TextInput
            id="last_name"
            label="Last Name"
            variant="outlined"
            readOnly={readOnly}
            control={control}
            required
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
            required
            fullWidth
          />
          <TextInput
            id="phone"
            label="Phone"
            variant="outlined"
            readOnly={readOnly}
            control={control}
            required
            fullWidth
          />
        </Stack>
        <TextInput
          id="address"
          label="Address"
          variant="outlined"
          control={control}
          required
          readOnly={readOnly}
        />
        <Stack direction="row" gap={1}>
          <TextInput
            id="city"
            label="City"
            variant="outlined"
            control={control}
            required
            readOnly={readOnly}
          />
          <TextInput
            id="state"
            label="State"
            variant="outlined"
            control={control}
            required
            readOnly={readOnly}
          />
          <TextInput
            id="zip"
            label="Zip"
            variant="outlined"
            control={control}
            required
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
