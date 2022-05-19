import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Paper, List, ListItem, ListItemButton, useTheme } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useOnClickOutside } from "../../hooks";

const iconStyle = {
  width: "1.25rem",
  height: "1.25rem",
  marginRight: "0.5rem",
};

const PostCardPopover = ({ isLoggedInUser, setOpen }) => {
  const theme = useTheme();
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  const [showOptions, setShowOptions] = useState(false);
  const { pathname } = useLocation();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isLoggedInUser && pathname.split("/")[1] !== "home")
      setShowOptions(true);
  }, [pathname, isLoggedInUser]);

  return (
    <Paper
      ref={ref}
      sx={{
        width: "fit-content",
        position: "absolute",
        top: "0",
        right: "0",
        padding: "0 0.5rem",
        zIndex: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <List onClick={handleClose}>
        {showOptions && (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: "0.25rem" }}>
                <ModeEditIcon sx={{ ...iconStyle }} />
                Edit
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: "0.25rem" }}>
                <DeleteIcon sx={{ ...iconStyle }} />
                Delete
              </ListItemButton>
            </ListItem>
          </>
        )}
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: "0.25rem" }}>
            <BookmarkIcon sx={{ ...iconStyle }} />
            Bookmark
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export { PostCardPopover };
