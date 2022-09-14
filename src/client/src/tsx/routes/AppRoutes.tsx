import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";

import MainRoute from "./MainRoute";

import { APP_ROUTE } from "./routesConstants";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>

      <Route path="*" element={<App />} />
    </Routes>
  );
}

export default AppRoutes;
