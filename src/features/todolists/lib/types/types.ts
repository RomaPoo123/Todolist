import { RequestStatus } from "app/appSlice";
import { Todolist } from "features/todolists/api/todolistsApi.types";

export type FilterValueType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
    filter: FilterValueType;
    entityStatus: RequestStatus;
};