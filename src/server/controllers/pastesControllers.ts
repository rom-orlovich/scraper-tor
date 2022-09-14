import { RequestHandler } from "express";
import { PasteModel } from "../models/PastesModel";

export const pastesController: RequestHandler = async (req, res) => {
  const { page, author, title } = req.query;
  console.log(author, title);
  const pageNumber = page ? Number(page) : 1;
  const pastes = await PasteModel.find({
    author: author
      ? { $regex: `^${author}`, $options: "i" }
      : { $regex: /.*?/ },
    title: title ? { $regex: `^${title}`, $options: "i" } : { $regex: /.*?/ },
  })

    .skip((pageNumber - 1) * 10)
    .limit(10)
    .sort({ id: 1 });

  res.status(200).json(pastes);
};
