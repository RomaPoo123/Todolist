import { List } from "@mui/material"
import { useAppSelector } from "../../../../../../../common/hooks/useAppSelector"
import { selectTasks } from "../../../../../model/tasksSelector"
import { TodolistType } from "../../../../../model/todolists-reducer"
import { Task } from "./Task/Task"

type Props = {
    todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {

    // берем часть Store, а именно tasks
    const tasks = useAppSelector(selectTasks);

    // кладем в переменую таски тудулиста
    const allTodolistTasks = tasks[todolist.id];

    let tasksForTodolist = allTodolistTasks;

    //  если значение filter active филтруем таски
    if (todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }
    //  если значение completed active филтруем таски
    if (todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {
                tasksForTodolist.length === 0 ?
                    <span>Тасок нет</span> :
                    <List>
                        {tasksForTodolist.map(task => {
                            return <Task todolist={todolist} task={task} />
                        })}
                    </List>
            }
        </>
    )
}