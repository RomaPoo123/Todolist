// Типизация POST запроса
export type FieldError = {
    error: string
    field: string
}

// дженериковый тип

export type BaseResponse<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: D
}