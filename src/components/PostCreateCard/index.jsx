import React, { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Avatar,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { EmojiPopover } from "../Popover";

const PostCreateCard = () => {
  const [open, setOpen] = useState(false);

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
              id="outlined-multiline-static"
              multiline
              maxRows={4}
              minRows={4}
              fullWidth
              placeholder="What's on your mind?"
            />
          </Box>
          <Stack position="relative">
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ alignSelf: "flex-end", marginBottom: "0.5rem" }}
            >
              <EmojiEmotionsIcon />
            </IconButton>
            {open && <EmojiPopover setOpen={setOpen} />}
          </Stack>
        </Box>
      </Stack>
      <Button disableElevation size="small" variant="contained" fullWidth>
        Post
      </Button>
    </Paper>
  );
};

export { PostCreateCard };
