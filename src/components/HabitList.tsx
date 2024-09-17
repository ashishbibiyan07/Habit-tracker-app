import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../services/habit-slice";

const HabitList = () => {
  const { habits } = useSelector((state: RootState) => state.habitSlice);
  console.log(habits);

  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => {
        return (
          <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
            <Grid container alignItems={"center"}>
              <Grid xs={12} sm={6}>
                <Typography variant="h6">{habit.title}</Typography>
                <Typography
                  variant="body2"
                  style={{ textDecoration: "captilized" }}
                  color={"#ff3d00"}
                >
                  {habit.freuency}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button
                    startIcon={<CheckCircle />}
                    variant="outlined"
                    color={
                      habit.completeDates.includes(today)
                        ? "success"
                        : "warning"
                    }
                    onClick={() =>
                      dispatch(toggleHabit({ id: habit.id, date: today }))
                    }
                  >
                    {habit.completeDates.includes(today) ? "Completed" : "mark"}
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#dd2c00" }}
                    startIcon={<Delete />}
                    onClick={() => dispatch(removeHabit({ id: habit.id }))}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Current Streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(getStreak(habit) / 30) * 100}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};
export default HabitList;
