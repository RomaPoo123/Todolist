import { v1 } from "uuid"



export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todolistId: string
    title: string
}
export type ChangeTitleTodolistActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todolistId: string
    newTitle: string
}
export type ChangeFilterTodolistActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    todolistId: string
    newFilter: FilterValueType
}

type ActionTodolistsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTitleTodolistActionType | ChangeFilterTodolistActionType

const initialState: TodolistType[] = [];

export const todolistReducer = (state: TodolistType[] = initialState, action: ActionTodolistsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [{ id: action.todolistId, title: action.title, filter: "all" }, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, title: action.newTitle } : todolist)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, filter: action.newFilter } : todolist)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", todolistId } as const
}
export const addTodolistAC = (title: string, todolistId = v1()): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title, todolistId } as const
}
export const changeTitleTodolistAC = (todolistId: string, title: string): ChangeTitleTodolistActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", todolistId: todolistId, newTitle: title } as const
}
export const changeFilterTodolistAC = (todolistId: string, filter: FilterValueType): ChangeFilterTodolistActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", todolistId: todolistId, newFilter: filter } as const
}
