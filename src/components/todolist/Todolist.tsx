import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import { TaskType, FilterValueType } from "../../App"


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    cahgeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}


export const Todolist = ({ title, tasks, removeTask, cahgeFilter, addTask }: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    // logic 
    const tasksList: JSX.Element = tasks.length === 0 ? <span>Yor taskslist is empty</span>
        : <ul>
            {tasks.map(task => {
                const onRemoveTaskHandler = () => removeTask(task.id);
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <button onClick={onRemoveTaskHandler}>x</button>
                    </li>
                )
            }


            )}
        </ul>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const onClickHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle("")
    }
    // FilterHandlers
    const onAllClickHandler = () => cahgeFilter("All")
    const onActivelClickHandler = () => cahgeFilter("Active")
    const onCompletedClickHandler = () => cahgeFilter("Completed")


    // UI
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler} />
                <button onClick={onClickHandler}>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActivelClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}