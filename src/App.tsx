import React from "react";
import "./App.css";
import { Container, Typography } from "@mui/material";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import HabitStatus from "./components/HabitStatus";
const App = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component={"h1"} align="center" color="primary">
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
      <HabitStatus />
    </Container>
  );
};

export default App;
