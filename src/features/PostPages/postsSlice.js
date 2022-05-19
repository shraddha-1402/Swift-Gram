import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  singlePost: [],
  postLoadingState: false,
};

export const getAllPosts = createAsyncThunk("/posts/getAllPosts", async () => {
  try {
    const { data, status, statusText } = await axios.get("/api/posts");
    if (status === 200) return data.posts;
    else throw new Error(`${status}, ${statusText}`);
  } catch (error) {
    console.log(error);
  }
});

export const getSinglePost = createAsyncThunk(
  "/posts/getSinglePost",
  async ({ postId }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.get(
        `/api/posts/${postId}`
      );
      if (status === 200) return data.post;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not fetch post");
    }
  }
);

export const publishSinglePost = createAsyncThunk(
  "/posts/publishSinglePost",
  async ({ post, token }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        "/api/posts",
        { post },
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not publish post");
    }
  }
);

export const editSinglePost = createAsyncThunk(
  "/posts/editSinglePost",
  async ({ postId, postData, token }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.put(
        `/api/posts/edit/${postId}`,
        { postData },
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not edit post");
    }
  }
);

export const deleteSinglePost = createAsyncThunk(
  "/posts/deleteSinglePost",
  async ({ postId, token }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.delete(
        `/api/posts/${postId}`,
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not delete post");
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // get all posts state
    [getAllPosts.pending]: (state) => {
      state.postLoadingState = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.postLoadingState = false;
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state) => {
      state.postLoadingState = false;
    },

    // get post state
    [getSinglePost.pending]: (state) => {
      state.postLoadingState = true;
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.postLoadingState = false;
      state.singlePost = action.payload;
    },
    [getSinglePost.rejected]: (state) => {
      state.postLoadingState = false;
    },

    // publish post state
    [publishSinglePost.pending]: (state) => {
      state.postLoadingState = true;
    },
    [publishSinglePost.fulfilled]: (state, action) => {
      state.postLoadingState = false;
      state.posts = action.payload;
    },
    [publishSinglePost.rejected]: (state) => {
      state.postLoadingState = false;
    },

    // edit post state
    [editSinglePost.pending]: (state) => {
      state.postLoadingState = true;
    },
    [editSinglePost.fulfilled]: (state, action) => {
      state.postLoadingState = false;
      state.posts = action.payload;
    },
    [editSinglePost.rejected]: (state) => {
      state.postLoadingState = false;
    },

    // delete post state
    [deleteSinglePost.pending]: (state) => {
      state.postLoadingState = true;
    },
    [deleteSinglePost.fulfilled]: (state, action) => {
      state.postLoadingState = false;
      state.posts = action.payload;
    },
    [deleteSinglePost.rejected]: (state) => {
      state.postLoadingState = false;
    },
  },
});

export const postsReducer = postsSlice.reducer;
