import React from "react";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import { useDarkMode } from "../../context";

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleDarkMode } = useDarkMode();
  return (
    <MuiAppBar
      position="fixed"
      variant="outlined"
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
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={toggleDarkMode}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </MuiAppBar>
  );
};

export { Navbar };
