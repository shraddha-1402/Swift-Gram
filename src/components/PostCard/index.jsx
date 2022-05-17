import React, { useState } from "react";
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
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";

import { PostCardPopover } from "../";

const PostCard = () => {
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Stack direction="row" gap={1} sx={{ cursor: "pointer" }}>
          <Avatar sx={{ width: "3rem", height: "3rem" }} />
          <Stack
            sx={{ width: { xs: "7rem", sm: "12rem" } }}
            justifyContent="center"
          >
            <Typography noWrap>Jon Doe</Typography>
            <Typography noWrap sx={{ fontSize: "0.7em" }}>
              Sat, May 08 2022
            </Typography>
          </Stack>
        </Stack>
        <Box position="relative">
          <IconButton onClick={() => setOpen(true)}>
            <MoreHorizIcon />
          </IconButton>
          {open && <PostCardPopover setOpen={setOpen} />}
        </Box>
      </Stack>
      <Typography sx={{ padding: "1rem 0" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem
        quaerat ratione deserunt, aliquid, rem corrupti veniam, quia obcaecati
        odio expedita placeat labore iste nostrum reprehenderit reiciendis omnis
        explicabo tenetur magni!
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton>
            <ThumbUpAltIcon />
          </IconButton>
          <Typography>10</Typography>
        </Box>
        <IconButton>
          <ThumbDownAltIcon />
        </IconButton>
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton>
            <AddCommentIcon />
          </IconButton>
          <Typography>10</Typography>
        </Box>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export { PostCard };