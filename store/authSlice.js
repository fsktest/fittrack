import { createSlice } from "@reduxjs/toolkit";
import { router } from "expo-router";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    currentUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.currentUser = action.payload.currentUser;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
