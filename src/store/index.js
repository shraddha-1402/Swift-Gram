import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  profileReducer,
  usersReducer,
  postsReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});
