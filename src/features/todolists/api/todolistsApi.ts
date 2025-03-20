import { Todolist } from "./todolistsApi.types";
import { instance } from "../../../common/instance/instance";
import { BaseResponse } from "../../../common/types/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DomainTodolist } from "../model/todolistSlice";


export const todolistsApiTwo = createApi({
  reducerPath: 'todolistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: headers => {
      headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
      headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
    },
  }),
  endpoints: (builder) => {
    return {
      getTodolists: builder.query<DomainTodolist[], void>({
        query: () => {
          return {
            method: "GET",
            url: "todo-lists"
          }
        },
        transformResponse: (todolists: Todolist[]) => {
          return todolists.map(tl => ({ ...tl, filter: "all", entityStatus: 'idle' }))
        }
      })
    }
  }
})

export const { useGetTodolistsQuery } = todolistsApiTwo


export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", {
      title,
    });
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title });
  },
  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`);
  },
};
