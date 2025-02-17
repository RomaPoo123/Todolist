import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DomainTodolist } from "../../../../model/todolists-reducer";
import { addTaskAC, addTaskTC } from "../../../../model/tasks-reducer";
import { AddItemForm } from "../../../../../../common/components/AddItemForm/AddItemForm";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { useAppDispatch } from "common/hooks/useAppDispatch";

type TodolistPropsType = {
  todolist: DomainTodolist;
};

export const Todolist = React.memo(({ todolist }: TodolistPropsType) => {
  const dispatch = useAppDispatch();
  const { id } = todolist;

  // добавление таски в список тудулиста с по клику кнопки (onClickHandler)
  const addTaskHandler = useCallback(
    (newItemTitle: string) => {
      dispatch(addTaskTC({ todolistId: id, title: newItemTitle }));
    },
    [dispatch, id],
  );

  // отрисовка компоненты (UI)
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
});
