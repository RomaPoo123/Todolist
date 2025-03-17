import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


// type InitialState = typeof initialState;

// type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;
// type ChangeStatusActionType = ReturnType<typeof setAppStatusAC>
// type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

// type ActionsType = ChangeThemeActionType | ChangeStatusActionType | SetAppErrorActionType;

// const initialState = {
//   themeMode: "light" as ThemeMode,
//   status: 'idle' as RequestStatus,
//   error: null as string | null
// };


export const appSlice = createSlice({
  name: 'applol',
  initialState: {
    themeMode: "light" as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null
  },
  selectors: {
    selectAppError: (state) => state.error,
    selectAppThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status
  },
  reducers: create => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    })
  })
})

export const appReducer = appSlice.reducer;
export const { changeTheme, setAppStatus, setAppError } = appSlice.actions;
export const { selectAppError, selectAppThemeMode, selectAppStatus } = appSlice.selectors;






// export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
//   switch (action.type) {
//     case "CHANGE_THEME":
//       return { ...state, themeMode: action.themeMode };
//     case 'SET_STATUS':
//       return { ...state, status: action.status }
//     case 'SET_ERROR':
//       return { ...state, error: action.payload.error }
//     default:
//       return state;
//   }
// };

// export const changeThemeAC = (themeMode: ThemeMode) => {
//   return { type: "CHANGE_THEME", themeMode } as const;
// };
// export const setAppStatusAC = (status: RequestStatus) => {
//   return { type: 'SET_STATUS', status } as const
// };
// export const setAppErrorAC = (error: string | null) => {
//   return { type: 'SET_ERROR', payload: { error } } as const
// };