import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    exercise: [],
  },
  reducers: {
    setExercise: (state, action) => {
      state.exercise = action.payload;
    },
    removeExercise: (state) => {
      state.exercise = null;
    },
  },
});

export const { setExercise, removeExercise } = exerciseSlice.actions;

export default exerciseSlice.reducer;
