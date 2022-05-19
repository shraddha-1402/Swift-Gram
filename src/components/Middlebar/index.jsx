import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stack, Box, Paper, Avatar, Typography, Button } from "@mui/material";
import { routes } from "../../constants";

const Middlebar = () => {
  const { users } = useSelector((store) => store.users);
  const { user: authUser } = useSelector((store) => store.auth);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSuggestedUsers(
      users.filter((user) => user.username !== authUser.username)
    );
  }, [users, authUser.username]);
  return (
    <Stack
      direction="row"
      spacing={2}
      overflow="auto"
      sx={{
        display: { xs: "flex", md: "none" },
        maxWidth: "35rem",
        margin: "2rem auto",
        padding: "0.5rem",
      }}
    >
      {suggestedUsers.map(
        ({ _id, username, firstName, lastName, avatarURL }) => (
          <Paper
            key={_id}
            elevation={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10rem",
              minWidth: "8rem",
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`${routes.PROFILE}/${username}`)}
              >
                <Avatar
                  sx={{ width: "3.5rem", height: "3.5rem", margin: "0 auto" }}
                  src={avatarURL}
                />
                <Typography
                  sx={{
                    width: "6.5rem",
                    textAlign: "center",
                  }}
                  noWrap
                >
                  {firstName} {lastName}
                </Typography>
              </Box>

              <Button size="small" variant="outlined">
                Follow
              </Button>
            </Stack>
          </Paper>
        )
      )}
    </Stack>
  );
};

export { Middlebar };
