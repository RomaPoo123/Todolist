import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "../../../common/instance/instance"
import { BaseResponse } from "../../../common/types/types"

export const tasksApi = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { todolistId: string, title: string }) {
        const { todolistId, title } = payload
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
    },
    removeTask(payload: { todolistId: string, taskId: string }) {
        const { todolistId, taskId } = payload
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(payload: { taskId: string, todolistId: string, model: UpdateTaskModel }) {
        const { taskId, todolistId, model } = payload;
        return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}