import React from "react"
import { TaskType, FilterValueType } from "../../App"


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    cahgeFilter: (filter: FilterValueType) => void
}


export const Todolist = ({ title, tasks, removeTask, cahgeFilter }: TodolistPropsType) => {


    // logic 
    const tasksList: JSX.Element = tasks.length === 0 ? <span>Yor taskslist is empty</span>
        : <ul>
            {tasks.map(task => <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
            </li>
            )}
        </ul>

    // UI
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={() => cahgeFilter("All")}>All</button>
                <button onClick={() => cahgeFilter("Active")}>Active</button>
                <button onClick={() => cahgeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}