import { todolistsApiTwo } from './../features/todolists/api/todolistsApi';
import { appReducer, appSlice } from "./appSlice";
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice";
import { todolistReducer, todolistSlice } from "../features/todolists/model/todolistSlice";
import { authReducer, authSlice } from "features/auth/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistSlice.name]: todolistReducer,
    [tasksSlice.name]: tasksReducer,
    [todolistsApiTwo.reducerPath]: todolistsApiTwo.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistsApiTwo.middleware),
});

setupListeners(store.dispatch)


export type AppRootStateType = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
export type AppDispatch = typeof store.dispatch


