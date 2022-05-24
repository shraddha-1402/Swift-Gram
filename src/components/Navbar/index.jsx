import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Typography, Avatar, Stack } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import { useDarkMode } from "../../context";
import { routes } from "../../constants";

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleDarkMode } = useDarkMode();
  const { user: authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <MuiAppBar
      position="fixed"
      variant="outlined"
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
    >
      <Typography variant="b" component="h1" noWrap>
        Swift Gram
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={toggleDarkMode}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Avatar
          src={authUser?.avatarURL}
          sx={{ display: { xs: "none", md: "block" }, cursor: "pointer" }}
          onClick={() => navigate(`${routes.PROFILE}/${authUser?.username}`)}
        />
      </Stack>
    </MuiAppBar>
  );
};

export { Navbar };
