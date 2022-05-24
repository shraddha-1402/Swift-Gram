import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Box, Paper, Avatar, Typography, Button } from "@mui/material";
import { followUser, stopLoading } from "../../features";
import { routes } from "../../constants";

const Middlebar = () => {
  const dispatch = useDispatch();
  const { users, isUserContentLoading } = useSelector((store) => store.users);
  const { user: authUser, token } = useSelector((store) => store.auth);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSuggestedUsers(
      users.filter(
        (currUser) =>
          !authUser.following.find(
            (innerCurrUser) => innerCurrUser._id === currUser._id
          ) && currUser.username !== authUser.username
      )
    );
  }, [users, authUser]);

  useEffect(() => {
    (async () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      await promise.then(() => dispatch(stopLoading()));
    })();
  }, [suggestedUsers]);

  const handleFollowUser = (followUserId) => {
    dispatch(followUser({ followUserId, token, dispatch }));
  };

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

              <Button
                onClick={() => handleFollowUser(_id)}
                disabled={isUserContentLoading}
                sx={{ textTransform: "none" }}
                size="small"
                variant="outlined"
              >
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
