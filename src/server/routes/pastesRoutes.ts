import express from "express";
import { pastesController } from "../controllers/pastesControllers";

export const pastesRoute = express.Router();

pastesRoute.get("/api", pastesController);
