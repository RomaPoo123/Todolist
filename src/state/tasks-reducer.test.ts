import { TaskType } from "../App";
import { TasksType } from "../App";
import { v1 } from "uuid";
import { addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { AddTodolistAC, RemoveTodolistAC } from "./todolists-reducer";

let startState: TasksType

//  Отработка принципа TDD (Test-Driven Development)
beforeEach(() => {
    // start Data
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS&HTML", isDone: true },
            { id: "2", title: "JavaScript", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        "todolistId2": [
            { id: "4", title: "Game of Thrones", isDone: true },
            { id: "5", title: "Spider-man", isDone: true },
            { id: "6", title: "Batman", isDone: false },
        ]
    }
})


test("correct task should be deleted from correct array", () => {

    // change Data 
    const endState: TasksType = tasksReducer(startState, removeTaskAC("todolistId1", "2"))

    // testing
    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS&HTML", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        "todolistId2": [
            { id: "4", title: "Game of Thrones", isDone: true },
            { id: "5", title: "Spider-man", isDone: true },
            { id: "6", title: "Batman", isDone: false },
        ]
    });
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"][1].title).toBe("React");

});
test("correct task should be added to correct array", () => {

    // change Data 
    const endState: TasksType = tasksReducer(startState, addTaskAC("todolistId2", "Superman"))

    // testing
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].title).toBe("Superman");

});
test("title of specified task should be changed", () => {

    // change Data 
    const endState: TasksType = tasksReducer(startState, changeTitleTaskAC("todolistId2", "6", "Robin"))

    // testing
    expect(endState["todolistId1"][2].title).toBe("React");
    expect(endState["todolistId2"][2].title).toBe("Robin");
    expect(endState["todolistId2"].length).toBe(3);

});
test("status of specified task should be changed", () => {
    // change Data 
    const endState: TasksType = tasksReducer(startState, changeStatusTaskAC("todolistId1", "1", false))

    // testing
    expect(endState["todolistId1"][0].isDone).toBe(false);
    expect(endState["todolistId2"][0].isDone).toBe(true);

});
test("new array should be added when new todolist is added", () => {

    // start Data
    let newKey = v1();

    const action = AddTodolistAC("Привет")

    // change Data 
    const endState: TasksType = tasksReducer(startState, action)


    // testing
    expect(Object.keys(endState).length).toBe(3)
})
test("property with todolistId should be deleted", () => {

    const action = RemoveTodolistAC("todolistId1")

    // change Data 
    const endState: TasksType = tasksReducer(startState, action)


    // testing
    expect(endState["todolistId1"]).not.toBeDefined()
    expect(Object.keys(endState).length).toBe(1)
})

