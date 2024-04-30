import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './components/todolist/Todolist';


type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type TodolistsType = {
  title: string
  tasks: Array<TaskType>
}

export let listArray: Array<TodolistsType> = [
  {
    title: "What to lean",
    tasks: [
      { id: 1, title: "CSS&HTML", isDone: true },
      { id: 2, title: "JavaScript", isDone: true },
      { id: 3, title: "React", isDone: false },
    ]
  },
  {
    title: "What to see",
    tasks: [
      { id: 1, title: "Batman", isDone: true },
      { id: 2, title: "Spider-man", isDone: false },
      { id: 3, title: "Game of Thrones", isDone: false },
    ]
  },
]


function App() {
  return (
    <div className="App">
      {listArray.map(list => {
        return (
          <Todolist list={list} />
        )
      })
      }

    </div>
  );
}

export default App;
