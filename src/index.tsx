import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/AppAndAppWithReducer/App";
import AppWithRedux from "./app/AppWithRedux";
import AppWithReducer from "./app/AppAndAppWithReducer/AppWithReducers";
import { AppHttpRequests } from "./app/AppHttpRequests";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    {/* <App /> */}
    {/* <AppWithReducer /> */}
    <AppWithRedux />
    {/* <AppHttpRequests /> */}
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
