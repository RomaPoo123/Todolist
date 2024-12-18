import { combineReducers, createStore, legacy_createStore } from "redux";

import { appReducer } from "./app-reducer";
import { tasksReducer } from "../features/todolists/model/tasks-reducer";
import { todolistReducer } from "../features/todolists/model/todolists-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
