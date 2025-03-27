import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { DomainTodolist } from "../../../../model/todolistSlice";
import s from ".//TodolistTitle.module.css"
import { useRemoveTodolistMutation, useUpdateTodolistMutation } from "features/todolists/api/todolistsApi";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolist] = useUpdateTodolistMutation();
  const { title, id, entityStatus } = todolist;

  // удаление тудулиста (removeTodolist)
  const removeTodolistHandler = () => {
    removeTodolist(id)
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
