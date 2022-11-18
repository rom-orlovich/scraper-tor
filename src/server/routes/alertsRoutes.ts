import express from "express";
import { alertsController } from "../controllers/alertsControllers";

export const alertsRoute = express.Router();

alertsRoute.get("/api/alerts", alertsController);
