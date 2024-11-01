import React from "react";
import { Task, TaskPropsType } from "../components/task/Task";
import { Meta, StoryFn } from '@storybook/react';
import { action } from "@storybook/addon-actions"
import { TaskType } from "../AppWithRedux";
import { v1 } from "uuid";
import { userEvent, within } from "@storybook/test";
import { Description } from "@mui/icons-material";


const meta: Meta<TaskPropsType> = {
    title: "UI/Task Component",
    component: Task,
    argTypes: {
        task: {
            description: "a TaskType object consisting of three properties and representing the essence of the task",

        },
        removeTask: {
            type: "function",
            description: "The callback function, which takes in one argument 'taskId', passes it to todolist, the callback is called when the task is deleted, and the buttons are passed to onClik.",
            action: "Remove task"
        },
        changeTaskStatus: {
            type: "function",
            description: "The callback function, which takes two arguments 'taskId' and 'isDone', is called by the callback when the task status changes when clicking on the Checkbox, and is passed to the Checkbox onChange.",
            action: "Change status task"
        },
        changeTaskTitle: {
            type: "function",
            description: "The callback function, which takes two arguments 'taskId' and 'newTitle', is called by the callback when the task title changes when double clicking on the component EditableSpan, and is passed to the EditableSpan onChange.",
            action: "Change title task"
        }
    },
    tags: ["autodocs"]
}
export default meta;


const Template: StoryFn<TaskPropsType> = (args) => <Task {...args} />

const storieTask: TaskType = { id: v1(), title: "One Title", isDone: false };

export const BaseExample = Template.bind({});
BaseExample.parameters = {
    docs: {
        description: {
            story: "an example of a regular task"
        }
    }
}
BaseExample.args = {
    task: storieTask,
}


export const IsDoneExample = Template.bind({});
IsDoneExample.parameters = {
    docs: {
        description: {
            story: "an example of a completed task"
        }
    }
}
IsDoneExample.args = {
    task: { id: v1(), title: "One Title", isDone: true },
}

/* ChangeTitleExample.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const titleSpan = canvas.getByText(storieTask.title);

    await userEvent.dblClick(titleSpan, {
        delay: 100,
    })

     await userEvent.click(canvas.getByRole('button'), {
         delay: 200
     })
     await userEvent.type(titleSpan, "New title", {
         delay: 150,
     })
 
} */