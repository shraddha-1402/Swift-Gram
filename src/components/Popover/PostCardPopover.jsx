import { Paper, List, ListItem, ListItemButton } from "@mui/material";
import { useRef } from "react";
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
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  const handleClose = () => setOpen(false);

  return (
    <Paper
      ref={ref}
      sx={{
        width: "fit-content",
        position: "absolute",
        top: "0",
        right: "0",
        padding: "0 0.5rem",
      }}
    >
      <List onClick={handleClose}>
        {isLoggedInUser && (
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
