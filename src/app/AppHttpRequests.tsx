import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios'
import { Todolist } from '../features/todolists/api/todolistsApi.types'
import { DomainTask, UpdateTaskModel } from '../features/todolists/api/tasksApi.types'
import { todolistsApi } from '../features/todolists/api/todolistsApi'
import { tasksApi } from '../features/todolists/api/tasksApi'
import { TaskStatus } from '../common/enums/enums'





export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                const todolists: Todolist[] = res.data
                setTodolists(todolists);
                todolists.forEach(tl => {
                    tasksApi.getTasks(tl.id)
                        .then(res => {
                            setTasks({ ...tasks, [tl.id]: res.data.items })
                        })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title)
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.removeTodolist(id)
            .then(res => {
                const newTodolists = todolists.filter(todolist => todolist.id !== id)
                setTodolists(newTodolists)
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({ id, title })
            .then(res => {
                const newTodolists = todolists.map(todolist => todolist.id === id ? { ...todolist, title } : todolist)
                setTodolists(newTodolists)
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        tasksApi.createTask({ todolistId, title })
            .then(res => {
                const newTask = res.data.data.item
                setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.removeTask({ todolistId, taskId })
            .then(res => {
                setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model })
            .then(res => {
                const newTasks = tasks[task.todoListId].map(tl => tl.id === task.id ? { ...tl, ...model } : tl)
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        const model: UpdateTaskModel = {
            status: task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model })
            .then(res => {
                const newTasks = tasks[task.todoListId].map(tl => tl.id === res.data.data.item.id ? { ...tl, ...model } : tl)
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })

    }

    return (
        <div style={{ margin: '20px' }}>
            <AddItemForm addItem={createTodolistHandler} />

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                title={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            title={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}