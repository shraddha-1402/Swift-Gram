import { configureStore } from "@reduxjs/toolkit";
import { authReducer, profileReducer } from "../features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
