import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  userPosts: [],
  isProfileLoading: false,
  isProfileContentLoading: false,
};

export const getUserProfileDetails = createAsyncThunk(
  "/profile/getUserProfileDetails",
  async (username, thunkAPI) => {
    try {
      const { data, status } = await axios.get(`/api/users/${username}`);
      if (status === 200) return data.user;
      else throw new Error(status);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Could not fetch data");
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "/profile/getUserPosts",
  async (username, thunkAPI) => {
    try {
      const { data, status } = await axios.get(` /api/posts/user/${username}`);
      if (status === 200) return data.posts;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Could not fetch data");
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserProfileDetails.pending]: (state) => {
      state.isProfileLoading = true;
    },
    [getUserProfileDetails.fulfilled]: (state, action) => {
      state.isProfileLoading = false;
      state.userDetails = action.payload;
    },
    [getUserProfileDetails.rejected]: (state) => {
      state.isProfileLoading = false;
    },

    [getUserPosts.pending]: (state) => {
      state.isProfileLoading = true;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.isProfileLoading = false;
      state.userPosts = [...action.payload].reverse();
    },
    [getUserPosts.rejected]: (state) => {
      state.isProfileLoading = false;
    },
  },
});

export const profileReducer = profileSlice.reducer;
