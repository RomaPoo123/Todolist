import { StoryFn } from '@storybook/react';
import { todolistReducer } from "../state/todolists-reducer";
import { tasksReducer } from "../state/tasks-reducer";
import { combineReducers, legacy_createStore } from "redux";
import { AppRootStateType } from "../state/store";
import { v1 } from "uuid";
import { Provider } from 'react-redux';
import { Provider } from 'react-redux';



const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
});

const todolistId1 = v1();
const todolistId2 = v1();

const StorybookInitialState = {
    todolists: [
        { id: todolistId1, title: "todolist One", filter: "all" },
        { id: todolistId2, title: "todolist Two", filter: "all" },
    ],
    tasks: {
        [todolistId1]: [
            { id: "1", title: "fsfds", isDone: false },
            { id: "2", title: "fsfds", isDone: false },
            { id: "3", title: "fsfds", isDone: false }
        ],
        [todolistId2]: [
            { id: "1", title: "fsfds", isDone: false },
            { id: "2", title: "fsfds", isDone: false },
            { id: "3", title: "fsfds", isDone: false }
        ]
    }
}

export const StoreForStorybook = legacy_createStore(rootReducer, StorybookInitialState as { todolists: any, tasks: any })

export const ReduxStoreProviderDecorator = (StoryFn: any) => (
    <Provider store= { StoreForStorybook } > { StoryFn() } </Provider>
)