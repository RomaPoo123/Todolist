import { Grid, Paper } from "@mui/material";
import { Todolist } from "./Todolist/Todolist";
import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi";
import { TodolistSkeleton } from "../skeleton/TodolistSkeleton/TodolistSkeleton";
import { DomainTodolist } from "features/todolists/lib/types/types";





export const Todolists = () => {

  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

  return (
    <>
      {todolists?.map((tl: DomainTodolist) => {
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
