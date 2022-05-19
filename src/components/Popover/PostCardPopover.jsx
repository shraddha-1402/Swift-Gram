import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  useTheme,
  IconButton,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { PostCardModal } from "../PostCardModal";

const iconStyle = {
  width: "1rem",
  height: "1rem",
  marginRight: "0.5rem",
};

const PostCardPopover = ({ isLoggedInUser, setOpen, post }) => {
  const theme = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isLoggedInUser && pathname.split("/")[1] !== "home")
      setShowOptions(true);
  }, [pathname, isLoggedInUser]);

  return (
    <Paper
      sx={{
        width: "fit-content",
        position: "absolute",
        top: "0",
        right: "0",
        padding: "1.5rem 0.5rem 0",
        zIndex: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <IconButton
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          right: "0rem",
          top: "0rem",
        }}
      >
        <CloseIcon sx={{ width: "1.1rem", height: "1.1rem" }} />
      </IconButton>
      <List>
        {showOptions && (
          <>
            <PostCardModal post={post} setOpen={setOpen} />
            <ListItem disablePadding>
              <ListItemButton
                sx={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}
              >
                <DeleteIcon sx={{ ...iconStyle }} />
                Delete
              </ListItemButton>
            </ListItem>
          </>
        )}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}
          >
            <BookmarkIcon sx={{ ...iconStyle }} />
            Bookmark
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export { PostCardPopover };
