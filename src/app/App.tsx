import React, { useEffect, useState } from "react";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "../common/components/Header/Header";
import { getTheme } from "../common/theme/theme";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { Routing } from "common/routing/Routing";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectAppThemeMode, setIsLoggedIn } from "./appSlice";
import { useMeQuery } from "features/auth/api/authApi";
import { ResultCode } from "common/enums/enums";
import s from "./App.module.css"


const App = React.memo(() => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectAppThemeMode);
  const [isInitialized, setIsInitialized] = useState(false);
  const { data, isLoading } = useMeQuery();


  useEffect(() => {
    if (!isLoading) {
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
      setIsInitialized(true)
    }
  }, [isLoading, data])


  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        {isInitialized && (
          <>
            <Header />
            <Routing />
          </>
        )}
        {!isInitialized && (
          <>
            <div className={s.circularProgressContainer}>
              <CircularProgress size={150} thickness={3} />
            </div>
          </>
        )}
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
});

export default App;
