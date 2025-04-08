import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";
import { Box, Button } from "@mui/material";
import s from './FilterTasksButton.module.css'
import { todolistsApiTwo } from "features/todolists/api/todolistsApi";
import { DomainTodolist, FilterValueType } from "features/todolists/lib/types/types";

type Props = {
  todolist: DomainTodolist;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  // Data
  const { id, filter } = todolist;
  const dispatch = useAppDispatch();

  // пуш отфильтрованного массива тасок в стейт
  const cahgeFilterHandler =
    (filter: FilterValueType) => {
      dispatch(
        todolistsApiTwo.util.updateQueryData(
          "getTodolists",
          undefined,
          (todolists: DomainTodolist[]) => {
            const todolist = todolists.find((todolist) => todolist.id === id)
            if (todolist) {
              todolist.filter = filter;
            }
          })
      )
    }

  return (
    <Box className={s.FiltertasksButton}>
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
