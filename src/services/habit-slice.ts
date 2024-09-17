import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  title: string;
  freuency: "daily" | "weekly";
  completeDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk(
  "habitSlice/fetchHabits",
  async () => {
    // Simulate an Api call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockHabits: Habit[] = [
      {
        id: "1",
        title: "read",
        freuency: "daily",
        completeDates: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "write",
        freuency: "weekly",
        completeDates: [],
        createdAt: new Date().toISOString(),
      },
    ];
    return mockHabits;
  }
);

const habitSlice = createSlice({
  name: "habitSlice",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ title: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        title: action.payload.title,
        freuency: action.payload.frequency,
        completeDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const findId = state.habits.find((h) => h.id === action.payload.id);
      if (findId) {
        const index = findId.completeDates.indexOf(action.payload.date);
        if (index > -1) {
          findId.completeDates.splice(index, 1);
        } else {
          findId.completeDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter(
        (habt) => habt.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      });
  },
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
