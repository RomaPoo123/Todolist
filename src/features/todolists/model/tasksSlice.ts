import { addTodolist, removeTodolist } from "./todolistSlice";
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types";
import { AppDispatch } from "app/store";
import { ResultCode, TaskStatus } from "common/enums/enums";
import { setAppStatus } from "app/appSlice";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { createSlice } from "@reduxjs/toolkit";
import { clearState } from "common/actions/clearState";

export type TasksType = {
  [todolistId: string]: DomainTask[];
};


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
      .addCase(clearState.type, () => {
        return {}
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
    // clearTasks: create.reducer(() => {
    //   return {}
    // }),
  })
})

export const { removeTask, addTask, setTasks, updateTask, changeTitleTask, changeStatusTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const { selectTasks } = tasksSlice.selectors

// ThunkCreater



// export const fetchTasksTC = (arg: { todolistId: string }) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }));
//   tasksApi.getTasks(arg.todolistId).then((res) => {
//     dispatch(setAppStatus({ status: "succeeded" }));
//     dispatch(setTasks({ todolistId: arg.todolistId, tasks: res.data.items }));
//   }).catch((err) => {
//     handleServerNetworkError(err.massage, dispatch)
//   });
// };
// export const removeTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }));
//   tasksApi.removeTask(arg).then((res) => {
//     if (res.data.resultCode === ResultCode.Success) {
//       dispatch(setAppStatus({ status: 'succeeded' }));
//       dispatch(removeTask(arg));
//     } else {
//       handleServerAppError(dispatch, res.data);
//     }
//   }).catch((err) => {
//     handleServerNetworkError(err.massage, dispatch)
//   }).finally(() => {
//     dispatch(setAppStatus({ status: 'idle' }))
//   });
// };
// export const addTaskTC = (arg: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }));
//   tasksApi.createTask(arg).then((res) => {
//     if (res.data.resultCode === ResultCode.Success) {
//       dispatch(setAppStatus({ status: "succeeded" }));
//       dispatch(addTask({ task: res.data.data.item }));
//     } else {
//       handleServerAppError(dispatch, res.data);
//     }
//   }).catch((err) => {
//     handleServerNetworkError(err.massage, dispatch)
//   }).finally(() => {
//     dispatch(setAppStatus({ status: 'idle' }))
//   });
// };
// export const updateTaskTC = (arg: { task: DomainTask }) => (dispatch: AppDispatch) => {
//   const task = arg.task;
//   const model: UpdateTaskModel = {
//     status: task.status,
//     title: task.title,
//     deadline: task.deadline,
//     description: task.description,
//     priority: task.priority,
//     startDate: task.startDate,
//   };
//   dispatch(setAppStatus({ status: 'loading' }));
//   tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
//     if (res.data.resultCode === ResultCode.Success) {
//       dispatch(setAppStatus({ status: "succeeded" }));
//       dispatch(updateTask({ task: res.data.data.item }));
//     } else {
//       handleServerAppError(dispatch, res.data)
//     }
//   }).catch((err) => {
//     handleServerNetworkError(err.massage, dispatch)
//   }).finally(() => {
//     dispatch(setAppStatus({ status: 'idle' }))
//   });;
// };
