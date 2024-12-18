import { Grid, Paper } from "@mui/material"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { selectTodolists } from "../../model/todolistsSelector"
import { Todolist } from "./Todolist/TodolistWithRedux/TodolistWithRedux"



export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {
                todolists.map((tl) => {
                    return <Grid item key={tl.id}>
                        <Paper elevation={3} style={{ padding: "25px" }}>
                            <Todolist key={tl.id} todolist={tl} />
                        </Paper>
                    </Grid>
                })
            }
        </>
    )
}