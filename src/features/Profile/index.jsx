import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { getUserPosts, getUserProfileDetails } from "./profileSlice";
import { UserInfoCard } from "./components/UserInfoCard";

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileDetails(username));
    dispatch(getUserPosts(username));
  }, [username]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      <UserInfoCard />
    </Box>
  );
};

export { ProfilePage };
