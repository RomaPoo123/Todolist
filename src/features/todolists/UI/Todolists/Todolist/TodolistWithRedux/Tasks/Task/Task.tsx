import React, { ChangeEvent, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch } from "../../../../../../../../common/hooks/useAppDispatch";
import {
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
  removeTaskTC,
  updateTaskTC,
} from "../../../../../../model/tasks-reducer";
import { DomainTodolist } from "../../../../../../model/todolists-reducer";
import { EditableSpan } from "common/components";
import { DomainTask } from "features/todolists/api/tasksApi.types";
import { TaskStatus } from "common/enums/enums";

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
    debugger;
    dispatch(updateTaskTC({ task: { ...task, status } }));
  };
  const onChangeTitleHandler = (newTitle: string) => {
    debugger;
    dispatch(updateTaskTC({ task: { ...task, title: newTitle } }));
  };

  return (
    <li key={task.id} className={task.status === TaskStatus.Completed ? "trueTask" : ""}>
      <Checkbox checked={task.status === TaskStatus.Completed} onChange={onChangeStatusHandler} />
      <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" size="small" onClick={() => removeTaskCallback(task.id)}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
});
