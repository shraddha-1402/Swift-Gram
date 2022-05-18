import React from "react";
import { Button, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const UserAction = ({ screenSize }) => {
  return (
    <>
      {screenSize === "xs" ? (
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Button fullWidth variant="outlined" size="small" color="primary">
            Edit Profile
          </Button>
          <IconButton sx={{ marginLeft: "1rem" }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button variant="outlined" size="small" color="primary">
            Edit Profile
          </Button>
          <IconButton sx={{ marginLeft: "1rem" }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export { UserAction };
