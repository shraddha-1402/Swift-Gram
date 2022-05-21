import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  singlePost: [],
  isPostLoading: false,
  isPostContentLoading: false,
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
        { postData: { content: post } },
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts[data.posts.length - 1];
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
      const { data, status, statusText } = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        { headers: { authorization: token } }
      );
      if (status === 201)
        return { editedPost: data.posts.find(({ _id }) => _id === postId) };
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
      const { status, statusText } = await axios.delete(
        `/api/posts/${postId}`,
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) return { postId };
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not delete post");
    }
  }
);

export const likePost = createAsyncThunk(
  "/posts/likePost",
  async ({ postId, token }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) return data.posts.find((post) => post._id === postId);
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not like post");
    }
  }
);

export const dislikePost = createAsyncThunk(
  "/posts/dislikePost",
  async ({ postId, token }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) return data.posts.find((post) => post._id === postId);
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not dislike post");
    }
  }
);

export const getPostComments = createAsyncThunk(
  "/posts/getPostComments",
  async ({ postId }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.get(
        `/api/comments/${postId}`
      );
      if (status === 200) return data.comments;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not fetch comment on post");
    }
  }
);

export const commentOnPost = createAsyncThunk(
  "/posts/commentOnPost",
  async ({ postId, token, commentData }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/comments/add/${postId}`,
        { commentData },
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not add comment on post");
    }
  }
);

export const deleteCommentOnPost = createAsyncThunk(
  "/posts/deleteCommentOnPost",
  async ({ postId, token, commentId }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/comments/delete/${postId}/${commentId}`,
        {},
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not delete comment on post");
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
      state.isPostLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isPostLoading = false;
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state) => {
      state.isPostLoading = false;
    },

    // get post state
    [getSinglePost.pending]: (state) => {
      state.isPostLoading = true;
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.isPostLoading = false;
      state.singlePost = action.payload;
    },
    [getSinglePost.rejected]: (state) => {
      state.isPostLoading = false;
    },

    // publish post state
    [publishSinglePost.pending]: (state) => {
      state.isPostContentLoading = true;
    },
    [publishSinglePost.fulfilled]: (state, action) => {
      state.isPostContentLoading = false;
      state.posts.unshift(action.payload);
    },
    [publishSinglePost.rejected]: (state) => {
      state.isPostContentLoading = false;
    },

    // edit post state
    [editSinglePost.pending]: (state) => {
      state.isPostContentLoading = true;
    },
    [editSinglePost.fulfilled]: (state, action) => {
      state.isPostContentLoading = false;
      state.posts.find(
        ({ _id }) => _id === action.payload.editedPost._id
      ).content = action.payload.editedPost.content;
    },
    [editSinglePost.rejected]: (state) => {
      state.isPostContentLoading = false;
    },

    // delete post state
    [deleteSinglePost.pending]: (state) => {
      state.isPostContentLoading = true;
    },
    [deleteSinglePost.fulfilled]: (state, action) => {
      state.isPostContentLoading = false;
      state.posts = state.posts.filter(
        ({ _id }) => _id !== action.payload.postId
      );
    },
    [deleteSinglePost.rejected]: (state) => {
      state.isPostContentLoading = false;
    },

    // like post state
    [likePost.pending]: (state) => {
      state.isPostContentLoading = true;
      // console.log(isLoad);
    },
    [likePost.fulfilled]: (state, action) => {
      state.isPostContentLoading = false;
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : { ...post }
      );
    },
    [likePost.rejected]: (state) => {
      state.isPostContentLoading = false;
    },

    // dislike post state
    [dislikePost.pending]: (state) => {
      state.isPostContentLoading = true;
    },
    [dislikePost.fulfilled]: (state, action) => {
      state.isPostContentLoading = false;
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : { ...post }
      );
    },
    [dislikePost.rejected]: (state) => {
      state.isPostContentLoading = false;
    },

    // get all comments post state
    [getPostComments.pending]: (state) => {
      state.isPostContentLoading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.isPostContentLoading = false;
      state.posts.comments = action.payload;
    },
    [getPostComments.rejected]: (state) => {
      state.isPostContentLoading = false;
    },

    // add comment on post
    [commentOnPost.pending]: (state) => {
      state.isPostContentLoading = true;
    },
    [commentOnPost.fulfilled]: (state, action) => {
      state.isPostContentLoading = false;
      state.posts = action.payload;
    },
    [commentOnPost.rejected]: (state) => {
      state.isPostContentLoading = false;
    },

    // delte comment post state
    [deleteCommentOnPost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [deleteCommentOnPost.rejected]: (state) => {
      // toast
    },
  },
});

export const postsReducer = postsSlice.reducer;
