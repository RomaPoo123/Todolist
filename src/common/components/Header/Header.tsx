import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch } from '@mui/material';
import { MenuButton } from '../MenuButton/MenuButton';
import { getTheme } from '../../theme/theme';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectThemeMode } from '../../../app/appSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeThemeAC } from '../../../app/app-reducer';

export function Header() {

    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    // CallBack для изменеия темы приложения
    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Fag</MenuButton>
                        <Switch color={"default"} onChange={changeModeHandler} />
                    </div>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}