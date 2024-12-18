
import { tasksReducer, TasksType } from "../tasks-reducer";
import { addTodolistAC, todolistReducer, TodolistType } from "../todolists-reducer";


test('ids should be equals', () => {
    // start Data
    const startTaskState: TasksType = {};
    const startTodolistState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTaskState = tasksReducer(startTaskState, action);
    const endTodolistState = todolistReducer(startTodolistState, action);

    // change Data
    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].id

    // testing
    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)


});
