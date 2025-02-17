import React, { useState } from "react";
import { TasksType } from "../App";
import { todolistId_1, todolistId_2 } from "../id_utils";
import { v1 } from "uuid";
import { DomainTask } from "features/todolists/api/tasksApi.types";
import { TaskPriority, TaskStatus } from "common/enums/enums";

export function useTasks() {
  const [tasks, setTasks] = useState<TasksType>({
    [todolistId_1]: [
      {
        title: "CSS&HTML",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "JavaScript",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "React",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
    [todolistId_2]: [
      {
        title: "Game of Thrones",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Spider-man",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Batman",
        id: v1(),
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId_2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
  });

  // Операции с тасками (Tasks-CRUD)

  // Удаление тасок (removeTask)
  function removeTask(todolistId: string, id: string) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((task) => task.id !== id),
    });
  }
  // добавление тасок (addTask)
  function addTask(todolistId: string, title: string) {
    let newTask: DomainTask = {
      id: v1(),
      title: title.trim(),
      status: TaskStatus.New,
      priority: TaskPriority.Low,
      description: "",
      todoListId: todolistId_2,
      startDate: "",
      order: 0,
      deadline: "",
      addedDate: "",
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  }
  // изменение статуса таски changeStatus
  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    let status = isDone ? TaskStatus.Completed : TaskStatus.New;
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) => (task.id === taskId ? { ...task, status } : task)),
    });
  }
  // Функция которая принимает измененный titleTask и заносит его в стейт
  function changeNewTaskTitle(todolistId: string, taskId: string, title: string) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) => (task.id === taskId ? { ...task, title } : task)),
    });
  }
  // удаление массива тасок при удалении тудулиста
  function completelyRemoveTasksForTodolist(todolistId: string) {
    delete tasks[todolistId];
    setTasks(tasks);
  }
  // добавление массива при добавлении тудулиста
  function addStateForNewTodolist(todolistId: string) {
    setTasks({ ...tasks, [todolistId]: [] });
  }

  return {
    tasks,
    removeTask,
    addTask,
    changeStatus,
    changeNewTaskTitle,
    completelyRemoveTasksForTodolist,
    addStateForNewTodolist,
  };
}
