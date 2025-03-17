import { addTodolist, removeTodolist } from "./todolistSlice";
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types";
import { tasksApi } from "../api/tasksApi";
import { AppDispatch } from "app/store";
import { ResultCode, TaskStatus } from "common/enums/enums";
import { setAppStatus } from "app/appSlice";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { createSlice } from "@reduxjs/toolkit";

export type TasksType = {
  [todolistId: string]: DomainTask[];
};

// export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
// export type AddTaskActionType = ReturnType<typeof addTaskAC>;
// export type ChangeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>;
// export type ChangeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>;
// export type SetTasksActionType = ReturnType<typeof setTasksAC>;
// export type UpdateTasksActionType = ReturnType<typeof updateTaskAC>;

// type TasksReducerActionType =
//   | RemoveTaskActionType
//   | AddTaskActionType
//   | ChangeTitleTaskActionType
//   | ChangeStatusTaskActionType
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   | SetTasksActionType
//   | UpdateTasksActionType;

const initialState: TasksType = {};


export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  selectors: {
    selectTasks: (state) => state
  },
  extraReducers: builder => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId];
      })
  },
  reducers: create => ({
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.taskId);
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1);
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    }),
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    }),
    updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const index = state[action.payload.task.todoListId].findIndex(tl => tl.id === action.payload.task.id);
      if (index !== -1) {
        state[action.payload.task.todoListId][index] = action.payload.task
      }
    }),
    changeTitleTask: create.reducer<{ todolistId: string, taskId: string, newTitle: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.taskId);
      if (index !== -1) {
        state[action.payload.todolistId][index].title = action.payload.newTitle
      }
    }),
    changeStatusTask: create.reducer<{ todolistId: string, taskId: string, status: TaskStatus }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.taskId);
      if (index !== -1) {
        state[action.payload.todolistId][index].status = action.payload.status
      }
    }),
    clearTasks: create.reducer(() => {
      return {}
    }),
  })
})

export const { removeTask, addTask, setTasks, updateTask, changeTitleTask, changeStatusTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors
























// export const _tasksReducer = (state: TasksType = initialState, action: TasksReducerActionType): TasksType => {
//   switch (action.type) {
//     case "SET-TASKS":
//       const newTasks = DomainTaskSchema.array().parse(action.payload.tasks);
//       // return { ...state, [action.payload.todolistId]: action.payload.tasks };
//       return { ...state, [action.payload.todolistId]: newTasks };
//     case "REMOVE-TASK": {
//       let { todolistId, taskId } = action.payload;
//       return { ...state, [todolistId]: state[todolistId].filter((task) => task.id !== taskId) };
//     };
//     case "ADD-TASK": {
//       let task = action.payload.task;
//       return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] };
//     };
//     case "UPDATE-TASK": {
//       let { task } = action.payload;
//       return {
//         ...state,
//         [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? { ...task } : t)),
//       };
//     };
//     case "todolist/addTodolist":
//       return { [action.payload.todolist.id]: [], ...state };
//     case "REMOVE-TODOLIST":
//       const {
//         [action.todolistId]: [],
//         ...newState
//       } = state;
//       return newState;
//     case "CHANGE-TITLE-TASK":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((task) =>
//           task.id === action.taskId ? { ...task, title: action.newTitle } : task,
//         ),
//       };
//     case "CHANGE-STATUS-TASK":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((task) =>
//           task.id === action.taskId ? { ...task, status: action.status } : task,
//         ),
//       };
//     default:
//       return state;
//   }
// };
// ActionCreater
// export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
//   return { type: "REMOVE-TASK", payload } as const;
// };
// export const addTaskAC = (payload: { task: DomainTask }) => {
//   return { type: "ADD-TASK", payload } as const;
// };
// export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
//   return { type: "SET-TASKS", payload } as const;
// };
// export const updateTaskAC = (payload: { task: DomainTask }) => {
//   return { type: "UPDATE-TASK", payload } as const;
// };
// // для AppWithReducer
// export const changeTitleTaskAC = (todolistId: string, taskId: string, newTitle: string) => {
//   return { type: "CHANGE-TITLE-TASK", todolistId, taskId, newTitle } as const;
// };
// export const changeStatusTaskAC = (todolistId: string, taskId: string, status: TaskStatus) => {
//   return { type: "CHANGE-STATUS-TASK", todolistId, taskId, status } as const;
// };

// ThunkCreater



export const fetchTasksTC = (arg: { todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  tasksApi.getTasks(arg.todolistId).then((res) => {
    dispatch(setAppStatus({ status: "succeeded" }));
    dispatch(setTasks({ todolistId: arg.todolistId, tasks: res.data.items }));
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
  });
};
export const removeTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  tasksApi.removeTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: 'succeeded' }));
      dispatch(removeTask(arg));
    } else {
      handleServerAppError(dispatch, res.data);
    }
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
  }).finally(() => {
    dispatch(setAppStatus({ status: 'idle' }))
  });
};
export const addTaskTC = (arg: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  tasksApi.createTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(addTask({ task: res.data.data.item }));
    } else {
      handleServerAppError(dispatch, res.data);
    }
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
  }).finally(() => {
    dispatch(setAppStatus({ status: 'idle' }))
  });
};
export const updateTaskTC = (arg: { task: DomainTask }) => (dispatch: AppDispatch) => {
  const task = arg.task;
  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  };
  dispatch(setAppStatus({ status: 'loading' }));
  tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(updateTask({ task: res.data.data.item }));
    } else {
      handleServerAppError(dispatch, res.data)
    }
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
  }).finally(() => {
    dispatch(setAppStatus({ status: 'idle' }))
  });;
};
