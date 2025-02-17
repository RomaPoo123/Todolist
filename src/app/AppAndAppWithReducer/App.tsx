import React, { useState } from "react";
import "../App.css";
import { v1 } from "uuid";
import { Container, Grid, Paper } from "@mui/material";
import { useTodolists } from "./hooks/useTodolist";
import { useTasks } from "./hooks/useTasks";
import { Header } from "../../common/components/Header/Header";
import { AddItemForm } from "../../common/components/AddItemForm/AddItemForm";
import { Todolist } from "../../features/todolists/UI/Todolists/Todolist/Todolist";
import { DomainTask } from "features/todolists/api/tasksApi.types";
// Types
export type FilterValueType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
export type TasksType = {
  [todolistId: string]: DomainTask[];
};

function App() {
  // ИСХОДНЫЕ ДАННЫЕ, ГЛОБАЛЬНЫЙ СТЕЙТ (Data)
  // ЛОГИКА!! CRUD-операции (logic)
  let {
    tasks,
    removeTask,
    addTask,
    changeStatus,
    changeNewTaskTitle,
    completelyRemoveTasksForTodolist,
    addStateForNewTodolist,
  } = useTasks();

  let { todolists, setTodolists, cahgeFilter, changeNewTitleTodolist, removeTodolist, addTodolist } = useTodolists(
    completelyRemoveTasksForTodolist,
    addStateForNewTodolist,
  );

  return (
    <div className="App">
      <Header />
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
          {todolists.map((tl) => {
            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "30px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    filter={tl.filter}
                    removeTask={removeTask}
                    cahgeFilter={cahgeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeNewTaskTitle={changeNewTaskTitle}
                    changeNewTitleTodolist={changeNewTitleTodolist}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
