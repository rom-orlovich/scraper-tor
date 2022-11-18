import { model, Schema } from "mongoose";

const AlertSchema = new Schema({
  id: Number,
  title: String,
  author: String,
  date: String,
});

export const AlertModel = model("Alerts", AlertSchema);
