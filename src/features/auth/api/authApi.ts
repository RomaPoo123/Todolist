import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"
import { Inputs } from "../lib/schemas/loginSchema"
import { baseApi } from "app/baseApi"

export const authApiTwo = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            login: builder.mutation<BaseResponse<{ userId: number, token: string }>, Inputs>({
                query: (payload) => {
                    return {
                        method: "POST",
                        url: "auth/Login",
                        body: payload
                    }
                }
            }),
            logout: builder.mutation<BaseResponse, void>({
                query: () => {
                    return {
                        method: "DELETE",
                        url: "auth/Login"
                    }
                }
            }),
            me: builder.query<BaseResponse<{ id: number, email: string, login: string }>, void>({
                query: () => {
                    return {
                        method: "GET",
                        url: "auth/me"
                    }
                }
            })
        }
    }
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApiTwo


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