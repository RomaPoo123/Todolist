import React, { useEffect } from "react";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "../common/components/Header/Header";
import { getTheme } from "../common/theme/theme";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { Routing } from "common/routing/Routing";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { meTC, selectIsInitialized } from "features/auth/model/authSlice";

import s from "./App.module.css"
import "./App.css";
import { selectAppThemeMode } from "./appSlice";


const App = React.memo(() => {
  const themeMode = useAppSelector(selectAppThemeMode);
  const isInitialized = useAppSelector(selectIsInitialized);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(meTC())
  }, []);

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }


  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
});

export default App;
