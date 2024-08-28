import { AddTodolistAC, ChangeFilterTodolistAC, ChangeTitleTodolistAC, RemoveTodolistAC, todolistReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistType } from "../App";
import { FilterValueType } from "../App";

let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {
    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to see", filter: "all" },
        { id: todolistId2, title: "What to learn", filter: "all" }
    ]
})

test("correct todolist should be removed", () => {
    // start Data
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to see", filter: "all" },
        { id: todolistId2, title: "What to learn", filter: "all" }
    ]
    // change Data
    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1));

    // testing
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test("correct todolist should be added", () => {
    // start Data
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to see", filter: "all" },
        { id: todolistId2, title: "What to learn", filter: "all" }
    ]
    // change Data
    const endState = todolistReducer(startState, AddTodolistAC("What to bey"));

    // testing
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to bey");
    expect(endState[0].filter).toBe("all");



})

test("correct todolist should change its name", () => {
    // start Data
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to see", filter: "all" },
        { id: todolistId2, title: "What to learn", filter: "all" }
    ]
    // change Data
    const endState = todolistReducer(startState, ChangeTitleTodolistAC(todolistId2, "LOOOL"));

    // testing
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to see");
    expect(endState[1].title).toBe("LOOOL");



})

test("correct todolist should change its filter", () => {
    // start Data
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to see", filter: "all" },
        { id: todolistId2, title: "What to learn", filter: "all" }
    ]
    // change Data
    const endState = todolistReducer(startState, ChangeFilterTodolistAC(todolistId2, "active"));

    // testing
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("active");



})