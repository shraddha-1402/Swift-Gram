import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PostCard } from "../../components";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const Bookmark = () => {
  const { user: authUser, isLoading } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.posts);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const tempBookmarks = [];
    authUser.bookmarks.forEach((postId) => {
      tempBookmarks.push(posts.find((post) => post._id === postId));
    });
    setBookmarkedPosts(tempBookmarks);
  }, [authUser]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      {isLoading ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ margin: "2rem 0" }}>
          {bookmarkedPosts?.length > 0 ? (
            <>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Your Bookmarks
              </Typography>
              {bookmarkedPosts.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </>
          ) : (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              No Bookmarks Yet
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export { Bookmark };
