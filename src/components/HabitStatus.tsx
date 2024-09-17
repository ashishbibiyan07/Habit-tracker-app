import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchHabits } from "../services/habit-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStatus = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habitSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completeDates.includes(today)).length;
  };

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];

      if (habit.completeDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };
  const getLongestSreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <LinearProgress />;
  }

  return (
    <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" guuterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits : {habits.length}</Typography>
      <Typography variant="body1">
        compeleted Today:{getCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Longest Streak: {getLongestSreak()}
      </Typography>
    </Paper>
  );
};

export default HabitStatus;
