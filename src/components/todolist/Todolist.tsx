import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import { TaskType, FilterValueType } from "../../App"


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    error: string | null
    filter: FilterValueType
    removeTask: (id: string) => void
    cahgeFilter: (todolistId: string, filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    setError: (error: string | null) => void

}


export const Todolist = ({ id, title, tasks, error, filter, removeTask, cahgeFilter, addTask, changeTaskStatus, setError }: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    // logic 
    const tasksList: JSX.Element = tasks.length === 0 ? <span>Yor taskslist is empty</span>
        : <ul>
            {tasks.map(task => {
                const onRemoveTaskHandler = () => removeTask(task.id);
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { changeTaskStatus(task.id, e.currentTarget.checked) }
                return (
                    <li key={task.id} className={task.isDone ? "is-Done" : ""}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={onChangeHandler}
                        />
                        <span>{task.title}</span>
                        <button onClick={onRemoveTaskHandler}>x</button>
                    </li>
                )
            }


            )}
        </ul>

    // Handlers
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

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
    const onAllClickHandler = () => cahgeFilter(id, "all")
    const onActivelClickHandler = () => cahgeFilter(id, "active")
    const onCompletedClickHandler = () => cahgeFilter(id, "completed")


    // UI
    return (
        <div>
            <h3>{title}</h3>
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