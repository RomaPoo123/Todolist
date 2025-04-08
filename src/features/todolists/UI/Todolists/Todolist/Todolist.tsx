import React, { useCallback } from "react";
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { useCreateTaskMutation } from "features/todolists/api/tasksApi";
import { DomainTodolist } from "features/todolists/lib/types/types";
import s from './Todolist.module.css'

type TodolistPropsType = {
  todolist: DomainTodolist;
};

export const Todolist = React.memo(({ todolist }: TodolistPropsType) => {
  const { id } = todolist;
  const [addTask] = useCreateTaskMutation()

  // добавление таски в список тудулиста с по клику кнопки (onClickHandler)
  const addTaskHandler = useCallback(
    (newItemTitle: string) => {
      addTask({ todolistId: id, title: newItemTitle })
    },
    [id],
  );

  // отрисовка компоненты (UI)
  return (
    <div className={s.todolist}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
});
