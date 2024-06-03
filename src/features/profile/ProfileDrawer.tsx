import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  OutlinedTextFieldProps,
  Stack,
  TextField,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSelector,
  modeSelector,
  setActiveProfile,
  setMode,
} from "./profileSlice";
import { ProfileLineItem } from "./ProfileLineItem";
import { Controller, useForm } from "react-hook-form";
import { defaultProfile } from "./profileUtils";

// TODO: add validation
// TODO: add edit toggle

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
    // reset(defaultProfile);
  }

  function onSubmit(data: ProfileSchema) {
    console.log("submitting", data);
    // dispatch(setActiveProfile(data));
    // dispatch(setMode("view"));
  }

  return (
    <Drawer anchor="right" open={!!profile || mode === "add"} onClose={onClose}>
      <ProfileLineItem profile={profile || defaultProfile} />
      <Stack direction="column" spacing={2} margin="1rem">
        <Stack direction="row" spacing={1}>
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
        <Stack direction="row" useFlexGap spacing={1}>
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
        <Stack direction="row" spacing={1}>
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
      </Stack>
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset(defaultProfile)} variant={"outlined"}>
        Reset
      </Button>
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
          // {...field}
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
