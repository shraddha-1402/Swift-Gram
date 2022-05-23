import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserProfile } from "../";

const initialState = {
  users: [],
  isUserLoading: false,
  isUserContentLoading: false,
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

export const followUser = createAsyncThunk(
  "/users/followUser",
  async ({ followUserId, token, dispatch }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 200) {
        dispatch(editUserProfile({ userData: data.user, token }));
        return data;
      } else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not follow user");
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "/users/unfollowUser",
  async ({ followUserId, token, dispatch }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/users/unfollow/${followUserId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) {
        dispatch(editUserProfile({ userData: data.user, token }));
        return data;
      } else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not follow user");
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.isUserContentLoading = false;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isUserLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isUserLoading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isUserLoading = false;
      console.log(action.payload);
    },

    // folow user state
    [followUser.pending]: (state) => {
      state.isUserContentLoading = true;
    },
    [followUser.fulfilled]: (state, action) => {
      state.users = [...state.users].map((currUser) =>
        currUser._id === action.payload.followUser._id
          ? action.payload.followUser
          : currUser
      );
    },
    [followUser.rejected]: (state, action) => {
      console.error(action.payload);
      state.isUserContentLoading = false;
    },

    // unfollow user state
    [unfollowUser.pending]: (state) => {
      state.isUserContentLoading = true;
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.isUserContentLoading = false;
      state.users = [...state.users].map((currUser) =>
        currUser._id === action.payload.followUser._id
          ? action.payload.followUser
          : currUser
      );
    },
    [unfollowUser.rejected]: (state) => {
      state.isUserContentLoading = false;
    },
  },
});
export const { stopLoading } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
