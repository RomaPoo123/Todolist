import { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan";
import {
  DomainTodolist,
  removeTodolistTC,
  updateTodolistTC,
} from "../../../../../model/todolists-reducer";
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import s from ".//TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const { title, id, entityStatus } = todolist;

  // удаление тудулиста (removeTodolist)
  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodolistTC({ todolistId: id }));
  }, [dispatch]);
  // Функция которая принимает измененный titleTodolist и заносит его в стейт
  const updateTodolistHandler = useCallback(
    (title: string) => {
      dispatch(updateTodolistTC({ id, title }));
    },
    [dispatch],
  );

  return (
    <div className={s.headerTodolist}>
      <h3>
        <EditableSpan title={title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
