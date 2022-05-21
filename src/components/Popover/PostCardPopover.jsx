import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { PostCardModal } from "../PostCardModal";
import { deleteSinglePost } from "../../features";

const iconStyle = {
  width: "1rem",
  height: "1rem",
  marginRight: "0.5rem",
};

const PostCardPopover = ({ setOpen, post }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const theme = useTheme();

  const handlePostDelete = () => {
    dispatch(deleteSinglePost({ postId: post._id, token }));
  };

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
        <PostCardModal post={post} setOpen={setOpen} />
        <ListItem disablePadding>
          <ListItemButton
            sx={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}
            onClick={handlePostDelete}
          >
            <DeleteIcon sx={{ ...iconStyle }} />
            Delete
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export { PostCardPopover };
