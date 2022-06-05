import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "../pages/App";
import Calendar from "../pages/Calendar/index";

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
