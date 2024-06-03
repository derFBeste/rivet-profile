import { ProfileList } from "./features/profile/ProfileList";
import { Box } from "@mui/material";
import ProfileDrawer from "./features/profile/ProfileDrawer";

function App() {
  function handleClickAdd() {
    alert("Should add another profile!");
  }

  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: "center" }}>
        <Box>
          <Box
            sx={{
              boxSizing: "border-box",
              width: "32em",
              padding: ".5em",
              margin: "0 auto",
              maxWidth: "100%",
              position: "absolute",
              left: 0,
              right: 0,
            }}
          >
            <Box
              sx={{
                border: "1px solid gray",
                backgroundColor: "white",
                padding: ".5em",
                width: "1em",
                height: "1em",
                float: "right",
                borderRadius: "4px",
                cursor: "pointer",
                lineHeight: "1.2em",
              }}
              onClick={() => handleClickAdd()}
            >
              ➕
            </Box>
          </Box>
          <h1>Welcome to Rivet</h1>
        </Box>
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

const pageSection = {
  boxSizing: "border-box",
  width: "32em",
  padding: ".5em",
  margin: "0 auto",
  maxWidth: "100%",
  position: "absolute",
  left: 0,
  right: 0,
};

// TODO: get rid of this and the plus sign it's using, use MUI icon instead
const profileBox = {
  border: "1px solid gray",
  backgroundColor: "white",
  padding: ".5em",
  width: "1em",
  height: "1em",
  float: "right",
  borderRadius: "4px",
  cursor: "pointer",
  lineHeight: "1.2em",
};
