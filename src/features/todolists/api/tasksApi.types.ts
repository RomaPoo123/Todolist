import { TaskPriority, TaskStatus } from "../../../common/enums/enums";
import { z } from "zod";

// Типизация Task с помощью Zod
export const DomainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string(),
})

export type DomainTask = z.infer<typeof DomainTaskSchema>

// Получение Tasks с сервера
export type GetTasksResponse = {
  error: string | null;
  totalcount: number;
  items: DomainTask[];
};
// Типизация изменения Status таски PUT
export type UpdateTaskModel = {
  status: TaskStatus;
  title: string;
  deadline: string | null;
  description: string | null;
  priority: TaskPriority;
  startDate: string | null;
};

// Типизация task

// export type DomainTask = {
//   description: string;
//   title: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   startDate: string;
//   deadline: string;
//   id: string;
//   todoListId: string;
//   order: number;
//   addedDate: string;
// };



