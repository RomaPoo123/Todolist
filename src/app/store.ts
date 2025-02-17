import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux";
import { appReducer } from "./app-reducer";
import { tasksReducer } from "../features/todolists/model/tasks-reducer";
import { todolistReducer } from "../features/todolists/model/todolists-reducer";
import { thunk, ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
});

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
