import express from "express";
import {
  deleteAlert,
  deleteAllAlerts,
  getAlerts,
} from "../controllers/alertsControllers";

const alertsRoute = express.Router();

alertsRoute.get("/", getAlerts);
alertsRoute.delete("/alert/:id", deleteAlert);
alertsRoute.delete("/", deleteAllAlerts);
export default alertsRoute;
