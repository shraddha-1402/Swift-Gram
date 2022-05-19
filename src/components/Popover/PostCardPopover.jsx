import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Paper, List, ListItem, ListItemButton, useTheme } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { PostCardModal } from "../PostCardModal";

const iconStyle = {
  width: "1.25rem",
  height: "1.25rem",
  marginRight: "0.5rem",
};

const PostCardPopover = ({ isLoggedInUser, setOpen, post }) => {
  const theme = useTheme();
  const [openEditPostModal, setOpenEditPostModal] = useState(false);
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
        padding: "0 0.5rem",
        zIndex: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <List>
        {showOptions && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ borderRadius: "0.25rem" }}
                onClick={() => setOpenEditPostModal(true)}
              >
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
      <PostCardModal
        openEditPostModal={openEditPostModal}
        setOpenEditPostModal={setOpenEditPostModal}
        setOpen={setOpen}
      />
    </Paper>
  );
};

export { PostCardPopover };
