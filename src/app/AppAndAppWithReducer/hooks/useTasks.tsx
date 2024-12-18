import React, { useState } from "react"
import { TasksType, TaskType } from "../App"
import { todolistId_1, todolistId_2 } from "../id_utils"
import { v1 } from "uuid"



export function useTasks() {
    const [tasks, setTasks] = useState<TasksType>({
        [todolistId_1]: [
            { id: v1(), title: "CSS&HTML", isDone: true },
            { id: v1(), title: "JavaScript", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: "Game of Thrones", isDone: true },
            { id: v1(), title: "Spider-man", isDone: true },
            { id: v1(), title: "Batman", isDone: false },
        ]
    })

    // Операции с тасками (Tasks-CRUD)

    // Удаление тасок (removeTask)
    function removeTask(todolistId: string, id: string) {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id) });
    }
    // добавление тасок (addTask)
    function addTask(todolistId: string, title: string) {
        let newTask: TaskType = { id: v1(), title: title.trim(), isDone: false }
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }
    // изменение статуса таски changeStatus
    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task) })
    }
    // Функция которая принимает измененный titleTask и заносит его в стейт
    function changeNewTaskTitle(todolistId: string, taskId: string, title: string) {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task) })
    }
    // удаление массива тасок при удалении тудулиста
    function completelyRemoveTasksForTodolist(todolistId: string) {
        delete tasks[todolistId];
        setTasks(tasks)
    }
    // добавление массива при добавлении тудулиста
    function addStateForNewTodolist(todolistId: string) {
        setTasks({ ...tasks, [todolistId]: [] })
    }

    return {
        tasks,
        removeTask,
        addTask,
        changeStatus,
        changeNewTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    }
}