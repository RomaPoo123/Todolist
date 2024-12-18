import { Meta, StoryObj } from "@storybook/react/*";
import { action } from "@storybook/addon-actions"
import React from "react";
import { EditableSpan } from "../common/components/EditableSpan/EditableSpan";



const meta: Meta<typeof EditableSpan> = {
    title: "UI/EditableSpan Component",
    component: EditableSpan,
    tags: ["autodocs"],
    argTypes: {
        title: {
            type: "string",
            description: "The title value that the entity already has (task, todolist)",
            control: 'text',
        },
        onChange: {
            type: "function",
            description: "the title value that the entity already has (task, todolist)"
        }
    },
    parameters: {
        docs: {
            description: {
                component: "A component that acts as a title for entities. But the title can be changed by double-clicking on the title, it becomes possible to remove the old one and add a new entity title. In order for a new title to be assigned to an entity, you should remove the focus from the component."
            },
            layout: "centerd"
        }
    }
}

export default meta;


type Story = StoryObj<typeof EditableSpan>;

export const BaseExample: Story = {
    args: {
        title: "Title",
        onChange: action("change title")
    }
}