import { useAppDispatch } from "./../../../common/hooks/useAppDispatch";
import { AppDispatch, AppRootStateType } from "./../../../app/store";
import { v1 } from "uuid";
import { Todolist } from "../api/todolistsApi.types";
import { Dispatch } from "redux";
import { todolistsApi } from "../api/todolistsApi";
import { setAppStatusAC } from "app/app-reducer";

export type FilterValueType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
  filter: FilterValueType;
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

type ActionTodolistsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTitleTodolistActionType
  | ChangeFilterTodolistActionType
  | SetTodolistsActionType;

const initialState: DomainTodolist[] = [];

export const todolistReducer = (
  state: DomainTodolist[] = initialState,
  action: ActionTodolistsType,
): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }));
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.todolistId);
    case "ADD-TODOLIST": {
      const todolist = action.payload.todolist;
      return [todolist, ...state];
    }
    case "CHANGE-TODOLIST-TITLE":
      return state.map((todolist) =>
        todolist.id === action.todolistId ? { ...todolist, title: action.newTitle } : todolist,
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((todolist) =>
        todolist.id === action.todolistId ? { ...todolist, filter: action.newFilter } : todolist,
      );
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

// ThunkCreater TC
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setAppStatusAC("succeeded"));
    dispatch(setTodolistsAC(res.data));
  });

};
export const addTodolistTC = (arg: { title: string }) => (dispatch: AppDispatch) => {
  todolistsApi.createTodolist(arg.title).then((res) => {
    dispatch(addTodolistAC({ todolist: { ...res.data.data.item, filter: "all" } }));
  });
};

export const removeTodolistTC = (arg: { todolistId: string }) => (dispatch: AppDispatch) => {
  todolistsApi.removeTodolist(arg.todolistId).then((res) => {
    dispatch(removeTodolistAC(arg.todolistId));
  });
};

export const updateTodolistTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  todolistsApi.updateTodolist(arg).then((res) => {
    dispatch(changeTitleTodolistAC({ todolistId: arg.id, title: arg.title }));
  });
};
