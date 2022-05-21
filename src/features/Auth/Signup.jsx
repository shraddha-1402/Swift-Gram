import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, Typography, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { routes } from "../../constants";
import { HeroSection } from "./components/HeroSection";
import { signUpUser } from "./authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const { isAuthLoading } = useSelector((store) => store.auth);

  const [signupFieldValues, setSignupFieldValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const setFormFieldValues = (e) => {
    setSignupFieldValues({
      ...signupFieldValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(signupFieldValues));
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
            padding: "2rem",
            margin: "0 1rem",
          }}
        >
          <Typography sx={{ textAlign: "center" }} component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            onSubmit={handleSubmit}
            onChange={setFormFieldValues}
            autoComplete="off"
          >
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={signupFieldValues.firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={signupFieldValues.lastName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                value={signupFieldValues.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                value={signupFieldValues.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={signupFieldValues.password}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                loading={isAuthLoading}
              >
                Sign Up
              </LoadingButton>
              <Link
                to={routes.SIGNIN}
                variant="body2"
                style={{ color: "inherit" }}
              >
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
};

export { Signup };
