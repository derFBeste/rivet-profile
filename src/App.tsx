import { ProfileList } from "./features/profile/ProfileList";
import { Box, Button, Stack } from "@mui/material";
import ProfileDrawer from "./features/profile/ProfileDrawer";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useDispatch } from "react-redux";
import { setMode, setSearchText } from "./features/profile/profileSlice";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <Box borderBottom="1px solid black" p={1} mb={2}>
          <h1 style={{ margin: 0 }}>Welcome to Rivet</h1>
        </Box>
      </header>
      <Stack direction="row" gap={1} justifyContent="center">
        <SearchBar onSearch={(text) => dispatch(setSearchText(text))} />
        <Button
          variant="contained"
          startIcon={<PersonAddAltOutlinedIcon />}
          onClick={() => dispatch(setMode("add"))}
        >
          Add Profile
        </Button>
      </Stack>
      <ProfileList></ProfileList>
      <ProfileDrawer />
    </>
  );
}

export default App;
