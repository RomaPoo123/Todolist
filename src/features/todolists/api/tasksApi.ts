import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types";
import { instance } from "../../../common/instance/instance";
import { BaseResponse } from "../../../common/types/types";
import { baseApi } from "app/baseApi";


export const tasksApiTwo = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTasks: builder.query<DomainTask[], string>({
        query: (todolistId) => {
          return {
            method: "GET",
            url: `todo-lists/${todolistId}/tasks`
          }
        },
        providesTags: ["Task"]
      }),
      createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string, title: string }>({
        query: ({ todolistId, title }) => {
          return {
            method: "GET",
            url: `todo-lists/${todolistId}/tasks`,
            body: { title }
          }
        },
        invalidatesTags: ['Task']
      }),
      removeTask: builder.mutation<BaseResponse, { todolistId: string, taskId: string }>({
        query: ({ todolistId, taskId }) => {
          return {
            method: "DELETE",
            url: `todo-lists/${todolistId}/tasks/${taskId}`
          }
        },
        invalidatesTags: ['Task']
      }),
      updateTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string, taskId: string, model: UpdateTaskModel }>({
        query: ({ todolistId, taskId, model }) => {
          return {
            method: "PUT",
            url: `todo-lists/${todolistId}/tasks/${taskId}`,
            body: { model }
          }
        },
        invalidatesTags: ['Task']
      }),
    }
  }
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useRemoveTaskMutation,
  useUpdateTaskMutation } = tasksApiTwo





export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload;
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title });
  },
  removeTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload;
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(payload: { taskId: string; todolistId: string; model: UpdateTaskModel }) {
    const { taskId, todolistId, model } = payload;
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
