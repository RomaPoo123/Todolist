import React, { useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/addItemForm/AddItemForm';
import { Header } from './components/header/Header'
import { Container, Grid, Paper } from '@mui/material';
import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, todolistReducer } from './state/todolists-reducer';
import { addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
// Types
export type FilterValueType = "all" | "active" | "completed"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksType = {
  [todolistId: string]: TaskType[]
}




function AppWithReducers() {

  // ИСХОДНЫЕ ДАННЫЕ, ГЛОБАЛЬНЫЙ СТЕЙТ (Data)
  let todolistId_1 = v1();
  let todolistId_2 = v1();



  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
    { id: todolistId_1, title: "what to lean", filter: "all" },
    { id: todolistId_2, title: "what to see", filter: "all" },
  ])



  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId_1]: [
      { id: v1(), title: "CSS&HTML", isDone: true },
      { id: v1(), title: "JavaScript", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: "Game of Thrones", isDone: true },
      { id: v1(), title: "Spider-man", isDone: true },
      { id: v1(), title: "Batman", isDone: false },
    ]
  })


  // ЛОГИКА!! CRUD-операции (logic)

  // Операции с тудулистами (Todolist-CRUD)
  // добавление нового тудулиста (addTodolist)
  function addTodolist(title: string) {
    let action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action)
  }
  // удаление тудулиста (removeTodolist)
  function removeTodolist(todolistId: string) {
    dispatchToTodolistsReducer(removeTodolistAC(todolistId))
    dispatchToTasksReducer(removeTodolistAC(todolistId))
  }
  // Функция которая принимает измененный titleTodolist и заносит его в стейт
  function changeNewTitleTodolist(todolistId: string, title: string) {
    dispatchToTodolistsReducer(changeTitleTodolistAC(todolistId, title))
  }

  // Операции с тасками (Tasks-CRUD)
  // пуш отфильтрованного массива тасок в стейт
  const cahgeFilter = (todolistId: string, filter: FilterValueType) => {
    dispatchToTodolistsReducer(changeFilterTodolistAC(todolistId, filter,))
  }
  // Удаление тасок (removeTask)
  function removeTask(todolistId: string, id: string) {
    dispatchToTasksReducer(removeTaskAC(todolistId, id))
  }
  // добавление тасок (addTask)
  function addTask(todolistId: string, title: string) {
    dispatchToTasksReducer(addTaskAC(todolistId, title))
  }
  // изменение статуса таски changeStatus
  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    dispatchToTasksReducer(changeStatusTaskAC(todolistId, taskId, isDone))
  }
  // Функция которая принимает измененный titleTask и заносит его в стейт
  function changeNewTaskTitle(todolistId: string, taskId: string, title: string) {
    dispatchToTasksReducer(changeTitleTaskAC(todolistId, taskId, title))
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
            return <Grid item>
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
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default AppWithReducers;
