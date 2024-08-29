import { TaskType } from "../App";
import { TasksType } from "../App";
import { v1 } from "uuid";

import { RemoveTodolistActionType } from "./todolists-reducer";
import { AddTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>
export type ChangeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>



type TasksReducerActionType = RemoveTaskActionType | AddTaskActionType | ChangeTitleTaskActionType | ChangeStatusTaskActionType | RemoveTodolistActionType | AddTodolistActionType

export const tasksReducer = (state: TasksType, action: TasksReducerActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return { ...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId) }
        case "ADD-TASK":
            return { ...state, [action.todolistId]: [{ id: v1(), title: action.title, isDone: false }, ...state[action.todolistId]] }
        case "CHANGE-TITLE-TASK":
            return { ...state, [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId ? { ...task, title: action.newTitle } : task) }
        case "CHANGE-STATUS-TASK":
            return { ...state, [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId ? { ...task, isDone: action.isDone } : task) }
        case "ADD-TODOLIST":
            return { ...state, [action.todolistId]: [] }

        case "REMOVE-TODOLIST":
            const { [action.todolistId]: [], ...newState } = state
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: "REMOVE-TASK", todolistId, taskId } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return { type: "ADD-TASK", todolistId, title } as const
}
export const changeTitleTaskAC = (todolistId: string, taskId: string, newTitle: string) => {
    return { type: "CHANGE-TITLE-TASK", todolistId, taskId, newTitle } as const
}
export const changeStatusTaskAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return { type: "CHANGE-STATUS-TASK", todolistId, taskId, isDone } as const
}