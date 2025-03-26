import { todolistsApiTwo } from './../features/todolists/api/todolistsApi';
import { appReducer, appSlice } from "./appSlice";
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice";
import { todolistReducer, todolistSlice } from "../features/todolists/model/todolistSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApiTwo } from 'features/auth/api/authApi';
import { baseApi } from './baseApi';

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [todolistSlice.name]: todolistReducer,
    [tasksSlice.name]: tasksReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch)


export type AppRootStateType = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
export type AppDispatch = typeof store.dispatch


