import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import { UserInfoCard } from "./components/UserInfoCard";
import { PostCard } from "../../components";
import { getUserPosts, getUserProfileDetails } from "../";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((store) => store.auth);
  const { userPosts: currUserPosts, isLoading } = useSelector(
    (store) => store.profile
  );
  const { posts } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getUserProfileDetails(username));
    dispatch(getUserPosts(username));
  }, [username, authUser, dispatch, posts]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      <UserInfoCard />
      {isLoading ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ margin: "3rem 0" }}>
          {currUserPosts?.length > 0 ? (
            currUserPosts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })
          ) : (
            <Typography sx={{ textAlign: "center" }} variant="h4">
              No posts yet
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export { ProfilePage };
