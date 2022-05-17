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
const drawerWidth = 280;

const RightSidebar = () => {
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
        {[1, 1, 1, 1, 1].map((value, index) => {
          return (
            <Box key={index}>
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
                  >
                    <Avatar />
                    <Stack sx={{ width: "8rem" }} justifyContent="center">
                      <Typography
                        noWrap
                        sx={{
                          margin: "0",
                        }}
                      >
                        Jon Doe
                      </Typography>
                      <Typography noWrap sx={{ fontSize: "0.8em" }}>
                        @username
                      </Typography>
                    </Stack>
                  </Stack>
                  <Button size="small">Follow</Button>
                </Stack>
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};

export { RightSidebar };
