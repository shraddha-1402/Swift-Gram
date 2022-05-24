import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareIcon from "@mui/icons-material/Share";

import { useLikePosts, useBookmarkPost } from "../../hooks";
import { routes } from "../../constants";
import { PostCardPopover } from "../";
import { formatDate } from "../../utils";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user: authUser, isAuthContentLoading } = useSelector(
    (store) => store.auth
  );
  const { users } = useSelector((store) => store.users);
  const { isPostContentLoading } = useSelector((store) => store.posts);
  const [open, setOpen] = useState(false);
  const [currUser, setCurrUser] = useState([]);
  const [isLoggedInUser, setIsLoggedInUser] = useState();
  const { isLiked, handlelikes } = useLikePosts(post);
  const { isBookmarked, handleBookmark } = useBookmarkPost(post);
  const [showOptions, setShowOptions] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((user) => user.username === post.username);
      if (foundUser) setCurrUser(foundUser);
    }
  }, [users, authUser, post.username]);

  useEffect(() => {
    if (currUser.username === authUser.username) setIsLoggedInUser(true);
    else setIsLoggedInUser(false);
  }, [currUser, authUser]);

  useEffect(() => {
    if (isLoggedInUser && pathname.split("/")[1] !== "home")
      setShowOptions(true);
  }, [pathname, isLoggedInUser]);

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
              {formatDate(post.createdAt)}
            </Typography>
          </Stack>
        </Stack>
        {showOptions && (
          <Box position="relative">
            <IconButton onClick={() => setOpen(true)}>
              <MoreHorizIcon />
            </IconButton>
            {open && <PostCardPopover setOpen={setOpen} post={post} />}
          </Box>
        )}
      </Stack>
      <Typography sx={{ padding: "1rem 0" }}>{post?.content}</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton disabled={isPostContentLoading} onClick={handlelikes}>
            {isLiked ? (
              <ThumbUpAltIcon sx={{ color: "red" }} />
            ) : (
              <ThumbUpAltOutlinedIcon />
            )}
          </IconButton>
          <Typography>{post?.likes?.likeCount}</Typography>
        </Box>
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton
            onClick={() => navigate(`${routes.SINGLE_POST}/${post._id}`)}
          >
            <ModeCommentOutlinedIcon />
          </IconButton>
          <Typography>{post?.comments?.length}</Typography>
        </Box>
        <IconButton disabled={isAuthContentLoading} onClick={handleBookmark}>
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export { PostCard };
