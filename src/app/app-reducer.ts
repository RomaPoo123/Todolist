export type ThemeMode = "dark" | "light";
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


type InitialState = typeof initialState;

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;
type ChangeStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = ChangeThemeActionType | ChangeStatusActionType | SetAppErrorActionType;

const initialState = {
  themeMode: "light" as ThemeMode,
  status: 'idle' as RequestStatus,
  error: null as string | null
};

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.themeMode };
    case 'SET_STATUS':
      return { ...state, status: action.status }
    case 'SET_ERROR':
      return { ...state, error: action.payload.error }
    default:
      return state;
  }
};

export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE_THEME", themeMode } as const;
};

export const setAppStatusAC = (status: RequestStatus) => {
  return { type: 'SET_STATUS', status } as const
};

export const setAppErrorAC = (error: string | null) => {
  return { type: 'SET_ERROR', payload: { error } } as const
};