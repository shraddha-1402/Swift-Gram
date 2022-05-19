import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  IconButton,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";

import { routes } from "../../constants";
import { PostCardPopover } from "../";
import { formatDate } from "../../utils";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user: authUser } = useSelector((store) => store.auth);
  const { users } = useSelector((store) => store.users);
  const [open, setOpen] = useState(false);
  const [currUser, setCurrUser] = useState([]);
  const [isLoggedInUser, setIsLoggedInUser] = useState();

  useEffect(() => {
    if (users.length > 0)
      setCurrUser(users.filter((user) => user.username === post.username)[0]);
  }, [users, post.username]);

  useEffect(() => {
    if (currUser.username === authUser.username) setIsLoggedInUser(true);
    else setIsLoggedInUser(false);
  }, [currUser, authUser]);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "0.25rem",
        maxWidth: "35rem",
        margin: "1rem auto",
        padding: "1rem",
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
          onClick={() => navigate(`${routes.PROFILE}/${post.username}`)}
        >
          <Avatar
            sx={{ width: "3rem", height: "3rem" }}
            src={currUser?.avatarURL}
          />
          <Stack
            sx={{ width: { xs: "7rem", sm: "12rem" } }}
            justifyContent="center"
          >
            <Typography noWrap>
              {currUser?.firstName} {currUser?.lastName}
            </Typography>
            <Typography noWrap sx={{ fontSize: "0.7em" }}>
              {formatDate(post.updatedAt)}
            </Typography>
          </Stack>
        </Stack>
        <Box position="relative">
          <IconButton onClick={() => setOpen(true)}>
            <MoreHorizIcon />
          </IconButton>
          {open && (
            <PostCardPopover
              isLoggedInUser={isLoggedInUser}
              setOpen={setOpen}
            />
          )}
        </Box>
      </Stack>
      <Typography sx={{ padding: "1rem 0" }}>{post?.content}</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton>
            <ThumbUpAltIcon />
          </IconButton>
          <Typography>{post?.likes.likeCount}</Typography>
        </Box>
        <IconButton>
          <ThumbDownAltIcon />
        </IconButton>
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton>
            <AddCommentIcon />
          </IconButton>
          <Typography>{post?.comments.length}</Typography>
        </Box>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export { PostCard };
