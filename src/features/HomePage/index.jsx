import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Middlebar, PostCreateCard, PostCard } from "../../components";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const HomePage = () => {
  const { posts, postLoadingState } = useSelector((store) => store.posts);
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

      {postLoadingState ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ margin: "3rem 0" }}>
          {posts?.length > 0 ? (
            posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })
          ) : (
            <Typography variant="h5">
              Follow people to see their posts
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export { HomePage };
