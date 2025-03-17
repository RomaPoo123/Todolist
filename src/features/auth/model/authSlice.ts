import { AppDispatch } from 'app/store';
import { setAppStatus } from 'app/appSlice';
import { authApi } from '../api/authApi';
import { ResultCode } from 'common/enums/enums';
import { handleServerAppError } from 'common/utils/handleServerAppError';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { Inputs } from '../lib/schemas/loginSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
}
// Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn,
        selectIsInitialized: (state) => state.isInitialized
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
})

export const { setIsLoggedIn, setIsInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors;

// // thunks
export const loginTC = (data: Inputs) => (dispatch: AppDispatch) => {
    // dispatch(setAppStatusAC("loading"))
    dispatch(setAppStatus({ status: "loading" }))
    authApi.login(data).then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: "succeeded" }));
            dispatch(setIsLoggedIn({ isLoggedIn: true }));
            localStorage.setItem('sn-token', res.data.data.token)
        } else {
            handleServerAppError(dispatch, res.data);
        }
    }).catch((err) => {
        handleServerNetworkError(err, dispatch)
    }).finally(() => {
        dispatch(setAppStatus({ status: 'idle' }))
    });
};
export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi.logout().then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: "succeeded" }));
            dispatch(setIsLoggedIn({ isLoggedIn: false }));
            localStorage.removeItem('sn-token')
        } else {
            handleServerAppError(dispatch, res.data);
        }
    }).catch((err) => {
        handleServerNetworkError(err, dispatch)
    }).finally(() => {
        dispatch(setAppStatus({ status: 'idle' }))
    });
};
export const meTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi.me().then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: "succeeded" }));
            dispatch(setIsLoggedIn({ isLoggedIn: true }));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    }).catch((err) => {
        handleServerNetworkError(err, dispatch)
    }).finally(() => {
        dispatch(setIsInitialized({ isInitialized: true }));
        dispatch(setAppStatus({ status: 'idle' }))
    });
};