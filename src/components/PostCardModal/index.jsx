import { useState } from "react";
import {
  Dialog,
  DialogContent,
  ListItem,
  ListItemButton,
  Backdrop,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { PostCreateCard } from "../PostCreateCard";

const iconStyle = {
  width: "1.25rem",
  height: "1.25rem",
  marginRight: "0.5rem",
};

const PostCardModal = ({
  openEditPostModal,
  setOpenEditPostModal,
  setOpen,
}) => {
  const handleCloseModal = () => {
    setOpenEditPostModal(false);
    setOpen(false);
  };
  // const [openEditPostModal, setOpenEditPostModal] = useState(false);
  // const handleEditModalToggle = () => {
  //   console.log("cicked");
  //   setOpenEditPostModal(true);
  //   console.log("after cicked");
  // };
  // console.log(openEditPostModal);
  return (
    <>
      {/* <ListItem disablePadding>
        <ListItemButton
          sx={{ borderRadius: "0.25rem" }}
          onClick={handleEditModalToggle}
        >
          <ModeEditIcon sx={{ ...iconStyle }} />
          Edit
        </ListItemButton>
      </ListItem> */}
      <Dialog
        disableScrollLock
        open={openEditPostModal}
        onClose={handleCloseModal}
      >
        <PostCreateCard closeBackdrop={handleCloseModal} />
      </Dialog>
    </>
  );
};

export { PostCardModal };
