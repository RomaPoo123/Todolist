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
import { getTheme } from "../../theme/theme";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectAppStatus, selectThemeMode } from "../../../app/appSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changeThemeAC } from "../../../app/app-reducer";
import { logoutTC } from "features/auth/model/auth-reducer";
import { selectIsLoggedin } from "features/auth/model/authSelectors";

export function Header() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectAppStatus);
  const isLoggedin = useAppSelector(selectIsLoggedin);

  const theme = getTheme(themeMode);

  // CallBack для изменеия темы приложения
  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"));
  };
  const logoutHandler = () => {
    dispatch(logoutTC())
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
