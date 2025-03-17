import { List } from "@mui/material";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { Task } from "./Task/Task";
import { DomainTodolist } from "features/todolists/model/todolistSlice";
import { useEffect } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { fetchTasksTC, selectTasks } from "features/todolists/model/tasksSlice";
import { TaskStatus } from "common/enums/enums";
import s from "./Tasks.module.css"
type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  // берем часть Store, а именно tasks
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC({ todolistId: todolist.id }));
  }, []);

  // кладем в переменую таски тудулиста
  const allTodolistTasks = tasks[todolist.id];

  let tasksForTodolist = allTodolistTasks;

  //  если значение filter active филтруем таски
  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New);
  }
  //  если значение completed active филтруем таски
  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed);
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <span>Тасок нет</span>
      ) : (
        <List className={s.tasks}>
          {tasksForTodolist?.map((task) => {
            return <Task todolist={todolist} task={task} />;
          })}
        </List>
      )}
    </>
  );
};
