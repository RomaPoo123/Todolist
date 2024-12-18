import React from 'react';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { Header } from '../common/components/Header/Header';
import { getTheme } from '../common/theme/theme';
import { Main } from './Main';
import { ThemeMode } from './app-reducer';
import { useAppSelector } from '../common/hooks/useAppSelector';


const AppWithRedux = React.memo(() => {
  // ИСХОДНЫЕ ДАННЫЕ (Data)
  const themeMode = useAppSelector(state => state.app.themeMode)

  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
})

export default AppWithRedux;
