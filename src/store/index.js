import { configureStore } from "@reduxjs/toolkit";
import { authReducer, profileReducer, usersReducer } from "../features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
  },
});
