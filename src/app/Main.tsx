import { useCallback, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { addTodolistTC } from "../features/todolists/model/todolists-reducer";
import { Todolists } from "../features/todolists/UI/Todolists/Todolists";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsLoggedin } from "features/auth/model/authSelectors";
import { useNavigate } from "react-router";
import { Path } from "common/routing/Routing";

export const Main = () => {
  const dispatch = useAppDispatch();
  const isLoggedin = useAppSelector(selectIsLoggedin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) {
      navigate(Path.Login)
    }
  }, [isLoggedin])


  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC({ title }));
    },
    [dispatch],
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
