import { AppDispatch } from "./../../../app/store";
import { Todolist, TodolistSchema } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { RequestStatus, setAppStatusAC } from "app/app-reducer";
import { ResultCode } from "common/enums/enums";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { handleServerAppError } from "common/utils/handleServerAppError";

export type FilterValueType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
  filter: FilterValueType;
  entityStatus: RequestStatus;
};

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTitleTodolistActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  todolistId: string;
  newTitle: string;
};
export type ChangeFilterTodolistActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistId: string;
  newFilter: FilterValueType;
};
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionTodolistsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTitleTodolistActionType
  | ChangeFilterTodolistActionType
  | SetTodolistsActionType
  | changeTodolistEntityStatusActionType;

const initialState: DomainTodolist[] = [];

export const todolistReducer = (
  state: DomainTodolist[] = initialState,
  action: ActionTodolistsType,
): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS":
      const newTodolists = TodolistSchema.array().parse(action.todolists);
      // return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      return newTodolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.todolistId);
    case "ADD-TODOLIST": {
      const todolist = action.payload.todolist;
      return [todolist, ...state];
    };
    case "CHANGE-TODOLIST-TITLE":
      return state.map((todolist) =>
        todolist.id === action.todolistId ? { ...todolist, title: action.newTitle } : todolist,
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((todolist) =>
        todolist.id === action.todolistId ? { ...todolist, filter: action.newFilter } : todolist,
      );
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((todolist) =>
        todolist.id === action.payload.id ? { ...todolist, entityStatus: action.payload.entityStatus } : todolist);
    default:
      return state;
  }
};

// ActionCreater AC
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", todolistId } as const;
};
export const addTodolistAC = (payload: { todolist: DomainTodolist }) => {
  return { type: "ADD-TODOLIST", payload } as const;
};
export const changeTitleTodolistAC = (payload: {
  todolistId: string;
  title: string;
}): ChangeTitleTodolistActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    todolistId: payload.todolistId,
    newTitle: payload.title,
  } as const;
};
export const changeFilterTodolistAC = (todolistId: string, filter: FilterValueType): ChangeFilterTodolistActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId: todolistId,
    newFilter: filter,
  } as const;
};
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const;
};
export const changeTodolistEntityStatusAC = (payload: { id: string, entityStatus: RequestStatus }) => {
  return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload } as const
};

// ThunkCreater TC
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setAppStatusAC("succeeded"));
    dispatch(setTodolistsAC(res.data));
  }).catch((err) => {
    console.log(err);
    handleServerNetworkError(err.massage, dispatch)
  });
};
export const addTodolistTC = (arg: { title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistsApi.createTodolist(arg.title).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(addTodolistAC({ todolist: { ...res.data.data.item, filter: "all", entityStatus: 'idle' } }));
    } else {
      handleServerAppError<{ item: Todolist }>(dispatch, res.data)
    }
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
  });
};
export const removeTodolistTC = (arg: { todolistId: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'));
  dispatch(changeTodolistEntityStatusAC({ id: arg.todolistId, entityStatus: "loading" }))
  todolistsApi.removeTodolist(arg.todolistId).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(removeTodolistAC(arg.todolistId));
    } else {
      handleServerAppError(dispatch, res.data)
    }
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch)
    dispatch(changeTodolistEntityStatusAC({ id: arg.todolistId, entityStatus: "succeeded" }))
  });
};
export const updateTodolistTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'));
  dispatch(changeTodolistEntityStatusAC({ id: arg.id, entityStatus: "loading" }))
  todolistsApi.updateTodolist(arg).then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(changeTitleTodolistAC({ todolistId: arg.id, title: arg.title }));
    } else {
      handleServerAppError(dispatch, res.data)
    }
    dispatch(changeTodolistEntityStatusAC({ id: arg.id, entityStatus: 'succeeded' }));
  }).catch((err) => {
    handleServerNetworkError(err.massage, dispatch);
    dispatch(changeTodolistEntityStatusAC({ id: arg.id, entityStatus: 'failed' }))
  })
};
