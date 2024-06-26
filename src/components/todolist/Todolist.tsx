import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import { TaskType, FilterValueType } from "../../App"


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    error: string | null
    filter: FilterValueType
    removeTask: (todolistId: string, id: string) => void
    cahgeFilter: (todolistId: string, filter: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolist: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolist: string) => void
    setError: (error: string | null) => void

}


export const Todolist = ({ id, title, tasks, error, filter, removeTask, cahgeFilter, addTask, changeTaskStatus, removeTodolist, setError }: TodolistPropsType) => {
    // Локальный стейт компоненты
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    // ЛОГИКА!! (logic) 

    // фильтрация тасок (filter)
    let NewFilterTasks = filterTasks(tasks, filter)
    function filterTasks(allTask: Array<TaskType>, filter: FilterValueType) {
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

    // Функции-обертки для функции добавления таски (addTaskHandler
    //добавления в стейт название таски из инпута (onChangeHandler) 
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    // добавление таски в список тудулиста с помощью pressKey (onKeyPressHandler)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if (e.charCode === 13) {
            addTask(id, newTaskTitle);
            setNewTaskTitle("")
        }
    }
    // добавление таски в список тудулиста с по клику кнопки (onClickHandler)
    const onClickHandler = () => {
        addTask(id, newTaskTitle);
        setNewTaskTitle("")
    }
    // функция-обертка для функции изменения статуса таски (changeTaskStatusHandler)
    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        changeTaskStatus(id, taskId, isDone)
    }

    // Функции-обертки для операций с тудулистом (Todolist-CRUD)
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const tasksList: JSX.Element = tasks.length === 0 ? <span>Yor taskslist is empty</span>
        : <ul>
            {NewFilterTasks.map(task => {
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { changeTaskStatusHandler(task.id, e.currentTarget.checked) }
                return (
                    <li key={task.id} className={task.isDone ? "is-Done" : ""}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={onChangeHandler}
                        />
                        <span>{task.title}</span>
                        <button onClick={() => removeTaskHandler(task.id)}>x</button>
                    </li>
                )
            }
            )}
        </ul >
    // создание функции-обертки для фильтрации (FilterHandlers)
    const onAllClickHandler = () => cahgeFilter(id, "all")
    const onActivelClickHandler = () => cahgeFilter(id, "active")
    const onCompletedClickHandler = () => cahgeFilter(id, "completed")
    // UI
    return (
        <div>
            <h3>{title}</h3>
            <button onClick={removeTodolistHandler}>x</button>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickHandler}>+</button>
                {error && <div className="error-message">Field is required</div>}
            </div>
            {tasksList}
            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={filter === "active" ? "active-filter" : ""} onClick={onActivelClickHandler}>Active</button>
                <button className={filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}