import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"
import { Inputs } from "../lib/schemas/loginSchema"



export const authApi = {
    login: (payload: Inputs) => {
        return instance.post<BaseResponse<{ userId: number, token: string }>>("auth/Login", payload)
    },
    logout: () => {
        return instance.delete<BaseResponse>("auth/Login")
    },
    me: () => {
        return instance.get<BaseResponse<{ id: number, email: string, login: string }>>("auth/me")
    }
}