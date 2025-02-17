import { v1 } from "uuid";
import { RemoveTodolistActionType } from "./todolists-reducer";
import { AddTodolistActionType } from "./todolists-reducer";
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types";
import { tasksApi } from "../api/tasksApi";
import { AppDispatch } from "app/store";
import { TaskStatus } from "common/enums/enums";

export type TasksType = {
  [todolistId: string]: DomainTask[];
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>;
export type ChangeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type UpdateTasksActionType = ReturnType<typeof updateTaskAC>;

type TasksReducerActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTitleTaskActionType
  | ChangeStatusTaskActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTasksActionType
  | UpdateTasksActionType;

const initialState: TasksType = {};
export const tasksReducer = (state: TasksType = initialState, action: TasksReducerActionType): TasksType => {
  switch (action.type) {
    case "SET-TASKS":
      return { ...state, [action.payload.todolistId]: action.payload.tasks };
    case "REMOVE-TASK": {
      let { todolistId, taskId } = action.payload;
      return { ...state, [todolistId]: state[todolistId].filter((task) => task.id !== taskId) };
    }
    case "ADD-TASK": {
      let task = action.payload.task;
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] };
    }
    case "UPDATE-TASK": {
      let { task } = action.payload;
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? { ...task } : t)),
      };
    }
    case "ADD-TODOLIST":
      return { [action.payload.todolist.id]: [], ...state };
    case "REMOVE-TODOLIST":
      const {
        [action.todolistId]: [],
        ...newState
      } = state;
      return newState;
    case "CHANGE-TITLE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, title: action.newTitle } : task,
        ),
      };
    case "CHANGE-STATUS-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, status: action.status } : task,
        ),
      };
    default:
      return state;
  }
};
// ActionCreater
export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE-TASK", payload } as const;
};
export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const;
};
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASKS", payload } as const;
};
export const updateTaskAC = (payload: { task: DomainTask }) => {
  return { type: "UPDATE-TASK", payload } as const;
};
// для AppWithReducer
export const changeTitleTaskAC = (todolistId: string, taskId: string, newTitle: string) => {
  return { type: "CHANGE-TITLE-TASK", todolistId, taskId, newTitle } as const;
};
export const changeStatusTaskAC = (todolistId: string, taskId: string, status: TaskStatus) => {
  return { type: "CHANGE-STATUS-TASK", todolistId, taskId, status } as const;
};

// ThunkCreater
export const fetchTasksTC = (arg: { todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(arg.todolistId).then((res) => {
    dispatch(setTasksAC({ todolistId: arg.todolistId, tasks: res.data.items }));
  });
};
export const removeTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
  tasksApi.removeTask(arg).then((res) => {
    dispatch(removeTaskAC(arg));
  });
};
export const addTaskTC = (arg: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }));
  });
};
export const updateTaskTC = (arg: { task: DomainTask }) => (dispatch: AppDispatch) => {
  const task = arg.task;
  debugger;
  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  };
  tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
    dispatch(updateTaskAC({ task: res.data.data.item }));
  });
};
