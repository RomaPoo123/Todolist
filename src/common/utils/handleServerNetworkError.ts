import { setAppError, setAppStatus } from "app/appSlice";
import { AppDispatch } from 'app/store';



export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppError({ error: error.message }))
    dispatch(setAppStatus({ status: "failed" }))
}