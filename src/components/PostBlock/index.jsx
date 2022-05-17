import React from "react";
import {
  Box,
  TextField,
  Stack,
  Avatar,
  Button,
  useTheme,
  IconButton,
  Paper,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const PostBlock = () => {
  const theme = useTheme();
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
      <Stack direction="row" gap={2}>
        <Avatar sx={{ width: "3rem", height: "3rem" }} />
        <Box sx={{ width: "100%" }}>
          <Box component="form">
            <TextField
              id="standard-multiline-static"
              multiline
              maxRows={4}
              minRows={4}
              fullWidth
              variant="standard"
              placeholder="What's on your mind?"
            />
          </Box>
          <Stack>
            <IconButton sx={{ alignSelf: "flex-end", marginBottom: "0.5rem" }}>
              <EmojiEmotionsIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
      <Button disableElevation size="small" variant="contained" fullWidth>
        Post
      </Button>
    </Paper>
  );
};

export { PostBlock };
