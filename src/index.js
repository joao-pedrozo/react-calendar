import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import Main from "./Main";
import reducers from "./reducers";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider as CalendarContextProvider } from "./hooks/useCalendar";
import getStore from "./store/getStore";

// import main sass file
import "./sass/app.scss";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={getStore(reducers)}>
      <CalendarContextProvider>
        <Main />
      </CalendarContextProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
