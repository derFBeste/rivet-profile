import { ProfileList } from "./features/profile/ProfileList";
import { Button, Stack } from "@mui/material";
import ProfileDrawer from "./features/profile/ProfileDrawer";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useDispatch } from "react-redux";
import { setMode } from "./features/profile/profileSlice";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Rivet</h1>
      </header>
      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          startIcon={<PersonAddAltOutlinedIcon />}
          onClick={() => dispatch(setMode("add"))}
          size="large"
        >
          Add Profile
        </Button>
      </Stack>
      <ProfileList></ProfileList>
      <ProfileDrawer />
    </div>
  );
}

export default App;
