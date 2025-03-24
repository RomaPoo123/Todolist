import { useCallback, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { Todolists } from "../features/todolists/UI/Todolists/Todolists";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useNavigate } from "react-router";
import { Path } from "common/routing/Routing";
import { useCreateTodolistMutation } from "features/todolists/api/todolistsApi";
import { selectIsLoggedIn } from "./appSlice";


export const Main = () => {
  // const dispatch = useAppDispatch();
  const isLoggedin = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [createTodolist, { data }] = useCreateTodolistMutation();


  useEffect(() => {
    if (!isLoggedin) {
      navigate(Path.Login)
    }
  }, [isLoggedin])


  const addTodolist = useCallback(
    (title: string) => {
      createTodolist(title)
    },
    [],
  );

  return (
    <Container fixed>
      <Grid container style={{ padding: "10px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={10}>
        <Todolists />
      </Grid>
    </Container>
  );
};
