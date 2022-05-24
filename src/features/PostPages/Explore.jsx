import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { PostCard } from "../../components";
import { SortPosts } from "../PostPages";
import { sortPosts } from "../../utils";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const Explore = () => {
  const { user: authUser } = useSelector((store) => store.auth);
  const { posts, isPostLoading } = useSelector((store) => store.posts);
  const [sortingMethod, setSortingMethod] = useState("Latest");
  const [postFeed, setPostFeed] = useState([]);

  useEffect(() => {
    setPostFeed(sortPosts({ posts: [...posts], method: sortingMethod }));
  }, [posts, authUser, sortingMethod]);

  return (
    <>
      {isPostLoading ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            padding: "0 2rem",
            margin: "2rem auto 5rem",
            maxWidth: "35rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Explore</Typography>
            <SortPosts
              sortingMethod={sortingMethod}
              setSortingMethod={setSortingMethod}
            />
          </Stack>

          {postFeed.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </Box>
      )}
    </>
  );
};

export { Explore };
