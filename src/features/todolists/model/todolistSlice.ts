import { action } from '@storybook/addon-actions';
import { AppDispatch } from "../../../app/store";
import { Todolist, TodolistSchema } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { RequestStatus, setAppStatus } from "app/appSlice";
import { ResultCode } from "common/enums/enums";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { createSlice } from "@reduxjs/toolkit";
import { clearState } from 'common/actions/clearState';

export type FilterValueType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
  filter: FilterValueType;
  entityStatus: RequestStatus;
};

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};
export type AddTodolistActionType = ReturnType<typeof addTodolist>;
// export type ChangeTitleTodolistActionType = {
//   type: "CHANGE-TODOLIST-TITLE";
//   todolistId: string;
//   newTitle: string;
// };
// export type ChangeFilterTodolistActionType = {
//   type: "CHANGE-TODOLIST-FILTER";
//   todolistId: string;
//   newFilter: FilterValueType;
// };
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
// export type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

// type ActionTodolistsType =
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   | ChangeTitleTodolistActionType
//   | ChangeFilterTodolistActionType
//   | SetTodolistsActionType
//   | changeTodolistEntityStatusActionType;

const initialState: DomainTodolist[] = [];


export const todolistSlice = createSlice({
  name: "todolist",
  initialState: initialState,
  selectors: { selectTodolists: (state) => state },
  extraReducers: builder => {
    builder
      .addCase(clearState.type, () => {
        return []
      })
  },
  reducers: create => ({
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      if (index !== -1) { state.splice(index, 1); }
    }),
    addTodolist: create.reducer<{ todolist: DomainTodolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    }),
    changeTitleTodolist: create.reducer<{ todolistId: string, title: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      state[index].title = action.payload.title;
    }),
    changeFilterTodolist: create.reducer<{ todolistId: string, filter: FilterValueType }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      state[index].filter = action.payload.filter;
    }),
    changeTodolistEntityStatus: create.reducer<{ todolistId: string, entityStatus: RequestStatus }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      state[index].entityStatus = action.payload.entityStatus;
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: 'idle' }))
    })
  })
});

export const { removeTodolist, addTodolist, changeTitleTodolist, changeFilterTodolist, changeTodolistEntityStatus, setTodolists } = todolistSlice.actions;
export const todolistReducer = todolistSlice.reducer;
export const { selectTodolists } = todolistSlice.selectors;


// export const _todolistReducer = (
//   state: DomainTodolist[] = initialState,
//   action: ActionTodolistsType,
// ): DomainTodolist[] => {
//   switch (action.type) {
//     case "SET-TODOLISTS":
//       const newTodolists = TodolistSchema.array().parse(action.todolists);
//       // return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
//       return newTodolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
//     case "REMOVE-TODOLIST":
//       return state.filter((todolist) => todolist.id !== action.todolistId);
//     case "ADD-TODOLIST": {
//       const todolist = action.payload.todolist;
//       return [todolist, ...state];
//     };
//     case "CHANGE-TODOLIST-TITLE":
//       return state.map((todolist) =>
//         todolist.id === action.todolistId ? { ...todolist, title: action.newTitle } : todolist,
//       );
//     case "CHANGE-TODOLIST-FILTER":
//       return state.map((todolist) =>
//         todolist.id === action.todolistId ? { ...todolist, filter: action.newFilter } : todolist,
//       );
//     case "CHANGE-TODOLIST-ENTITY-STATUS":
//       return state.map((todolist) =>
//         todolist.id === action.payload.id ? { ...todolist, entityStatus: action.payload.entityStatus } : todolist);
//     default:
//       return state;
//   }
// };

// ActionCreater AC
// export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//   return { type: "REMOVE-TODOLIST", todolistId } as const;
// };
// export const addTodolistAC = (payload: { todolist: DomainTodolist }) => {
//   return { type: "ADD-TODOLIST", payload } as const;
// };
// export const changeTitleTodolistAC = (payload: {
//   todolistId: string;
//   title: string;
// }): ChangeTitleTodolistActionType => {
//   return {
//     type: "CHANGE-TODOLIST-TITLE",
//     todolistId: payload.todolistId,
//     newTitle: payload.title,
//   } as const;
// };
// export const changeFilterTodolistAC = (todolistId: string, filter: FilterValueType): ChangeFilterTodolistActionType => {
//   return {
//     type: "CHANGE-TODOLIST-FILTER",
//     todolistId: todolistId,
//     newFilter: filter,
//   } as const;
// };
// export const setTodolistsAC = (todolists: Todolist[]) => {
//   return { type: "SET-TODOLISTS", todolists } as const;
// };
// export const changeTodolistEntityStatusAC = (payload: { id: string, entityStatus: RequestStatus }) => {
//   return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload } as const
// };




// ThunkCreater TC
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setAppStatus({ status: "succeeded" }));
    dispatch(setTodolists({ todolists: res.data }));
  }).catch((err) => {
    console.log(err);
    handleServerNetworkError(err.massage, dispatch)
  });
};
export const addTodolistTC = (arg: { title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  todolistsApi.createTodolist(arg.title).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(addTodolist({ todolist: { ...res.data.data.item, filter: "all", entityStatus: 'idle' } }));
    } else {
      handleServerAppError<{ item: Todolist }>(dispatch, res.data)
    }
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
  });
};
export const removeTodolistTC = (arg: { todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  dispatch(changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "loading" }))
  todolistsApi.removeTodolist(arg.todolistId).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(removeTodolist({ todolistId: arg.todolistId }));
    } else {
      handleServerAppError(dispatch, res.data)
    }
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
    dispatch(changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "succeeded" }))
  });
};
export const updateTodolistTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  dispatch(changeTodolistEntityStatus({ todolistId: arg.id, entityStatus: "loading" }))
  todolistsApi.updateTodolist(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(changeTitleTodolist({ todolistId: arg.id, title: arg.title }));
    } else {
      handleServerAppError(dispatch, res.data)
    }
    dispatch(changeTodolistEntityStatus({ todolistId: arg.id, entityStatus: 'succeeded' }));
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch);
    dispatch(changeTodolistEntityStatus({ todolistId: arg.id, entityStatus: 'failed' }))
  })
};
