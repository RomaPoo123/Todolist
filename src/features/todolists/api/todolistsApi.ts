import { Todolist } from "./todolistsApi.types";
import { instance } from "../../../common/instance/instance";
import { BaseResponse } from "../../../common/types/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DomainTodolist } from "../model/todolistSlice";
import { baseApi } from "app/baseApi";


export const todolistsApiTwo = baseApi.injectEndpoints({
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
        },
        providesTags: ["Todolist"],
      }),
      createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            method: "POST",
            url: "todo-lists",
            body: { title }
          }
        },
        invalidatesTags: ["Todolist"]
      }),
      removeTodolist: builder.mutation<BaseResponse, string>({
        query: (id) => {
          return {
            method: "DELETE",
            url: `todo-lists/${id}`
          }
        },
        invalidatesTags: ["Todolist"]
      }),
      updateTodolist: builder.mutation<BaseResponse, { id: string, title: string }>({
        query: ({ id, title }) => {
          return {
            method: "PUT",
            url: `todo-lists/${id}`,
            body: { title }
          }
        },
        invalidatesTags: ["Todolist"]
      })
    }
  }
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistMutation } = todolistsApiTwo


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
