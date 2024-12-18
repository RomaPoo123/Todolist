import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Container, Grid } from "@mui/material"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { addTodolistAC } from "../features/todolists/model/todolists-reducer";
import { Todolists } from "../features/todolists/UI/Todolists/Todolists";




export const Main = () => {

    const dispatch = useDispatch();
    // ЛОГИКА!! CRUD-операции (logic)
    // Операции с тудулистами (Todolist-CRUD)
    // добавление нового тудулиста (addTodolist)
    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])


    return (
        <Container fixed>
            <Grid container style={{ padding: "10px" }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={10}>
                <Todolists />
            </Grid>
        </Container>
    )
}