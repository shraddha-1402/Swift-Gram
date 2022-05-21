import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { PostCard } from "../../components";

const Bookmark = () => {
  const { user: authUser } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.posts);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const tempBookmarks = [];
    authUser.bookmarks.forEach((postId) => {
      tempBookmarks.push(posts.find((post) => post._id === postId));
    });
    setBookmarkedPosts(tempBookmarks);
  }, [authUser, posts]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
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
    </Box>
  );
};

export { Bookmark };
