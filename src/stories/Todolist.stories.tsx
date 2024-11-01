import React from "react";
import { Todolist } from "../components/todolist/Todolist";
import { Meta, StoryObj } from "@storybook/react/*";
import { action } from "@storybook/addon-actions"
import { v1 } from "uuid";



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