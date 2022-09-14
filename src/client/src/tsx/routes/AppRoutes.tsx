import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import PastesPage from "../pages/PastsPage/PastsPage";

import MainRoute from "./MainRoute";

import { APP_ROUTE } from "./routesConstants";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<PastesPage />}></Route>
      </Route>

      <Route path="*" element={<App />} />
    </Routes>
  );
}

export default AppRoutes;
