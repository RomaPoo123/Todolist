import React, { ChangeEvent } from "react";
import { TaskType } from "../../AppWithRedux";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";


export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo(({ task, removeTask, changeTaskStatus, changeTaskTitle }: TaskPropsType) => {
    console.log("Task is called")
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { changeTaskStatus(task.id, e.currentTarget.checked) }
    const onChangeTitleHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }


    return (
        <li key={task.id} className={task.isDone ? "trueTask" : ""}>
            <Checkbox checked={task.isDone}
                onChange={onChangeStatusHandler} />
            <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
            <IconButton aria-label="delete" size="small" onClick={() => removeTask(task.id)} >
                <DeleteIcon />
            </IconButton>
        </li>
    )
})