import { setAppError, setAppStatus } from "app/appSlice";
import { AppDispatch } from "app/store";
import { BaseResponse } from "common/types";



export const handleServerAppError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
    dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
    dispatch(setAppStatus({ status: 'failed' }));
}