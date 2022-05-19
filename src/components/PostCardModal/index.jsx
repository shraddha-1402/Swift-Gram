import { useState } from "react";
import { Dialog, ListItem, ListItemButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { PostCreateCard } from "../PostCreateCard";

const iconStyle = {
  width: "1rem",
  height: "1rem",
  marginRight: "0.5rem",
};

const PostCardModal = ({ setOpen, post }) => {
  const handleCloseModal = () => {
    setOpenEditPostModal(false);
    setOpen(false);
  };
  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}
          onClick={() => setOpenEditPostModal(true)}
        >
          <ModeEditIcon sx={{ ...iconStyle }} />
          Edit
        </ListItemButton>
      </ListItem>
      <Dialog
        disableScrollLock
        open={openEditPostModal}
        onClose={handleCloseModal}
      >
        <PostCreateCard post={post} closeBackdrop={handleCloseModal} />
      </Dialog>
    </>
  );
};

export { PostCardModal };
