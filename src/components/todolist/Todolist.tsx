import React from "react"
import { listArray } from "../../App"
import { TodolistsType } from "../../App"


type TodolistPropsType = {
    list: TodolistsType
}


export const Todolist = ({ list }: TodolistPropsType) => {

    // logic 
    const tasksList: JSX.Element = list.tasks.length === 0 ? <span>Yor taskslist is empty</span>
        : <ul>
            {list.tasks.map(task => <li>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => { alert(task.id) }}>x</button>
            </li>

            )}
        </ul>

    // UI
    return (
        <div>
            <h3>{list.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            {tasksList}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}