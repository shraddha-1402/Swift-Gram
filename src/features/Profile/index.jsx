import React from "react";
import { Box } from "@mui/material";
import { UserInfoCard } from "./components/UserInfoCard";

const ProfilePage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      <UserInfoCard />
    </Box>
  );
};

export { ProfilePage };
