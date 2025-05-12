import { List } from "@mui/material";
import { Task } from "./Task/Task";
import { TaskStatus } from "common/enums/enums";
import s from "./Tasks.module.css"
import { useGetTasksQuery } from "features/todolists/api/tasksApi";
import { DomainTask } from "features/todolists/api/tasksApi.types";
import { TasksSkeleton } from "features/todolists/UI/skeleton/TasksSkeleton/TasksSkeleton";
import { DomainTodolist } from "features/todolists/lib/types/types";
import { useState } from "react";
import { TasksPagination } from "./TasksPagination/TasksPagination";
type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, currentData } = useGetTasksQuery({
    todolistId: todolist.id,
    params: { page },
  });

  // console.log({ "isLoading": isLoading, "isFetching": isFetching });
  console.log({ data, currentData })


  if (isLoading) {
    return <TasksSkeleton />
  }


  // кладем в переменую таски тудулиста
  const allTodolistTasks = data?.items

  let tasksForTodolist = allTodolistTasks;

  //  если значение filter active филтруем таски
  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks?.filter((task) => task.status === TaskStatus.New);
  }
  //  если значение completed active филтруем таски
  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks?.filter((task) => task.status === TaskStatus.Completed);
  }


  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <span>Тасок нет</span>
      ) : (
        <>
          <List className={s.tasks}>
            {tasksForTodolist?.map((task: DomainTask) => {
              return <Task key={task.id} todolist={todolist} task={task} />;
            })}
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  );
};
