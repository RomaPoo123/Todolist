import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import { useCallback } from "react";
import { changeFilterTodolistAC, FilterValueType, DomainTodolist } from "../../../../../model/todolists-reducer";
import { Box, Button } from "@mui/material";

type Props = {
  todolist: DomainTodolist;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  // Data
  const { id, filter } = todolist;
  const dispatch = useAppDispatch();

  // пуш отфильтрованного массива тасок в стейт
  const cahgeFilterHandler = useCallback(
    (filter: FilterValueType) => {
      dispatch(changeFilterTodolistAC(id, filter));
    },
    [dispatch],
  );

  return (
    <Box>
      <Button
        size="small"
        variant={filter === "all" ? "contained" : "outlined"}
        onClick={() => cahgeFilterHandler("all")}
      >
        All
      </Button>
      <Button
        size="small"
        variant={filter === "active" ? "contained" : "outlined"}
        onClick={() => cahgeFilterHandler("active")}
      >
        Active
      </Button>
      <Button
        size="small"
        variant={filter === "completed" ? "contained" : "outlined"}
        onClick={() => cahgeFilterHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  );
};
