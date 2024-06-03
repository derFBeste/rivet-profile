import { ProfileList } from "./features/profile/ProfileList";
import { Box, Button, Stack } from "@mui/material";
import ProfileDrawer from "./features/profile/ProfileDrawer";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector, setMode } from "./features/profile/profileSlice";

function App() {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  function handleClickAdd() {
    alert("Should add another profile!");
  }

  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: "center" }}>
        <h1>Welcome to Rivet</h1>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            startIcon={<PersonAddAltOutlinedIcon />}
            onClick={() => dispatch(setMode("add"))}
            size="large"
          >
            Add New Profile
          </Button>
          {/* <Button
            variant="outlined"
            startIcon={<PersonAddAltOutlinedIcon />}
            onClick={handleClickAdd}
          >
            Add New Profile
          </Button> */}
        </Stack>
        <Box
          sx={{
            width: "32em",
            boxSizing: "border-box",
            padding: ".5em",
            margin: "0 auto",
            maxWidth: "100%",
          }}
        >
          <ProfileList></ProfileList>
        </Box>
        <ProfileDrawer />
      </header>
    </div>
  );
}

export default App;
