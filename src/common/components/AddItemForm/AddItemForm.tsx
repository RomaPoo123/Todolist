import React from "react";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

type AddItemFormType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo(({ addItem }: AddItemFormType) => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  //добавления в локальный стейт название таски из инпута (onChangeHandler)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value);
    if (e.currentTarget.value.length > 15) {
      setError("Title is required");
    }
  };
  //  Добавление айтема в глобальный стейт с помощьюю кнопки (onClickHandler)
  const onClickHandler = () => {
    if (newItemTitle.trim() !== "" && newItemTitle.length < 15) {
      addItem(newItemTitle.trim());
      setNewItemTitle("");
      setError("");
    } else {
      setError("Title is required");
    }
  };
  // добавление таски в список тудулиста с помощью pressKey (onKeyPressHandler)
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      onClickHandler();
      setNewItemTitle("");
    }
  };

  // отрисовка компоненты (UI)
  return (
    <div>
      <TextField
        value={newItemTitle}
        label="Type title"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={onClickHandler} size="medium">
        <ControlPointIcon />
      </IconButton>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
});
