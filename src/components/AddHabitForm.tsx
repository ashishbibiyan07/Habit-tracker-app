import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addHabit } from "../services/habit-slice";

const AddHabitForm = () => {
  const [title, setTitle] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(
        addHabit({
          title,
          frequency,
        })
      );
    }
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Habit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Habit here..."
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weely">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
