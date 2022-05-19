import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  Box,
  Divider,
  Toolbar,
  Avatar,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import { routes } from "../../constants";

const drawerWidth = 280;

const RightSidebar = () => {
  const { users } = useSelector((store) => store.users);
  const { user: authUser } = useSelector((store) => store.auth);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSuggestedUsers(
      users.filter((user) => user.username !== authUser.username)
    );
  }, [users]);

  return (
    <Drawer
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />
      <Typography
        variant="p"
        sx={{ padding: "1.5rem 1rem 0.5rem", fontSize: "1.2em" }}
      >
        Suggestions for you
      </Typography>
      <List>
        {suggestedUsers.map(
          ({ _id, username, firstName, lastName, avatarURL }) => {
            return (
              <Box key={_id}>
                <Divider sx={{ margin: "0.25rem 0.5rem" }} />
                <ListItem>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Stack
                      direction="row"
                      gap="0.5rem"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`${routes.PROFILE}/${username}`)}
                    >
                      <Avatar src={avatarURL} />
                      <Stack sx={{ width: "8rem" }} justifyContent="center">
                        <Typography
                          noWrap
                          sx={{
                            margin: "0",
                          }}
                        >
                          {firstName} {lastName}
                        </Typography>
                        <Typography noWrap sx={{ fontSize: "0.8em" }}>
                          @{username}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Button size="small">Follow</Button>
                  </Stack>
                </ListItem>
              </Box>
            );
          }
        )}
      </List>
    </Drawer>
  );
};

export { RightSidebar };
