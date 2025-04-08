import React, { ChangeEvent } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components";
import { DomainTask, UpdateTaskModel } from "features/todolists/api/tasksApi.types";
import { TaskStatus } from "common/enums/enums";
import { useRemoveTaskMutation, useUpdateTaskMutation } from "features/todolists/api/tasksApi";
import { DomainTodolist } from "features/todolists/lib/types/types";
import s from './Task.module.css'

export type TaskPropsType = {
  todolist: DomainTodolist;
  task: DomainTask;
};

export const Task = React.memo(({ task, todolist }: TaskPropsType) => {
  // Data
  const { id } = todolist;
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  };

  // Функция-обертка для функции удаления тасок (removeTaskHandler)
  const removeTaskCallback = (taskId: string) => {
    removeTask({ todolistId: id, taskId })
  };

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status: TaskStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    updateTask({ todolistId: id, taskId: task.id, model: { ...model, status } })
  };

  const onChangeTitleHandler = (title: string) => {
    updateTask({ todolistId: id, taskId: task.id, model: { ...model, title } })
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
