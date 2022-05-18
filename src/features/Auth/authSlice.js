import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: JSON.parse(localStorage.getItem("smLoginData"))?.token || null,
  user: JSON.parse(localStorage.getItem("smLoginData"))?.user || null,
  isLoading: false,
};

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", { ...credentials });
      if (response.status === 200) return response.data;
      else throw new Error(response.status);
    } catch (error) {
      if (error === 404) thunkAPI.rejectWithValue("User not found");
      else if (error === 401)
        thunkAPI.rejectWithValue("Check your credentials");
      else thunkAPI.rejectWithValue("Could not signin, try later!");
      console.log(error);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        ...credentials,
        bio: "",
        website: "",
        avatarURL: "",
      });
      if (response.status === 201) return response.data;
      else throw new Error(response.status);
    } catch (error) {
      if (error === 422) thunkAPI.rejectWithValue("Username already exists");
      else thunkAPI.rejectWithValue("Could not signup, try later");
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutUser: (state) => {
      localStorage.removeItem("smLoginData");
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: {
    // sign in user states
    [signInUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.foundUser;
      state.token = action.payload.encodedToken;
      delete action.payload.foundUser.password;
      localStorage.setItem(
        "smLoginData",
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.foundUser,
        })
      );
      // add toast for displaying success
    },
    [signInUser.rejected]: (state) => {
      state.isLoading = false;
      // add toast for displaying error
    },

    // sign up user states
    [signUpUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.createdUser;
      state.token = action.payload.encodedToken;
      delete action.payload.createdUser.password;
      localStorage.setItem(
        "smLoginData",
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.createdUser,
        })
      );
      // add toast for displaying success
    },
    [signUpUser.rejected]: (state) => {
      state.isLoading = false;
      // add toast for displaying error
    },
  },
});

export const { signOutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
