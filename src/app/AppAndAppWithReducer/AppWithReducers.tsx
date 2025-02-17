import React, { useReducer, useState } from "react";
import "../App.css";
import { v1 } from "uuid";
import { Container, Grid, Paper } from "@mui/material";
import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  DomainTodolist,
  removeTodolistAC,
  todolistReducer,
} from "../../features/todolists/model/todolists-reducer";
import {
  addTaskAC,
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
  tasksReducer,
} from "../../features/todolists/model/tasks-reducer";
import { Header } from "../../common/components/Header/Header";
import { AddItemForm } from "../../common/components/AddItemForm/AddItemForm";
import { Todolist } from "../../features/todolists/UI/Todolists/Todolist/Todolist";
import { TaskPriority, TaskStatus } from "common/enums/enums";
import { DomainTask } from "features/todolists/api/tasksApi.types";

// Types
export type FilterValueType = "all" | "active" | "completed";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksType = {
  [todolistId: string]: TaskType[];
};

function AppWithReducer() {
  // ИСХОДНЫЕ ДАННЫЕ, ГЛОБАЛЬНЫЙ СТЕЙТ (Data)
  let todolistId_1 = v1();
  let todolistId_2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
    { id: todolistId_1, title: "what to lean", filter: "all", order: 0, addedDate: "" },
    { id: todolistId_2, title: "what to see", filter: "all", order: 0, addedDate: "" },
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId_1]: [
      {
        title: "CSS&HTML",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "JavaScript",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "React",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
    [todolistId_2]: [
      {
        title: "Game of Thrones",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Spider-man",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Batman",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
  });

  // ЛОГИКА!! CRUD-операции (logic)

  // Операции с тудулистами (Todolist-CRUD)
  // добавление нового тудулиста (addTodolist)
  function addTodolist(title: string) {
    const newTodolist = {
      id: v1(),
      title: title,
      addedDate: "",
      order: 0,
    };
    let action = addTodolistAC({ todolist: { ...newTodolist, filter: "all" } });
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }
  // удаление тудулиста (removeTodolist)
  function removeTodolist(todolistId: string) {
    dispatchToTodolistsReducer(removeTodolistAC(todolistId));
    dispatchToTasksReducer(removeTodolistAC(todolistId));
  }
  // Функция которая принимает измененный titleTodolist и заносит его в стейт
  function changeNewTitleTodolist(todolistId: string, title: string) {
    dispatchToTodolistsReducer(changeTitleTodolistAC({ todolistId, title }));
  }

  // Операции с тасками (Tasks-CRUD)
  // пуш отфильтрованного массива тасок в стейт
  const cahgeFilter = (todolistId: string, filter: FilterValueType) => {
    dispatchToTodolistsReducer(changeFilterTodolistAC(todolistId, filter));
  };
  // Удаление тасок (removeTask)
  function removeTask(todolistId: string, id: string) {
    dispatchToTasksReducer(removeTaskAC({ todolistId, taskId: id }));
  }
  // добавление тасок (addTask)
  function addTask(todolistId: string, title: string) {
    let newTask: DomainTask = {
      description: "",
      title: title,
      status: TaskStatus.New,
      priority: TaskPriority.Low,
      startDate: "",
      deadline: "",
      id: v1(),
      todoListId: todolistId,
      order: 0,
      addedDate: "",
    };
    dispatchToTasksReducer(addTaskAC({ task: newTask }));
  }
  // изменение статуса таски changeStatus
  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    let status = isDone ? TaskStatus.Completed : TaskStatus.New;
    dispatchToTasksReducer(changeStatusTaskAC(todolistId, taskId, status));
  }
  // Функция которая принимает измененный titleTask и заносит его в стейт
  function changeNewTaskTitle(todolistId: string, taskId: string, title: string) {
    dispatchToTasksReducer(changeTitleTaskAC(todolistId, taskId, title));
  }

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

export default AppWithReducer;
