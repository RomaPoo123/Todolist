import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';

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

  // Data (исходные данные)
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

  const [error, setError] = useState<string | null>(null)

  // logic (логика приложения)
  // Фильтрация тасок filter
  function filterTasks(allTask: Array<TaskType>, filter: FilterValueType) {
    switch (filter) {
      case "active":
        return allTask.filter(task => task.isDone !== true)
      case "completed":
        return allTask.filter(task => task.isDone !== false)
      default:
        return allTask
    }
  }
  const cahgeFilter = (todolistId: string, filter: FilterValueType) => {
    setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter } : el))
  }
  // Удаление тасок remove
  function removeTask(id: string) {
    // let newTasksState = tasks.filter(task => task.id !== id)
    // setTasks(newTasksState);
  }
  // добавление тасок add
  function addTask(title: string) {
    // if (title.trim() === "") {
    //   setError("Title is required")
    //   return
    // }
    // let newTask: TaskType = { id: v1(), title: title.trim(), isDone: false }
    // setTasks([newTask, ...tasks])
  }
  // изменение статуса таски changeStatus
  function changeStatus(taskId: string, isDone: boolean) {
    // let task: TaskType | undefined = tasks.find(t => t.id === taskId);
    // if (task) { task.isDone = isDone }
    // setTasks([...tasks]);

  }

  return (
    <div className="App">
      {todolists.map((tl) => {
        let NewFilterTasks = filterTasks(tasks[tl.id], tl.filter)
        return <Todolist
          key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={NewFilterTasks}
          error={error}
          filter={tl.filter}
          removeTask={removeTask}
          cahgeFilter={cahgeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          setError={setError}
        />
      })}
    </div>
  )
}

export default App;
