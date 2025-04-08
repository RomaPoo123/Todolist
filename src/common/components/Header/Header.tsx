import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Switch } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { MenuButton } from "../MenuButton/MenuButton";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changeTheme, selectAppStatus, selectAppThemeMode, selectIsLoggedIn, setIsLoggedIn } from "../../../app/appSlice";
import { useLogoutMutation } from "features/auth/api/authApi";
import { ResultCode } from "common/enums/enums";
import { baseApi } from "app/baseApi";



export function Header() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectAppThemeMode);
  const status = useAppSelector(selectAppStatus);
  const isLoggedin = useAppSelector(selectIsLoggedIn);

  const [logout] = useLogoutMutation()

  // const theme = getTheme(themeMode);

  // CallBack для изменеия темы приложения
  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };
  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        localStorage.removeItem('sn-token')
      }
    }).then(() => {
      dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: "30px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          <div>
            {/* <MenuButton>Login</MenuButton> */}
            {isLoggedin && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
            {/* <MenuButton background={theme.palette.primary.dark}>Fag</MenuButton> */}
            <Switch color={"default"} onChange={changeModeHandler} />
          </div>
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </Box>
  );
}
