import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Box, Stack, CssBaseline, Toolbar } from "@mui/material";
import { getAllUsers } from "./features";
import { Bottombar, LeftSidebar, RightSidebar, Navbar } from "./components";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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
