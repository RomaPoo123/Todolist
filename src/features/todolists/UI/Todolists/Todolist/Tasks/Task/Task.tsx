import React, { ChangeEvent, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import {
  removeTaskTC,
  updateTaskTC,
} from "../../../../../model/tasksSlice";
import { DomainTodolist } from "../../../../../model/todolistSlice";
import { EditableSpan } from "common/components";
import { DomainTask } from "features/todolists/api/tasksApi.types";
import { TaskStatus } from "common/enums/enums";
import s from './Task.module.css'

export type TaskPropsType = {
  todolist: DomainTodolist;
  task: DomainTask;
};

export const Task = React.memo(({ task, todolist }: TaskPropsType) => {
  // Data
  const dispatch = useAppDispatch();
  const { id } = todolist;

  // Функция-обертка для функции удаления тасок (removeTaskHandler)
  const removeTaskCallback = useCallback(
    (taskId: string) => {
      dispatch(removeTaskTC({ todolistId: id, taskId }));
    },
    [dispatch, id],
  );

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status: TaskStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    dispatch(updateTaskTC({ task: { ...task, status } }));
  };
  const onChangeTitleHandler = (newTitle: string) => {
    dispatch(updateTaskTC({ task: { ...task, title: newTitle } }));
  };

  return (
    <li key={task.id} className={`${s.task} ${task.status === TaskStatus.Completed && s.CompletedTask}`}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={onChangeStatusHandler} style={{ paddingLeft: "0px" }} />
        <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
      </div>
      <IconButton aria-label="delete" size="small" onClick={() => removeTaskCallback(task.id)}>
        <DeleteIcon />
      </IconButton>
    </li >
  );
});
