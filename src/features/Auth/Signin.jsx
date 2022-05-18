import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Paper, Typography, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { routes } from "../../constants";
import { HeroSection } from "./components/HeroSection";
import { signInUser } from "./authSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.auth);
  const [signinFieldValues, setSigninFieldValues] = useState({
    username: "",
    password: "",
  });

  const setFormFieldValues = (e) => {
    setSigninFieldValues({
      ...signinFieldValues,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(signinFieldValues));
  };

  return (
    <Stack>
      <HeroSection />
      <Box
        id="form-section"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            maxWidth: "30rem",
            height: "fit-content",
            padding: "3rem 2rem",
            margin: "0 1rem",
          }}
        >
          <Typography sx={{ textAlign: "center" }} component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            onChange={setFormFieldValues}
          >
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                value={signinFieldValues.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                value={signinFieldValues.password}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                loading={isLoading}
              >
                Sign In
              </LoadingButton>
              <Link
                to={routes.SIGNUP}
                variant="body2"
                style={{ color: "inherit" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
};

export { Signin };
