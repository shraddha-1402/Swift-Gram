import { Box } from "@mui/material";
import { Middlebar, PostCreateCard, PostCard } from "../../components";

const HomePage = () => {
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
      {/* <PostCard /> */}
    </Box>
  );
};

export { HomePage };
