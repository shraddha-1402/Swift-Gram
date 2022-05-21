import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { commentOnPost, deleteCommentOnPost } from "../../features";
import { PostCard } from "../../components";
import { routes } from "../../constants";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, isPostContentLoading } = useSelector((store) => store.posts);
  const { token, user: authUser } = useSelector((store) => store.auth);
  const [currPost, setCurrPost] = useState({});
  const [commentData, setCommentData] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  useEffect(() => {
    const tempPost = posts.find(({ _id }) => _id === postId);
    if (tempPost) setCurrPost(tempPost);
  }, [postId, posts]);

  const handlePostComment = () => {
    setIsPosting(true);
    dispatch(commentOnPost({ postId, token, commentData }));
    if (!isPostContentLoading) {
      setCommentData("");
      setIsPosting(false);
    }
  };

  const handleDeleteComment = (commentId) =>
    dispatch(deleteCommentOnPost({ postId, commentId, token }));

  const handleCommentChange = (e) => setCommentData(e.target.value);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      {Object.keys(currPost).length ? (
        <>
          <PostCard post={currPost} />
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <TextField
              value={commentData}
              onChange={handleCommentChange}
              placeholder="Enter Comment"
              fullWidth
              autoComplete="off"
              size="small"
            />
            <LoadingButton
              disabled={commentData === ""}
              loading={isPosting}
              onClick={handlePostComment}
              disableElevation
              variant="contained"
            >
              Post
            </LoadingButton>
          </Box>
          {currPost.comments.map(({ _id, text, username, name, avatarURL }) => {
            return (
              <Paper
                key={_id}
                variant="outlined"
                sx={{
                  borderRadius: "0.25rem",
                  maxWidth: "35rem",
                  margin: "1rem auto",
                  padding: "0.5rem",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Stack
                    direction="row"
                    gap={1}
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`${routes.PROFILE}/${username}`)}
                  >
                    <Avatar
                      sx={{ width: "3rem", height: "3rem" }}
                      src={avatarURL}
                    />
                    <Stack
                      sx={{ width: { xs: "7rem", sm: "12rem" } }}
                      justifyContent="center"
                    >
                      <Typography noWrap>{name}</Typography>
                      <Typography noWrap sx={{ fontSize: "0.7em" }}>
                        @{username}
                      </Typography>
                    </Stack>
                  </Stack>
                  {authUser.username === username && (
                    <IconButton onClick={() => handleDeleteComment(_id)}>
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
                <Typography sx={{ paddingTop: "0.25rem" }}>{text}</Typography>
              </Paper>
            );
          })}
        </>
      ) : (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export { SinglePostPage };
