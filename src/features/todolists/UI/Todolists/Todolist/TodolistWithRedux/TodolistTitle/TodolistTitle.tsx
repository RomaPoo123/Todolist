
import { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import { changeTitleTodolistAC, removeTodolistAC, TodolistType } from "../../../../../model/todolists-reducer"
import { useAppDispatch } from '../../../../../../../common/hooks/useAppDispatch';

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {

    const dispatch = useAppDispatch();


    const { title, id } = todolist

    // удаление тудулиста (removeTodolist)
    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch])
    // Функция которая принимает измененный titleTodolist и заносит его в стейт
    const updateTodolistHandler = useCallback((title: string) => {
        dispatch(changeTitleTodolistAC(id, title))
    }, [dispatch])




    return (
        <div className="headerTodolist">
            <h3><EditableSpan title={title} onChange={updateTodolistHandler} /></h3>
            <IconButton aria-label="delete" onClick={removeTodolistHandler} >
                <DeleteIcon />
            </IconButton>
        </div>
    )
}