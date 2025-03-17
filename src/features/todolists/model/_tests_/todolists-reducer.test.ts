import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTitleTodolistAC,
  removeTodolistAC,
  todolistReducer,
  DomainTodolist,
} from "../todolistSlice";
import { v1 } from "uuid";

let todolistId1 = v1();
let todolistId2 = v1();

let startState: DomainTodolist[];

beforeEach(() => {
  startState = [
    { id: todolistId1, title: "What to see", filter: "all", order: 0, addedDate: "", entityStatus: "idle" },
    { id: todolistId2, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle" },
  ];
});

test("correct todolist should be removed", () => {
  // change Data
  const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

  // testing
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const newTodolist: DomainTodolist = {
    id: v1(),
    title: "What to bey",
    addedDate: "",
    order: 0,
    filter: "all",
    entityStatus: "idle",
  };

  // change Data
  const endState = todolistReducer(startState, addTodolistAC({ todolist: newTodolist }));

  // testing
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("What to bey");
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  // change Data
  const endState = todolistReducer(startState, changeTitleTodolistAC({ todolistId: todolistId2, title: "LOOOL" }));

  // testing
  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe("What to see");
  expect(endState[1].title).toBe("LOOOL");
});

test("correct todolist should change its filter", () => {
  // change Data
  const endState = todolistReducer(startState, changeFilterTodolistAC(todolistId2, "active"));

  // testing
  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("active");
});
