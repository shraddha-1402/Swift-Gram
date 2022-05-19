import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
};

export const getAllUsers = createAsyncThunk("/users/getAllUsers", async () => {
  try {
    const { data, status } = await axios.get("/api/users");
    if (status === 200) return data.users;
    else throw new Error(status);
  } catch (error) {
    console.log(error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
  },
});

export const usersReducer = usersSlice.reducer;
