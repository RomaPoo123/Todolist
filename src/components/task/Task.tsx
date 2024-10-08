import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "../editableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { TaskType } from "../../AppWithRedux";
import { changeStatusTaskAC, changeTitleTaskAC, removeTaskAC } from "../../state/tasks-reducer";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo(({ todolistId, task }: TaskPropsType) => {
    console.log("Task is called")
    const dispatch = useDispatch();

    const removeTask = () => {
        dispatch(removeTaskAC(todolistId, task.id))
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => { dispatch(changeStatusTaskAC(todolistId, task.id, e.currentTarget.checked)) }
    const onChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTitleTaskAC(todolistId, task.id, newTitle))
    }, [dispatch, todolistId, task.id])
    return (
        <li key={task.id} className={task.isDone ? "trueTask" : ""}>
            <Checkbox checked={task.isDone}
                onChange={onChangeStatus} />
            <EditableSpan title={task.title} onChange={onChangeTitle} />
            <IconButton aria-label="delete" size="small" onClick={() => removeTask()} >
                <DeleteIcon />
            </IconButton>
        </li>
    )
})