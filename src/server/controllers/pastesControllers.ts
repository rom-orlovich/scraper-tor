import { RequestHandler } from "express";
import { PasteModel } from "../models/PastesModel";

export const pastesController: RequestHandler = async (req, res) => {
  const { page, author, title } = req.query;

  const pageNumber = page ? Number(page) : 1;
  try {
    const countAwait = await PasteModel.count();
    const pastes = await PasteModel.find({
      author: author
        ? { $regex: `^${author}`, $options: "i" }
        : { $regex: /.*?/ },
      title: title ? { $regex: `^${title}`, $options: "i" } : { $regex: /.*?/ },
    })

      .skip((pageNumber - 1) * 10)
      .limit(10)
      .sort({ id: 1 });

    res.status(200).json({ data: pastes, next: countAwait > pageNumber * 10 });
  } catch (error) {
    res.status(400).json({ message: "pastes not found" });
  }
};
