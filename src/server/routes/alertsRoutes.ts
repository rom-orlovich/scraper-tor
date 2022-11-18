import express from "express";
import { deleteAlert, getAlerts } from "../controllers/alertsControllers";

const alertsRoute = express.Router();
alertsRoute.route("/api/alerts");
alertsRoute.get("/", getAlerts);
alertsRoute.delete(":id", deleteAlert);
export default alertsRoute;
