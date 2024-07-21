import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/addItemForm/AddItemForm';

// Types
export type FilterValueType = "all" | "active" | "completed"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksType = {
  [todolistId: string]: TaskType[]
}




function App() {

  // ИСХОДНЫЕ ДАННЫЕ, ГЛОБАЛЬНЫЙ СТЕЙТ (Data)
  let todolistId_1 = v1();
  let todolistId_2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId_1, title: "what to lean", filter: "all" },
    { id: todolistId_2, title: "what to see", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksType>({
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
    let todolistId = v1();
    let newTodolist: TodolistType = { id: todolistId, title: title, filter: "all" }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [todolistId]: [] })
  }
  // удаление тудулиста (removeTodolist)
  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
    delete tasks[todolistId];
    setTasks(tasks)
  }
  // Функция которая принимает измененный titleTodolist и заносит его в стейт
  function changeNewTitleTodolist(todolistId: string, title: string) {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
  }

  // Операции с тасками (Tasks-CRUD)
  // пуш отфильтрованного массива тасок в стейт
  const cahgeFilter = (todolistId: string, filter: FilterValueType) => {
    setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter } : el))
  }
  // Удаление тасок (removeTask)
  function removeTask(todolistId: string, id: string) {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id) });
  }
  // добавление тасок (addTask)
  function addTask(todolistId: string, title: string) {
    let newTask: TaskType = { id: v1(), title: title.trim(), isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }
  // изменение статуса таски changeStatus
  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task) })
  }
  // Функция которая принимает измененный titleTask и заносит его в стейт
  function changeNewTaskTitle(todolistId: string, taskId: string, title: string) {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task) })
  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {
        return <Todolist
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
      })}
    </div>
  )
}

export default App;
