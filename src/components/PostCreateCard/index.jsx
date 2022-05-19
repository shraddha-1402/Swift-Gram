import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  TextField,
  Stack,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { publishSinglePost, editSinglePost } from "../../features";
import { EmojiPopover } from "../Popover";

const PostCreateCard = ({ post, closeBackdrop }) => {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState(
    post === undefined ? "" : post.content
  );
  const { user: authUser, token } = useSelector((store) => store.auth);
  const { postLoadingState } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const handleEditPost = () => {
    dispatch(
      editSinglePost({
        postId: post._id,
        postData: { content: postContent },
        token,
      })
    );
    if (!postLoadingState) {
      setPostContent("");
      closeBackdrop && closeBackdrop();
    }
  };

  const handlePublishPost = () => {
    dispatch(publishSinglePost({ post: postContent, token }));
    if (!postLoadingState) setPostContent("");
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "0.25rem",
        maxWidth: "35rem",
        margin: "0rem auto",
        padding: "1rem",
      }}
    >
      <Stack direction="row" gap={2}>
        <Avatar
          sx={{ width: "3rem", height: "3rem" }}
          src={authUser?.avatarURL}
        />
        <Box sx={{ width: "100%" }}>
          <Box component="form">
            <TextField
              id="outlined-multiline-static"
              multiline
              maxRows={4}
              minRows={4}
              fullWidth
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </Box>
          <Stack position="relative">
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ alignSelf: "flex-end", marginBottom: "0.5rem" }}
            >
              <EmojiEmotionsIcon />
            </IconButton>
            {open && (
              <EmojiPopover setPostContent={setPostContent} setOpen={setOpen} />
            )}
          </Stack>
        </Box>
      </Stack>
      <LoadingButton
        disabled={postContent === ""}
        disableElevation
        size="small"
        variant="contained"
        fullWidth
        loading={postLoadingState}
        onClick={post ? handleEditPost : handlePublishPost}
      >
        {post ? "Edit" : "Post"}
      </LoadingButton>
    </Paper>
  );
};

export { PostCreateCard };
