import React, { ChangeEvent, useCallback } from "react"
import "./Todolist.css"
import { TaskType, FilterValueType } from "../../AppWithRedux"
import { AddItemForm } from "../addItemForm/AddItemForm"
import { EditableSpan } from "../editableSpan/EditableSpan"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeFilterTodolistAC } from "../../state/todolists-reducer";
import { addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC } from "../../state/tasks-reducer";
import { Task } from "../task/Task"



type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType

    removeTodolist: (todolist: string) => void
    changeNewTitleTodolist: (id: string, newTitle: string) => void
}


export const Todolist = React.memo(({ id, title, tasks, filter, removeTodolist, changeNewTitleTodolist }: TodolistPropsType) => {
    console.log("Todolist is called")
    const dispatch = useDispatch();

    // ЛОГИКА!! (logic) 
    // Операции с todolists (Todolists-CRUD)
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    // Функции-обертки для передачи нового NewTitleTodolist в компоненту App (changeNewTitleTodolist)
    const changeNewTitleTodolistHandler = useCallback((newTitle: string) => {
        changeNewTitleTodolist(id, newTitle)
    }, [id, changeNewTitleTodolist])

    // Операции с тасками (Tasks-CRUD)
    // функции-обертки Handlers
    // добавление таски в список тудулиста с по клику кнопки (onClickHandler)
    const addTaskHandler = useCallback((newItemTitle: string) => {
        dispatch(addTaskAC(id, newItemTitle))
    }, [dispatch, id]);
    // Функция-обертка для функции удаления тасок (removeTaskHandler)
    const removeTaskHandler = useCallback((taskId: string) => {
        dispatch(removeTaskAC(id, taskId))
    }, [dispatch, id]);
    // функция-обертка для функции изменения статуса таски (changeTaskStatusHandler)
    const changeTaskStatusHandler = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(id, taskId, isDone))
    }, [dispatch, id]);
    // Функция-обертка для функции изменения title таски (onChangeTitleHandler)
    const сhangeTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTitleTaskAC(id, taskId, newTitle))
    }, [dispatch, id]);

    // фильтрация тасок (filter)
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
    let NewFilterTasks = filterTasks(tasks, filter)
    // пуш отфильтрованного массива тасок в стейт
    const cahgeFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(changeFilterTodolistAC(todolistId, filter,))
    }, [dispatch])
    // создание функции-обертки для фильтрации (FilterHandlers)
    const onAllClickHandler = useCallback(() => cahgeFilter(id, "all"), [cahgeFilter, id])
    const onActivelClickHandler = useCallback(() => cahgeFilter(id, "active"), [cahgeFilter, id])
    const onCompletedClickHandler = useCallback(() => cahgeFilter(id, "completed"), [cahgeFilter, id])


    const tasksList: JSX.Element = tasks.length === 0 ? <span>Yor taskslist is empty</span>
        : <div>
            {NewFilterTasks.map(task => <Task key={task.id} task={task} removeTask={removeTaskHandler} changeTaskStatus={changeTaskStatusHandler} changeTaskTitle={сhangeTitleHandler} />
            )}
        </div >


    // отрисовка компоненты (UI)
    return (
        <div>
            <div className="headerTodolist">
                <h3><EditableSpan title={title} onChange={changeNewTitleTodolistHandler} /></h3>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} >
                    <DeleteIcon />
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskHandler} />
            <ul className="tasksList">
                {tasksList}
            </ul>
            <div className="BtnsPanel">
                <Button size="small" variant={filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
                <Button size="small" variant={filter === "active" ? "contained" : "outlined"} onClick={onActivelClickHandler}>Active</Button>
                <Button size="small" variant={filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})
