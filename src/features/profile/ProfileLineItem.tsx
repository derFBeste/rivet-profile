import { Box, Stack } from "@mui/material";
import { Profile } from "./profileUtils";

type ProfileLineItemArgs = {
  profile: Profile;
}

const ProfileLineItem = ({
  profile
}: ProfileLineItemArgs) => {

  const hasPhoto = !!profile.photo;
  const spectrum = 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)';

  return (
    <Stack direction={'row'} spacing={1}>
      { hasPhoto && (
        <Box sx={{
          width: '5em', 
          height: '5em', 
          backgroundImage: `url("${profile.photo}")`,
          backgroundSize: 'cover',
        }} />
      )}
      { !hasPhoto && (
        <Box sx={{
          width: '5em', 
          height: '5em', 
          background: spectrum,
          }}>
          
        </Box>
      )}
      <Stack spacing={1} style={{padding: '.5em' }}>
        <Box>
          <h3 style={{margin: 0}}>{profile.first_name} {profile.last_name}</h3>
        </Box>
        <Box>{profile.email} - {profile.phone} </Box>
      </Stack>
    </Stack>
  )
}

export { ProfileLineItem }