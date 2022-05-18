import React from "react";
import { Paper, Stack, Avatar, Typography } from "@mui/material";
import { UserAction } from "./UserAction";

const UserInfoCard = () => {
  const numberTypo = {
    fontWeight: "bold",
  };
  const textTypo = {
    lineHeight: "0.9em",
    fontSize: { xs: "0.8em", sm: "1em" },
  };
  const bioStyle = {
    fontSize: "0.9em",
    lineHeight: "1em",
    margin: "0.25rem 0 ",
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "0.25rem",
        maxWidth: "35rem",
        margin: "1rem auto",
        padding: "1rem",
      }}
    >
      <Stack direction="row" alignItems="center" width="100%">
        <Avatar
          sx={{
            width: { xs: "5rem", sm: "6rem" },
            height: { xs: "5rem", sm: "6rem" },
          }}
        />
        <Stack
          sx={{
            width: `calc(100% - 5rem)`,
            padding: "0.5rem",
            paddingLeft: "1rem",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            sx={{ marginBottom: { xs: "0.25rem", sm: "0.5rem" } }}
          >
            <Typography noWrap sx={{ fontSize: "1em", fontWeight: "bold" }}>
              @username
            </Typography>
            <UserAction screenSize={"sm"} />
          </Stack>
          <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
            <Stack alignItems="center" sx={{ cursor: "pointer" }}>
              <Typography sx={{ ...numberTypo }}>2</Typography>
              <Typography sx={{ ...textTypo }}>Posts</Typography>
            </Stack>
            <Stack alignItems="center" sx={{ cursor: "pointer" }}>
              <Typography sx={{ ...numberTypo }}>10</Typography>
              <Typography sx={{ ...textTypo }}>Followers</Typography>
            </Stack>
            <Stack alignItems="center" sx={{ cursor: "pointer" }}>
              <Typography sx={{ ...numberTypo }}>15</Typography>
              <Typography sx={{ ...textTypo }}>Following</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Typography noWrap sx={{ fontWeight: "bold", margin: "0.5rem 0" }}>
        Name Surname
      </Typography>
      <Typography sx={{ ...bioStyle }}>
        This is my bio, I am an aspiring full stack developer
      </Typography>
      <Typography sx={{ ...bioStyle }}>
        <a target="_blank" href="https://google.com">
          https://netlify.app
        </a>
      </Typography>
      <UserAction screenSize={"xs"} />
    </Paper>
  );
};

export { UserInfoCard };
