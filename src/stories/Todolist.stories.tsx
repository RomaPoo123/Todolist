import React from "react";

import { Meta, StoryObj } from "@storybook/react/*";
import { action } from "@storybook/addon-actions"
import { v1 } from "uuid";
import { Todolist } from "../features/todolists/UI/Todolists/Todolist/Todolist";



const meta: Meta<typeof Todolist> = {
    title: "UI/Todolist Component",
    component: Todolist,
};

export default meta;

type Story = StoryObj<typeof Todolist>;

export const BaseExample: Story = {
    args: {
        id: v1(),
        title: "new Todolist",
        tasks: [],
        filter: "all",
        removeTodolist: action("fdsfdsds"),
        changeNewTitleTodolist: action("fsfdsfsd")
    }
}