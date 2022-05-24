import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { Middlebar, PostCreateCard, PostCard } from "../../components";
import { SortPosts } from "../PostPages";
import { sortPosts } from "../../utils";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const HomePage = () => {
  const { posts, isPostLoading } = useSelector((store) => store.posts);
  const { user: authUser } = useSelector((store) => store.auth);
  const [postFeed, setPostFeed] = useState([]);
  const [sortingMethod, setSortingMethod] = useState("Latest");

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        authUser.following.find(({ username }) => username === post.username) ||
        authUser.username === post.username
    );
    setPostFeed(sortPosts({ posts: filteredPosts, method: sortingMethod }));
  }, [posts, authUser, sortingMethod]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      <PostCreateCard />
      <Middlebar />

      {isPostLoading ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ margin: "3rem auto", maxWidth: "35rem" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Posts</Typography>
            <SortPosts
              sortingMethod={sortingMethod}
              setSortingMethod={setSortingMethod}
            />
          </Stack>

          {postFeed?.length > 0 ? (
            postFeed.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })
          ) : (
            <Typography variant="h6">
              Follow people to see their posts
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export { HomePage };
