import "./App.css";
import { Outlet } from "react-router-dom";
import { Box, Stack, CssBaseline, Toolbar } from "@mui/material";
import { Bottombar, LeftSidebar, RightSidebar, Navbar } from "./components";

function App() {
  return (
    <Box className="App">
      <Navbar />
      <CssBaseline />
      <Stack flexDirection="row" justifyContent="space-between">
        <LeftSidebar />
        <Box sx={{ width: { xs: "100%", md: `calc(100% - 480px)` } }}>
          <Toolbar />
          <Outlet />
        </Box>
        <RightSidebar />
      </Stack>
      <Bottombar />
    </Box>
  );
}

export default App;
