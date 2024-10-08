import React from "react"
import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"


type EditableSpanPropsTape = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo(({ title, onChange }: EditableSpanPropsTape) => {
    console.log("EditableSpan is called")
    // локальный стейт для управления компонентой
    let [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>("")

    // Колбек для активации input при двойном нажатии (onDoubleClick)
    const activateEditMode = () => {
        setEditMode(true);
        setNewTitle(title)
    }
    // Колбек  для возвращения span при потере фокуса (onBlur)
    const activateViewMode = () => {
        setEditMode(false);
        onChange(newTitle)
    }
    // Функция события для обработки input
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode ? <TextField variant="standard" value={newTitle} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus /> :
            <span onDoubleClick={activateEditMode}>{title}</span>
    )
})