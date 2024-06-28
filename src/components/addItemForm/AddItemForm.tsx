import React from "react"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormType) => {
    const [newItemTitle, setNewItemTitle] = useState("")



    //добавления в локальный стейт название таски из инпута (onChangeHandler) 
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }
    //  Добавление айтема в глобальный стейт с помощьюю кнопки (onClickHandler)
    const onClickHandler = () => {
        addItem(newItemTitle)
        setNewItemTitle("")
    }
    // добавление таски в список тудулиста с помощью pressKey (onKeyPressHandler)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // setError(null)

        if (e.charCode === 13) {
            addItem(newItemTitle);
            setNewItemTitle("")
        }
    }

    // отрисовка компоненты (UI)
    return (
        <div>
            <input
                value={newItemTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            // className={error ? "error" : ""}
            />
            <button onClick={onClickHandler}>+</button>
            {/* {error && <div className="error-message">Field is required</div>} */}
        </div>
    )
}