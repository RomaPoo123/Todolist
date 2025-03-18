import { v1 } from "uuid";
import {
  addTask,
  changeStatusTask,
  changeTitleTask,
  removeTask,
  tasksReducer,
  TasksType,
} from "../tasksSlice";
import { addTodolist, DomainTodolist, removeTodolist } from "../todolistSlice";
import { TaskPriority, TaskStatus } from "common/enums/enums";
import { DomainTask } from "features/todolists/api/tasksApi.types";

let startState: TasksType;

let todolistId1 = v1();
let todolistId2 = v1();
//  Отработка принципа TDD (Test-Driven Development)
beforeEach(() => {
  // start Data
  startState = {
    todolistId1: [
      {
        title: "CSS&HTML",
        id: "1",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "JavaScript",
        id: "2",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "React",
        id: "3",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        title: "Game of Thrones",
        id: "4",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Spider-man",
        id: "5",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Batman",
        id: "6",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  // change Data
  const endState: TasksType = tasksReducer(startState, removeTask({ todolistId: "todolistId1", taskId: "2" }));

  // testing
  expect(endState).toEqual({
    todolistId1: [
      {
        title: "CSS&HTML",
        id: "1",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "React",
        id: "3",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId1,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        title: "Game of Thrones",
        id: "4",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Spider-man",
        id: "5",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
      {
        title: "Batman",
        id: "6",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        order: 0,
        deadline: "",
        addedDate: "",
      },
    ],
  });
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId1"][1].title).toBe("React");
});
test("correct task should be added to correct array", () => {
  // change Data
  let newTask: DomainTask = {
    description: "",
    title: "Superman",
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
    id: v1(),
    todoListId: "todolistId2",
    order: 0,
    addedDate: "",
  };
  const endState: TasksType = tasksReducer(startState, addTask({ task: newTask }));

  // testing
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].title).toBe("Superman");
});
test("title of specified task should be changed", () => {
  // change Data
  const endState: TasksType = tasksReducer(startState, changeTitleTask({ todolistId: "todolistId2", taskId: "6", newTitle: "Robin" }));

  // testing
  expect(endState["todolistId1"][2].title).toBe("React");
  expect(endState["todolistId2"][2].title).toBe("Robin");
  expect(endState["todolistId2"].length).toBe(3);
});
test("status of specified task should be changed", () => {
  // change Data
  const endState: TasksType = tasksReducer(startState, changeStatusTask({ todolistId: "todolistId1", taskId: "1", status: TaskStatus.New }));

  // testing
  expect(endState["todolistId1"][0].status).toBe(TaskStatus.New);
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
});
test("new array should be added when new todolist is added", () => {
  // start Data
  const newTodolist: DomainTodolist = {
    id: v1(),
    title: "What to bey",
    addedDate: "",
    order: 0,
    filter: "all",
    entityStatus: "idle"
  };

  const action = addTodolist({ todolist: newTodolist });

  // change Data
  const endState: TasksType = tasksReducer(startState, action);

  // testing
  expect(Object.keys(endState).length).toBe(3);
});
test("property with todolistId should be deleted", () => {
  const action = removeTodolist({ todolistId: "todolistId1" });

  // change Data
  const endState: TasksType = tasksReducer(startState, action);

  // testing
  expect(endState["todolistId1"]).not.toBeDefined();
  expect(Object.keys(endState).length).toBe(1);
});
