import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import exerciseReducer from "./exerciseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    exercise: exerciseReducer,
  },
});

export default store;
