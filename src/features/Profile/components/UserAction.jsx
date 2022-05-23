import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOutUser } from "../../";
import { EditProfileModal } from "./EditProfileModal";
import { unfollowUser, followUser } from "../../";

const UserAction = ({ screenSize, user }) => {
  const dispatch = useDispatch();
  const { userDetails: currUser } = useSelector((store) => store.profile);
  const { user: authUser, token } = useSelector((store) => store.auth);
  const { users, isUserContentLoading } = useSelector((store) => store.users);
  const [isLoggedUserSame, setIsLoggedUserSame] = useState(
    Boolean(currUser?.username === authUser?.username)
  );
  const [open, setOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsLoggedUserSame(Boolean(currUser?.username === authUser?.username));
  }, [currUser, authUser]);

  useEffect(() => {
    setIsFollowing(
      Boolean(authUser.following.find(({ _id }) => _id === user._id))
    );
  }, [users, authUser, user]);

  const handleFollowUnfollowCLick = () => {
    if (isFollowing)
      dispatch(unfollowUser({ followUserId: user._id, token, dispatch }));
    else dispatch(followUser({ followUserId: user._id, token, dispatch }));
  };

  const boxStyle =
    screenSize === "xs"
      ? {
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          marginTop: "1rem",
        }
      : { display: { xs: "none", sm: "block" } };

  const btnStyle =
    screenSize === "xs"
      ? {
          width: "100%",
        }
      : { width: "fit-content" };

  return (
    <Box sx={{ ...boxStyle }}>
      {isLoggedUserSame ? (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          sx={{ ...btnStyle, textTransform: "none" }}
          onClick={() => setOpen(true)}
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          sx={{ ...btnStyle, textTransform: "none" }}
          onClick={handleFollowUnfollowCLick}
          disabled={isUserContentLoading}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
      {isLoggedUserSame && (
        <IconButton
          sx={{ marginLeft: "0.25rem" }}
          onClick={() => dispatch(signOutUser())}
        >
          <LogoutIcon />
        </IconButton>
      )}
      <EditProfileModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export { UserAction };
