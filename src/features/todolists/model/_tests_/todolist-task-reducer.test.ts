import { v1 } from "uuid";
import { tasksReducer, TasksType } from "../tasksSlice";
import { addTodolistAC, todolistReducer, DomainTodolist } from "../todolistSlice";

test("ids should be equals", () => {
  // start Data
  const startTaskState: TasksType = {};
  const startTodolistState: Array<DomainTodolist> = [];
  const newTodolist: DomainTodolist = {
    id: v1(),
    title: "new todolist",
    addedDate: "",
    order: 0,
    filter: "all",
    entityStatus: "idle",
  };
  const action = addTodolistAC({ todolist: newTodolist });

  const endTaskState = tasksReducer(startTaskState, action);
  const endTodolistState = todolistReducer(startTodolistState, action);

  // change Data
  const keys = Object.keys(endTaskState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  // testing
  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
