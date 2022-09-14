import { RequestHandler } from "express";
import { PasteModel } from "../models/PastesModel";

export const pastesController: RequestHandler = async (req, res) => {
  const { page, author, title } = req.query;

  const pageNumber = page ? Number(page) : 1;
  const query = {
    author: author
      ? { $regex: `^${author}`, $options: "i" }
      : { $regex: /.*?/ },
    title: title ? { $regex: `^${title}`, $options: "i" } : { $regex: /.*?/ },
  };
  try {
    const pastes = await PasteModel.find(query)

      .skip((pageNumber - 1) * 10)
      .limit(10)
      .sort({ id: 1 });

    const countAwait = await PasteModel.find(query).count();

    res.status(200).json({ data: pastes, next: countAwait > pageNumber * 10 });
  } catch (error) {
    res.status(400).json({ message: "pastes not found" });
  }
};
