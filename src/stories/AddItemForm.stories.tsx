import React from "react";
import { AddItemForm } from "../components/addItemForm/AddItemForm";
import { Meta, StoryObj } from "@storybook/react/*";
import { light } from "@mui/material/styles/createPalette";
import { action } from "@storybook/addon-actions"
import { userEvent, within } from "@storybook/test";




//  создание стандартной истории
/* export default {
    title: "AddItemForm Component",
    component: AddItemForm
} */
/* export const AddItemFormBaseExample = () => {
    return (
        <>
            <AddItemForm addItem={() => { }} />
        </>
    )
} */


const meta: Meta<typeof AddItemForm> = {
    title: "UI/AddItemForm Component",
    component: AddItemForm,
    argTypes: {
        addItem: {
            type: "function",
            description: "This is a function that passes the value of newTitle or just title higher in nesting",
            defaultValue: ""
        }
    },
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Components, which serves as the title input field for entities."
            }
        }
    }
}

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const BaseExample: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const titleInput = canvas.getByLabelText('Type title')

        while (true) {
            await userEvent.click(canvas.getByLabelText('Type title'))
            await userEvent.type(titleInput, 'NewTitle', {
                delay: 150,
            })
            await userEvent.click(canvas.getByRole('button'), {
                delay: 200,
            })
        }
    },
    args: { addItem: action("Button 'add' was pressed inside the form") },
    parameters: {
        backgrounds: {
            default: light
        },
        docs: {
            description: {
                story: "A form with a button for adding new elements. The project uses it to create new todolists, as well as to add tasks to the todolist.",

            }
        }
    },
};
/* BaseExample.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const titleInput = canvas.getByLabelText('Type title')

    while (true) {
        await userEvent.click(canvas.getByLabelText('Type title'))
        await userEvent.type(titleInput, 'NewTitle', {
            delay: 150,
        })
        await userEvent.click(canvas.getByRole('button'), {
            delay: 200,
        })
    }

} */


