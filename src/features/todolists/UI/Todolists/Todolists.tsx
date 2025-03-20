import { Grid, Paper } from "@mui/material";
import { Todolist } from "./Todolist/Todolist";
import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi";

export const Todolists = () => {

  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((tl: any) => {
        return (
          <Grid item key={tl.id}>
            <Paper elevation={3} style={{ padding: "25px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
