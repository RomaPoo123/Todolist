import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';
/*  Типизация большого обьекта, в котором хранятся тудулисты

type TodolistsType = {
  id:number
  title: string
  tasks: Array<TaskType>
}
*/
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"


function App() {
  // Data
  /* Обьект с тудулистами
    let listArray: Array<TodolistsType> = [
      { 
        id: 1,
        title: "What to lean",
        tasks: [
          { id: 1, title: "CSS&HTML", isDone: true },
          { id: 2, title: "JavaScript", isDone: true },
          { id: 3, title: "React", isDone: false },
        ]
      },
      {
        id: 2,
        title: "What to see",
        tasks: [
          { id: 1, title: "Batman", isDone: true },
          { id: 2, title: "Spider-man", isDone: false },
          { id: 3, title: "Game of Thrones", isDone: false },
        ]
      },
    ]
  */
  //  logic
  const [tasks, setTasks] = React.useState([
    { id: v1(), title: "CSS&HTML", isDone: true },
    { id: v1(), title: "JavaScript", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
  ])
  console.log(tasks);

  const [filter, setFilter] = React.useState<FilterValueType>("All")

  const cahgeFilter = (filter: FilterValueType) => {
    setFilter(filter)
  }

  function filterTasks(allTask: Array<TaskType>, filter: FilterValueType) {
    switch (filter) {
      case "Active":
        return allTask.filter(task => task.isDone !== true)
      case "Completed":
        return allTask.filter(task => task.isDone !== false)
      default:
        return allTask
    }
  }
  let FilterNewArr: Array<TaskType> = filterTasks(tasks, filter)

  function removeTask(id: string) {
    let newTasksState = tasks.filter(task => task.id !== id)
    setTasks(newTasksState);
  }
  function addTask(title: string) {
    let newTask: TaskType = { id: v1(), title: title, isDone: false }
    setTasks([newTask, ...tasks])
  }


  return (
    <div className="App">
      <Todolist
        title={"what to lean"}
        tasks={FilterNewArr}
        removeTask={removeTask}
        cahgeFilter={cahgeFilter}
        addTask={addTask}
      />
      {/*  {listArray.map(list => {
        return (
          <Todolist list={list} />
        )
      })} */}
    </div>
  )
}

export default App;
