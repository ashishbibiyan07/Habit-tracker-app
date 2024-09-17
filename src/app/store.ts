import { configureStore } from "@reduxjs/toolkit";
import habitSlice from "../services/habit-slice";

export const store = configureStore({
  reducer: {
    habitSlice: habitSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
