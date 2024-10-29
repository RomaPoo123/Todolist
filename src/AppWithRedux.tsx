import React, { useCallback, useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/addItemForm/AddItemForm';
import { Header } from './components/header/Header'
import { Container, Grid, Paper } from '@mui/material';
import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC } from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

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

const AppWithRedux = React.memo(() => {
  console.log("App is called")

  // ИСХОДНЫЕ ДАННЫЕ (Data)

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

  // ЛОГИКА!! CRUD-операции (logic)

  // Операции с тудулистами (Todolist-CRUD)
  // добавление нового тудулиста (addTodolist)
  const addTodolist = useCallback((title: string) => {
    let action = addTodolistAC(title);
    dispatch(action);

  }, [dispatch])
  // удаление тудулиста (removeTodolist)
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))

  }, [dispatch])
  // Функция которая принимает измененный titleTodolist и заносит его в стейт
  const changeNewTitleTodolist = useCallback((todolistId: string, title: string) => {
    dispatch(changeTitleTodolistAC(todolistId, title))
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
          {todolists.map((tl) => {
            return <Grid item key={tl.id}>
              <Paper elevation={3} style={{ padding: "30px" }}>
                <Todolist
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasks[tl.id]}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeNewTitleTodolist={changeNewTitleTodolist}
                />
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  )
})

export default AppWithRedux;
