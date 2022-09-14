import cors from "cors";
import express from "express";
import path from "path";

import { connect } from "mongoose";
import { Server } from "http";

import { createClient } from "redis";
import { setDataDB } from "./scraper";
import { pastesRoute } from "./routes/pastesRoutes";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
let server: Server;
export const redisClient = createClient({ url: "redis://redis:6379" });

app.use(pastesRoute);
async function connectServer() {
  try {
    await connect("mongodb://mongo:27017/pastes");

    redisClient.connect();
    // redisClient.DEL("cfe918e2bb451d81f69328283785f177");
    // PasteModel.deleteMany({});
    server = app.listen(PORT, () => {
      console.log(`listen port to ${PORT}`);
    });
  } catch (error) {
    if (error) {
      console.log(error);
      server.close();
      redisClient.disconnect();
    }
  }
}
connectServer().then(async () => {
  await setDataDB("*/10 * * * *");
});

if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "client");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}