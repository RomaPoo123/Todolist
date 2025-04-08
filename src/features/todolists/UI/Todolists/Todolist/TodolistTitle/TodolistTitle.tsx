import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { todolistsApiTwo, useRemoveTodolistMutation, useUpdateTodolistMutation } from "features/todolists/api/todolistsApi";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { RequestStatus } from "app/appSlice";
import { DomainTodolist } from "features/todolists/lib/types/types";
import s from ".//TodolistTitle.module.css"


type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolist] = useUpdateTodolistMutation();
  const { title, id, entityStatus } = todolist;

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApiTwo.util.updateQueryData(
        "getTodolists",
        undefined,
        (todolists: DomainTodolist[]) => {
          const todolist = todolists.find((todolist) => todolist.id === id)
          if (todolist) {
            todolist.entityStatus = status;
          }
        })
    )
  }

  // удаление тудулиста (removeTodolist)
  const removeTodolistHandler = () => {
    updateQueryData("loading");
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData("failed");
      })
  };
  // Функция которая принимает измененный titleTodolist и заносит его в стейт
  const updateTodolistHandler = (title: string) => {
    updateTodolist({ id, title })
  }

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
