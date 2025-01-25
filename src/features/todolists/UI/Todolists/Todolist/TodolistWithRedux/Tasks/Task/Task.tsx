import React, { ChangeEvent, useCallback } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from "../../../../../../../../common/hooks/useAppDispatch";
import { changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, TaskType } from "../../../../../../model/tasks-reducer";
import { TodolistType } from "../../../../../../model/todolists-reducer";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";




export type TaskPropsType = {
    todolist: TodolistType
    task: TaskType
}

export const Task = React.memo(({ task, todolist }: TaskPropsType) => {
    // Data
    const dispatch = useAppDispatch();
    const { id } = todolist;

    // Функция-обертка для функции удаления тасок (removeTaskHandler)
    const removeTaskCallback = useCallback((taskId: string) => {
        dispatch(removeTaskAC(id, taskId))
    }, [dispatch, id]);
    // функция-обертка для функции изменения статуса таски (changeTaskStatusHandler)
    const changeTaskStatusCallback = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(id, taskId, isDone))
    }, [dispatch, id]);
    // Функция-обертка для функции изменения title таски (onChangeTitleHandler)
    const сhangeTitleCallback = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTitleTaskAC(id, taskId, newTitle))
    }, [dispatch, id]);

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { changeTaskStatusCallback(task.id, e.currentTarget.checked) }
    const onChangeTitleHandler = (newTitle: string) => {
        сhangeTitleCallback(task.id, newTitle)
    }

    return (
        <li key={task.id} className={task.isDone ? "trueTask" : ""}>
            <Checkbox checked={task.isDone}
                onChange={onChangeStatusHandler} />
            <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
            <IconButton aria-label="delete" size="small" onClick={() => removeTaskCallback(task.id)} >
                <DeleteIcon />
            </IconButton>
        </li>
    )
})