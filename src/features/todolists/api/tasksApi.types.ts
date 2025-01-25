import { TaskPriority, TaskStatus } from "../../../common/enums/enums"
import { FieldError } from "../../../common/types/types"





// Типизация task
export type DomainTask = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
// Получение Tasks с сервера
export type GetTasksResponse = {
    error: string | null
    totalcount: number
    items: DomainTask[]
}
// Типизация изменения Status таски PUT
export type UpdateTaskModel = {
    status: TaskStatus
    title: string
    deadline: string
    description: string
    priority: TaskPriority
    startDate: string
}
