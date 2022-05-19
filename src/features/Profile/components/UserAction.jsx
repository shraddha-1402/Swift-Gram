import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOutUser } from "../../";
import { EditProfileModal } from "./EditProfileModal";

const UserAction = ({ screenSize }) => {
  const dispatch = useDispatch();
  const { userDetails: currUser } = useSelector((store) => store.profile);
  const { user: authUser } = useSelector((store) => store.auth);
  const [isLoggedUserSame, setIsLoggedUserSame] = useState(
    Boolean(currUser?.username === authUser?.username)
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsLoggedUserSame(Boolean(currUser?.username === authUser?.username));
  }, [currUser, authUser]);

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
          sx={{ ...btnStyle }}
          onClick={() => setOpen(true)}
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          sx={{ ...btnStyle }}
        >
          Follow
        </Button>
      )}
      {isLoggedUserSame && (
        <IconButton
          sx={{ marginLeft: "1rem" }}
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
