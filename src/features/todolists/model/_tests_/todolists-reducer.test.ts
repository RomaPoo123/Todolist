
import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, todolistReducer, TodolistType } from "../todolists-reducer";
import { v1 } from "uuid";


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
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

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
    const endState = todolistReducer(startState, addTodolistAC("What to bey"));

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
    const endState = todolistReducer(startState, changeTitleTodolistAC(todolistId2, "LOOOL"));

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
    const endState = todolistReducer(startState, changeFilterTodolistAC(todolistId2, "active"));

    // testing
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("active");



})