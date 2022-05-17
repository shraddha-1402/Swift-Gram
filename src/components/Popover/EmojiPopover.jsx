import React, { useRef } from "react";
import { Paper, Stack, IconButton } from "@mui/material";
import { emojis } from "../../constants";
import { useOnClickOutside } from "../../hooks";

const EmojiPopover = ({ setOpen }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper
      ref={ref}
      sx={{
        position: "absolute",
        top: "0.25rem",
        right: "0",
        padding: "0.5rem",
        zIndex: 1,
      }}
    >
      <Stack
        width="16rem"
        flexWrap="wrap"
        direction="row"
        justifyContent="center"
        onClick={handleClose}
      >
        {emojis.map((emoji, index) => (
          <IconButton color="inherit" key={index}>
            {emoji}
          </IconButton>
        ))}
      </Stack>
    </Paper>
  );
};

export { EmojiPopover };
