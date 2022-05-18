import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const UserAction = ({ screenSize }) => {
  const { userDetails: currUser } = useSelector((store) => store.profile);
  const { user: authUser } = useSelector((store) => store.auth);
  const [isLoggedUserSame, setIsLoggedUserSame] = useState(
    Boolean(currUser?.username === authUser?.username)
  );

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
        <IconButton sx={{ marginLeft: "1rem" }}>
          <LogoutIcon />
        </IconButton>
      )}
    </Box>
  );
};

export { UserAction };
