import { combineReducers, UnknownAction } from "redux";
import { appReducer, appSlice } from "./appSlice";
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice";
import { todolistReducer, todolistSlice } from "../features/todolists/model/todolistSlice";
import { thunk, ThunkDispatch } from "redux-thunk";
import { authReducer, authSlice } from "features/auth/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistReducer,
//   app: appReducer,
//   auth: authReducer,
// });

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));
export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistSlice.name]: todolistReducer,
    [tasksSlice.name]: tasksReducer,
  }
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
export type AppDispatch = typeof store.dispatch
