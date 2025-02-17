import React, { useState } from "react";
import { todolistId_1, todolistId_2 } from "../id_utils";
import { FilterValueType, TodolistType } from "../App";
import { v1 } from "uuid";

export function useTodolists(onTodolistRemoved: (id: string) => void, onTodolistAdded: (id: string) => void) {
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId_1, title: "what to lean", filter: "all" },
    { id: todolistId_2, title: "what to see", filter: "all" },
  ]);

  // Операции с тудулистами (Todolist-CRUD)
  // добавление нового тудулиста (addTodolist)
  function addTodolist(title: string) {
    let todolistId = v1();
    let newTodolist: TodolistType = {
      id: todolistId,
      title: title,
      filter: "all",
    };
    setTodolists([newTodolist, ...todolists]);
    onTodolistAdded(todolistId);
  }
  // удаление тудулиста (removeTodolist)
  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
    onTodolistRemoved(todolistId);
  }
  // Функция которая принимает измененный titleTodolist и заносит его в стейт
  function changeNewTitleTodolist(todolistId: string, title: string) {
    setTodolists(todolists.map((todolist) => (todolist.id === todolistId ? { ...todolist, title } : todolist)));
  }
  // пуш отфильтрованного массива тасок в стейт
  const cahgeFilter = (todolistId: string, filter: FilterValueType) => {
    setTodolists(todolists.map((el) => (el.id === todolistId ? { ...el, filter } : el)));
  };

  return {
    todolists,
    setTodolists,
    cahgeFilter,
    changeNewTitleTodolist,
    addTodolist,
    removeTodolist,
  } as const;
}
