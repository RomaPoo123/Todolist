import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { FilterValueType, TaskType } from "../../../../../app/AppAndAppWithReducer/App";
import { EditableSpan } from "../../../../../common/components/EditableSpan/EditableSpan";
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType

    removeTask: (todolistId: string, id: string) => void
    cahgeFilter: (todolistId: string, filter: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolist: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolist: string) => void
    changeNewTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeNewTitleTodolist: (id: string, newTitle: string) => void
}


export const Todolist = ({ id, title, tasks, filter, removeTask, cahgeFilter, addTask, changeTaskStatus, removeTodolist, changeNewTaskTitle, changeNewTitleTodolist }: TodolistPropsType) => {
    // Локальный стейт компоненты

    // ЛОГИКА!! (logic) 

    // фильтрация тасок (filter)
    let NewFilterTasks = filterTasks(tasks, filter)
    function filterTasks(allTask: TaskType[], filter: FilterValueType) {
        switch (filter) {
            case "active":
                return allTask.filter(task => task.isDone !== true)
            case "completed":
                return allTask.filter(task => task.isDone !== false)
            default:
                return allTask
        }
    }
    // функции-обертки Handlers

    // Функция-обертка для функции удаления тасок (removeTaskHandler)
    const removeTaskHandler = (taskId: string) => {
        removeTask(id, taskId)
    }
    // добавление таски в список тудулиста с по клику кнопки (onClickHandler)
    const addTaskHandler = (newItemTitle: string) => {
        addTask(id, newItemTitle);
    }
    // функция-обертка для функции изменения статуса таски (changeTaskStatusHandler)
    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        changeTaskStatus(id, taskId, isDone)
    }

    // Функции-обертки для операций с тудулистом (Todolist-CRUD)
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    // Функции-обертки для передачи нового NewTitleTodolist в компоненту App (changeNewTitleTodolist)
    const changeNewTitleTodolistHandler = (newTitle: string) => {
        changeNewTitleTodolist(id, newTitle)
    }

    const tasksList: JSX.Element = tasks.length === 0 ? <span>Yor taskslist is empty</span>
        : <div>
            {NewFilterTasks.map(task => {
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { changeTaskStatusHandler(task.id, e.currentTarget.checked) }
                const onChangeTitleHandler = (newTitle: string) => {
                    changeNewTaskTitle(id, task.id, newTitle)
                }
                return (
                    <li key={task.id} className={task.isDone ? "is-Done" : ""}>
                        <Checkbox checked={task.isDone}
                            onChange={onChangeStatusHandler} />
                        <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
                        <IconButton aria-label="delete" size="small" onClick={() => removeTaskHandler(task.id)} >
                            <DeleteIcon />
                        </IconButton>
                    </li>
                )
            }
            )}
        </div >
    // создание функции-обертки для фильтрации (FilterHandlers)
    const onAllClickHandler = () => cahgeFilter(id, "all")
    const onActivelClickHandler = () => cahgeFilter(id, "active")
    const onCompletedClickHandler = () => cahgeFilter(id, "completed")
    // отрисовка компоненты (UI)
    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeNewTitleTodolistHandler} /></h3>
            {/* <button onClick={removeTodolistHandler}>x</button> */}
            <IconButton aria-label="delete" onClick={removeTodolistHandler} >
                <DeleteIcon />
            </IconButton>
            <AddItemForm addItem={addTaskHandler} />
            {tasksList}
            <div>
                <Button variant={filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
                <Button variant={filter === "active" ? "contained" : "outlined"} onClick={onActivelClickHandler}>Active</Button>
                <Button variant={filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
