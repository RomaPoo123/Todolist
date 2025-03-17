import { Grid, Paper } from "@mui/material";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { Todolist } from "./Todolist/Todolist";
import { useEffect } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { fetchTodolistsTC, selectTodolists } from "features/todolists/model/todolistSlice";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  return (
    <>
      {todolists.map((tl) => {
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
