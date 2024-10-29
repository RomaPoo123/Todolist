import { combineReducers, createStore, legacy_createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistReducer } from "./todolists-reducer";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer);
