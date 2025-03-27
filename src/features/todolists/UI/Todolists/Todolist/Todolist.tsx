import React, { useCallback } from "react";
import { DomainTodolist } from "../../../model/todolistSlice";
// import { addTaskTC } from "../../../model/tasksSlice";
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import s from './TodolistWithRedux.module.css'
import { useCreateTaskMutation } from "features/todolists/api/tasksApi";

type TodolistPropsType = {
  todolist: DomainTodolist;
};

export const Todolist = React.memo(({ todolist }: TodolistPropsType) => {
  const dispatch = useAppDispatch();
  const { id } = todolist;
  const [addTask, { data }] = useCreateTaskMutation()

  // добавление таски в список тудулиста с по клику кнопки (onClickHandler)
  const addTaskHandler = useCallback(
    (newItemTitle: string) => {
      addTask({ todolistId: id, title: newItemTitle })
      // dispatch(addTaskTC({ todolistId: id, title: newItemTitle }));
    },
    [],
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
