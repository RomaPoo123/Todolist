export type ThemeMode = "dark" | "light";
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialState = typeof initialState;

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;
type ChangeStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = ChangeThemeActionType | ChangeStatusActionType;

const initialState = {
  themeMode: "light" as ThemeMode,
  status: 'idle' as RequestStatus,
};

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.themeMode };
    case 'SET_STATUS':
      return { ...state, status: action.status }
    default:
      return state;
  }
};

export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE_THEME", themeMode } as const;
};

export const setAppStatusAC = (status: RequestStatus) => {
  return { type: 'SET_STATUS', status } as const
}