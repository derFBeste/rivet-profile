import { Avatar, Box, IconButton, Stack } from "@mui/material";
import { NewProfile, Profile } from "./profileUtils";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setMode } from "./profileSlice";

type ProfileLineItemArgs = {
  profile: Profile | NewProfile;
  canEdit?: boolean;
};

const spectrum =
  "linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)";

const ProfileLineItem = ({ canEdit, profile }: ProfileLineItemArgs) => {
  const hasPhoto = profile.photo?.startsWith("http");
  const dispatch = useDispatch();

  return (
    <Stack direction="row" spacing={1} margin={1}>
      <div>
        {hasPhoto && (
          <Avatar
            alt={profile.first_name + " " + profile.last_name}
            src={profile.photo!}
            sx={{ width: "5rem", height: "5rem" }}
          />
        )}
        {!hasPhoto && (
          <Avatar
            alt={profile.first_name + " " + profile.last_name}
            src={profile.photo!}
            sx={{ width: "5rem", height: "5rem", background: spectrum }}
          >
            {profile.first_name.charAt(0).toLocaleUpperCase() +
              profile.last_name.charAt(0).toLocaleUpperCase()}
          </Avatar>
        )}
      </div>
      <Stack
        direction="column"
        width="100%"
        justifyContent="space-evenly"
        ml=".5rem"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h3 style={{ margin: 0 }}>
            {profile.first_name} {profile.last_name}
          </h3>
          {canEdit && (
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => dispatch(setMode("edit"))}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
        <div>
          <Box>{profile.email}</Box>
          <Box mt={0.5}>{profile.phone}</Box>
        </div>
      </Stack>
    </Stack>
  );
};

export { ProfileLineItem };
